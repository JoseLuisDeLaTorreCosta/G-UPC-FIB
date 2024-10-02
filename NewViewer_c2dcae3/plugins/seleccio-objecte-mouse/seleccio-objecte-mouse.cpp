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

#include "seleccio-objecte-mouse.h"

void SET::onPluginLoad()
{
    // Carregar shader, compile & link 
    vs = new QOpenGLShader(QOpenGLShader::Vertex, this);
    vs->compileSourceFile(glwidget()->getPluginPath()+"/../seleccio-objecte-mouse/seleccio-objecte-mouse.vert");
    cout << "VS log:" << vs->log().toStdString() << endl;

    fs = new QOpenGLShader(QOpenGLShader::Fragment, this);
    fs->compileSourceFile(glwidget()->getPluginPath()+"/../seleccio-objecte-mouse/seleccio-objecte-mouse.frag");
    cout << "FS log:" << fs->log().toStdString() << endl;

    program = new QOpenGLShaderProgram(this);
    program->addShader(vs);
    program->addShader(fs);
    program->link();
    cout << "Link log:" << program->log().toStdString() << endl;
}


QVector4D encodeID(int i) {
  return QVector4D((i) & 0xFF, (i >> 8) & 0xFF, (i >> 16) & 0xFF, (i >> 24) & 0xFF);
}

int decodeID(GLubyte color[4]) {
  return (color[3] << 24)*255 | (color[2] << 16)*255 | (color[1] << 8)*255 | color[0]*255;
}

void SET::mouseReleaseEvent(QMouseEvent *e) {
  if ((e->button() & Qt::LeftButton) && (e->modifiers() & Qt::ControlModifier)) {
    glwidget()->makeCurrent();
    std::cout << "a" << std::endl;
    glClearColor(0, 0, 0, 0);
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->viewMatrix();
    program->setUniformValue("modelViewProjectionMatrix", MVP); 
    for (unsigned int i=0; i<scene()->objects().size(); ++i) {
      QVector4D color = encodeID(i + 1); // trieu la conversió que volgueu
      program->setUniformValue("color", QVector4D(color[0]/255.0,color[1]/255.0, color[2]/255.0, color[3]/255.0));
      drawPlugin()->drawObject(i);
    }

    int x = e->x();
    int y = glwidget()->height()-e->y();
    GLubyte read[4];
    glReadPixels(x, y, 1, 1, GL_RGBA, GL_UNSIGNED_BYTE, read);
    scene()->setSelectedObject(decodeID(read) - 1);
    glwidget()->update();
  }
}