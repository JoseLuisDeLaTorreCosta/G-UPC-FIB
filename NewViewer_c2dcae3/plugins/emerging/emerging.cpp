#include "emerging.h"
#include <QCoreApplication>

void Emerging::onPluginLoad()
{
    GLWidget &g = *glwidget();
    g.makeCurrent();

    
    vs = new QOpenGLShader(QOpenGLShader::Vertex, this);
    vs->compileSourceFile(g.getPluginPath()+"/../emerging/emerging.vert");
    cout << "VS log: " << vs -> log().toStdString() << endl;

    fs = new QOpenGLShader(QOpenGLShader::Fragment, this);
    fs->compileSourceFile(g.getPluginPath()+"/../emerging/emerging.frag");
    cout << "FS log:" << fs->log().toStdString() << endl;

    program = new QOpenGLShaderProgram(this);
    program->addShader(vs);
    program->addShader(fs);
    program->link();
    cout << "Link log:" << program->log().toStdString() << endl;

    timer.start();
}

float Emerging::lines_to_paint() {
    GLWidget &g = *glwidget();
    g.makeCurrent();
    if (timer.elapsed()/1000.0f > 2.f) timer.restart();

    if (timer.elapsed()/1000.0f < 1.f) {
        return (timer.elapsed()/1000.0f)*g.height();
    }
    else {
        return 2*g.height() - (timer.elapsed()/1000.0f)*g.height();
    }
}

void Emerging::preFrame() 
{
    program->bind();
    QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->viewMatrix();
    program->setUniformValue("modelViewProjectionMatrix", MVP); 

    QMatrix3x3 NM=camera()->viewMatrix().normalMatrix();
    program->setUniformValue("normalMatrix", NM); 

    program->setUniformValue("files", lines_to_paint());
}

void Emerging::postFrame() 
{
    // unbind shader
    program->release();
}