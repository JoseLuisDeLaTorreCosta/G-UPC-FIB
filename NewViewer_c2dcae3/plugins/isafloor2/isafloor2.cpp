#include "isafloor2.h"
using namespace std;



void ISAFLOOR::printInfo() {
    const vector <Vertex> & vertices = scene()->objects()[0].vertices();
    float objectArea = 0;
    float usableObjectArea = 0;

    for (auto face : scene()->objects()[0].faces()) {
        float dot = Vector::dotProduct(face.normal(), Vector(0, 0, 1));
		const Point & v0 = vertices[face.vertexIndex(0)].coord();
		const Point & v1 = vertices[face.vertexIndex(1)].coord();
		const Point & v2 = vertices[face.vertexIndex(2)].coord();
		Vector v = v1 - v0;
		Vector u = v2 - v0;
		float area = Vector::crossProduct(u, v).length() / 2;
		objectArea += area;
		if (dot > 0.7) usableObjectArea += area;
    }


    lambda = usableObjectArea/objectArea;
}


void ISAFLOOR::onPluginLoad() {
    // Carregar shader, compile & link 
    vs = new QOpenGLShader(QOpenGLShader::Vertex, this);
    vs->compileSourceFile(glwidget()->getPluginPath()+"../isafloor/isafloor.vert");
    cout << "VS log:" << vs->log().toStdString() << endl;

    fs = new QOpenGLShader(QOpenGLShader::Fragment, this);
    fs->compileSourceFile(glwidget()->getPluginPath()+"../isafloor/isafloor.frag");
    cout << "FS log:" << fs->log().toStdString() << endl;

    program = new QOpenGLShaderProgram(this);
    program->addShader(vs);
    program->addShader(fs);
    program->link();
    cout << "Link log:" << program->log().toStdString() << endl;
}


void ISAFLOOR::onObjectAdd() {
    if (scene()->objects().size() > 0) {
        printInfo();
        cout << "TERRA: " << lambda << endl;
    }
}


void ISAFLOOR::preFrame() {
    program->bind();

    QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->viewMatrix();
    program->setUniformValue("modelViewProjectionMatrix", MVP); 

    QMatrix3x3 NM=camera()->viewMatrix().normalMatrix();
    program->setUniformValue("normalMatrix", NM); 

    program->setUniformValue("lambda", lambda);
}
