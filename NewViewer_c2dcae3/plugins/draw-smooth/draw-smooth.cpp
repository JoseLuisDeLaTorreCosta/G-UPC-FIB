// GLarena, a plugin based platform to teach OpenGL programming
// © Copyright 2012-2018, ViRVIG Research Group, UPC, https://www.virvig.eu
// 
// This file is part of GLarena
//
// GLarena is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

#include "draw-smooth.h"
#include "glwidget.h"
#include <cassert>
#include <cmath>

Draw_Smooth::~Draw_Smooth() {
  cleanUp();
}

void Draw_Smooth::onSceneClear()
{
    cleanUp();
}

void Draw_Smooth::cleanUp()
{
  GLWidget &g = *glwidget();
  g.glDeleteBuffers(coordBuffers.size(),  &coordBuffers[0]);
  g.glDeleteBuffers(normalBuffers.size(), &normalBuffers[0]);
  g.glDeleteBuffers(stBuffers.size(),  &stBuffers[0]);
  g.glDeleteBuffers(colorBuffers.size(),  &colorBuffers[0]);
  g.glDeleteVertexArrays(VAOs.size(), &VAOs[0]);
  g.glDeleteBuffers(indexBuffers.size(), &indexBuffers[0]);
  coordBuffers.clear();
  normalBuffers.clear();
  stBuffers.clear();
  colorBuffers.clear();
  VAOs.clear();
  numIndices.clear();
  indexBuffers.clear();
}

bool Draw_Smooth::drawObject(int i)
{
  GLWidget &g = *glwidget();
  g.makeCurrent();
  g.glBindVertexArray(VAOs[i]);
  g.glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indexBuffers[i]);
  g.glDrawElements(GL_TRIANGLES, numIndices[i], GL_UNSIGNED_INT, (GLvoid *) 0);
  g.glBindVertexArray(0);
  return true;
}

bool Draw_Smooth::drawScene()
{
  GLWidget &g = *glwidget();
  g.makeCurrent();
  GLint program;
  g.glGetIntegerv(GL_CURRENT_PROGRAM, &program);
  GLint loc = g.glGetUniformLocation(program,"objectID");
  for(unsigned int i=0; i<VAOs.size(); i++) {
    // for each buffer (that is, for each object)
    if (loc>=0) g.glUniform1i(loc, i);
	  drawObject(i);
  }
  return true;
}

void Draw_Smooth::onPluginLoad()
{
  for(unsigned int i=0; i<scene()->objects().size(); i++)
    addVBO(i);
}

void Draw_Smooth::onObjectAdd()
{
  addVBO( scene()->objects().size() - 1 );
}

void Draw_Smooth::addVBO(unsigned int currentObject)
{
  //
  // For simplicity, we construct VBOs with replicated vertices (a copy
  // for each triangle to which they belong:
  //
  const Object& obj = scene()->objects()[currentObject];
  unsigned int numvertices = obj.vertices().size();  // it's all triangles...
  unsigned int numfaces = obj.faces().size();
  vector<float> vertices; // (x,y,z)    Final size: 9*number of triangles
  vector<float> normals;  // (nx,ny,nz) Final size: 9*number of triangles
  vector<float> colors;   // (r, g, b)  Final size: 9*number of triangles
  vector<float> texCoords;// (s, t)     Final size: 6*number of triangles

  vector<unsigned int> indices;
  vector<Vector> sumnormals(numvertices, Vector(0,0,0));
  vector<int> degrees(numvertices, 0);

  auto verts = obj.vertices();
  auto Ns = obj.vertNormals();
  auto texcords = obj.vertTexCoords();

  for (auto&& f: obj.faces()){
    for (int i = 0; i < 3; ++i) {
      int index = f.vertexIndex(i);
      indices.push_back(index);

      sumnormals[index]+=Ns[f.normalIndex(i)];
      ++degrees[index];
    }
  }

  for (int i = 0; i < numvertices; ++i) {
    Point P = verts[i].coord();
    Vector N = sumnormals[i]/degrees[i];
    auto texCoord = texcords[i];

    vertices.push_back(P.x());
    vertices.push_back(P.y());
    vertices.push_back(P.z());
    normals.push_back(N.x());
    normals.push_back(N.y());
    normals.push_back(N.z());
    colors.push_back(fabs(N.x()));
    colors.push_back(fabs(N.y()));
    colors.push_back(fabs(N.z()));
    texCoords.push_back(texCoord.first);
    texCoords.push_back(texCoord.second);
  }

  assert(vertices.size() == 3*numvertices);
  assert(normals.size() == 3*numvertices);
  assert(colors.size() == 3*numvertices);
  assert(texCoords.size() == 2*numvertices);
  assert(indices.size() == 3*numfaces);

  // Step 2: Create VAO and empty buffers (coords, normals, ...)
  GLWidget& g = *glwidget();
  GLuint VAO;
  g.glGenVertexArrays(1, &VAO);
  VAOs.push_back(VAO);
  g.glBindVertexArray(VAO);
  
  GLuint coordBufferID;
  g.glGenBuffers(1, &coordBufferID);
  coordBuffers.push_back(coordBufferID);
  
  GLuint normalBufferID;
  g.glGenBuffers(1, &normalBufferID);
  normalBuffers.push_back(normalBufferID);
  
  GLuint stBufferID;
  g.glGenBuffers(1, &stBufferID);
  stBuffers.push_back(stBufferID);
  
  GLuint colorBufferID;
  g.glGenBuffers(1, &colorBufferID);
  colorBuffers.push_back(colorBufferID);

  GLuint indexBufferID;
  g.glGenBuffers(1, &indexBufferID);
  indexBuffers.push_back(indexBufferID);
  
  numIndices.push_back(numvertices);
  // Step 3: Define VBO data (coords, normals, ...)
  g.glBindBuffer(GL_ARRAY_BUFFER, coordBufferID);
  g.glBufferData(GL_ARRAY_BUFFER, sizeof(float)*vertices.size(), &vertices[0], GL_STATIC_DRAW);
  g.glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, 0); 
  g.glEnableVertexAttribArray(0);

  g.glBindBuffer(GL_ARRAY_BUFFER, normalBufferID);
  g.glBufferData(GL_ARRAY_BUFFER, sizeof(float)*normals.size(), &normals[0], GL_STATIC_DRAW);
  g.glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, 0, 0);
  g.glEnableVertexAttribArray(1);

  g.glBindBuffer(GL_ARRAY_BUFFER, colorBufferID);
  g.glBufferData(GL_ARRAY_BUFFER, sizeof(float)*colors.size(), &colors[0], GL_STATIC_DRAW);
  g.glVertexAttribPointer(2, 3, GL_FLOAT, GL_FALSE, 0, 0);
  g.glEnableVertexAttribArray(2);

  g.glBindBuffer(GL_ARRAY_BUFFER, stBufferID);
  g.glBufferData(GL_ARRAY_BUFFER, sizeof(float)*texCoords.size(), &texCoords[0], GL_STATIC_DRAW);
  g.glVertexAttribPointer(3, 2, GL_FLOAT, GL_FALSE, 0, 0);
  g.glEnableVertexAttribArray(3);

  g.glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indexBuffers[currentObject]);
  g.glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(int) * indices.size(), &indices[0], GL_STATIC_DRAW);
  g.glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);

  g.glBindBuffer(GL_ARRAY_BUFFER,0);
  g.glBindVertexArray(0);
}
