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

#include "depthnormal.h"
#include <QCoreApplication>

void DepthNormal::linkDepth(GLWidget & g) {
    // Carregar shader, compile & link 
    vs = new QOpenGLShader(QOpenGLShader::Vertex, this);
    vs->compileSourceFile(g.getPluginPath()+"/../depthnormal/depth.vert");

    fs = new QOpenGLShader(QOpenGLShader::Fragment, this);
    fs->compileSourceFile(g.getPluginPath()+"/../depthnormal/depth.frag");

    Depthprogram = new QOpenGLShaderProgram(this);
    Depthprogram->addShader(vs);
    Depthprogram->addShader(fs);
    Depthprogram->link();
}

void DepthNormal::linkNormal(GLWidget & g) {
    // Carregar shader, compile & link 
    vs = new QOpenGLShader(QOpenGLShader::Vertex, this);
    vs->compileSourceFile(g.getPluginPath()+"/../depthnormal/normal.vert");

    fs = new QOpenGLShader(QOpenGLShader::Fragment, this);
    fs->compileSourceFile(g.getPluginPath()+"/../depthnormal/normal.frag");

    NormalProgram = new QOpenGLShaderProgram(this);
    NormalProgram->addShader(vs);
    NormalProgram->addShader(fs);
    NormalProgram->link();
}

void DepthNormal::onPluginLoad()
{
    GLWidget & g = *glwidget();
    g.makeCurrent();
    
    linkDepth(g);
    linkNormal(g);
}


bool DepthNormal::paintGL()
{   
    GLWidget & g = *glwidget();
    g.makeCurrent();
    g.glClearColor(0,0,0,0);
    g.glClear(GL_DEPTH_BUFFER_BIT | GL_COLOR_BUFFER_BIT);
    

    float ar = (g.height() / g.width())/2;
    //camera()->setAspectRatio(ar);

    QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->viewMatrix();
    QMatrix3x3 NM=camera()->viewMatrix().normalMatrix();

    Depthprogram->bind();
    glViewport(0, 0, g.width()/2, g.height()/2);
    Depthprogram->setUniformValue("modelViewProjectionMatrix", MVP); 
    Depthprogram->setUniformValue("normalMatrix", NM);  
    if (drawPlugin()) drawPlugin()->drawScene();


    NormalProgram->bind();
    glViewport(g.width()/2, 0, g.width()/2, g.height()/2);
    NormalProgram->setUniformValue("modelViewProjectionMatrix", MVP); 
    NormalProgram->setUniformValue("normalMatrix", NM);  
    if (drawPlugin()) drawPlugin()->drawScene();

    g.update();

    
    return true;
}

