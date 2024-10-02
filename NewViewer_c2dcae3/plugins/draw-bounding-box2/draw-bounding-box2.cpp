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

#include "draw-bounding-box2.h"
#include <QCoreApplication>


void DBB::onPluginLoad()
{
    GLWidget &g = *glwidget();
    g.makeCurrent();
    // Resize to power-of-two viewport

    // Carregar shader, compile & link 
    vs = new QOpenGLShader(QOpenGLShader::Vertex, this);
    vs->compileSourceFile(glwidget()->getPluginPath()+"/../draw-bounding-box2/draw-bounding-box.vert");
    //cout << "vs" << endl;

    fs = new QOpenGLShader(QOpenGLShader::Fragment, this);
    fs->compileSourceFile(glwidget()->getPluginPath()+"/../draw-bounding-box2/draw-bounding-box.frag");
    //cout << "fs" << endl;

    program = new QOpenGLShaderProgram(this);
    program->addShader(vs);
    program->addShader(fs);
    program->link();
    if (!program->isLinked()) cout << "Shader link error" << endl; 
}

GLuint DBB::createBox(GLWidget &g) {
    vector<float> vertices = {
      0, 0, 1, 
      0, 1, 1, 
      1, 1, 1, 

      0, 0, 1, 
      1, 0, 1, 
      1, 1, 1, 

      1, 0, 1,
      1, 1, 1, 
      1, 1, 0, 

      1, 0, 1,
      1, 0, 0, 
      1, 1, 0, 

      0, 0, 1, 
      0, 1, 1, 
      0, 1, 0, 

      0, 0, 1, 
      0, 0, 0, 
      0, 1, 0, 

      0, 0, 0, 
      0, 1, 0, 
      1, 1, 0, 

      0, 0, 0, 
      1, 0, 0, 
      1, 1, 0, 

      0, 1, 1, 
      0, 1, 0, 
      1, 1, 0, 

      0, 1, 1, 
      1, 1, 1, 
      1, 1, 0, 

      0, 0, 1, 
      0, 0, 0, 
      1, 0, 0, 

      0, 0, 1, 
      1, 0, 1, 
      1, 0, 0
    };

    vector<float> colors;

    for (int i = 0; i < (int)vertices.size(); ++i) {
        colors.push_back(0);
        colors.push_back(0);
        colors.push_back(0);
    }

    GLuint VAO;
    g.glGenVertexArrays(1,&VAO);

    GLuint coordBufferID;
    g.glGenBuffers(1, &coordBufferID);

    GLuint colorsBufferID;
    g.glGenBuffers(1, &colorsBufferID);

    g.glBindVertexArray(VAO);
    g.glBindBuffer(GL_ARRAY_BUFFER, coordBufferID);
    g.glBufferData(GL_ARRAY_BUFFER, sizeof(float)*vertices.size(), &vertices[0], GL_STATIC_DRAW);
    g.glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, 0);
    g.glEnableVertexAttribArray(0);

    g.glBindBuffer(GL_ARRAY_BUFFER, colorsBufferID);
    g.glBufferData(GL_ARRAY_BUFFER, sizeof(float)*colors.size(), &colors[0], GL_STATIC_DRAW);
    g.glVertexAttribPointer(2, 3, GL_FLOAT, GL_FALSE, 0, 0);
    g.glEnableVertexAttribArray(2);
    g.glBindVertexArray(0);

    return VAO;
}

void DBB::postFrame() {
    GLWidget &g = *glwidget();
    g.makeCurrent();

    GLuint VAO = createBox(g);

    program->bind();

    QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->viewMatrix();
    program->setUniformValue("modelViewProjectionMatrix", MVP); 

    for (auto object : scene()->objects()) {
        program->setUniformValue("boundingBoxMin", object.boundingBox().min());
        program->setUniformValue("boundingBoxMax", object.boundingBox().max());

        g.glBindVertexArray(VAO);
        g.glDrawArrays(GL_TRIANGLES, 0, 36);
        g.glBindVertexArray(0);
    }

    program->release();
}

