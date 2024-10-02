#include "isafloor.h"
using namespace std;

float IsAFloor::calculate(Object& object) {
    float area = 0;
    float usable_area = 0;

    for (auto face : object.faces()) {
        float dot = Vector::dotProduct(Vector(0, 0, 1), face.normal());
        
        Vector a = object.vertices()[face.vertexIndex(0)].coord();
        Vector b = object.vertices()[face.vertexIndex(1)].coord();
        Vector c = object.vertices()[face.vertexIndex(2)].coord();

        Vector u = b - a;
        Vector v = c - a; 

        float cross = Vector::crossProduct(u, v).length()/2.0;
        area += cross;
        if (dot > 0.7) usable_area += cross;
    }

    if (area > 0) return usable_area/area;
    return 0;
}

void IsAFloor::printInfo(Object& object) {
    float area = calculate(object);

    if (area > 0) {
        cout << "TERRA: " << area << endl;
    }
}


void IsAFloor::onPluginLoad() {
    GLWidget &g = *glwidget();
    g.makeCurrent();
    // Resize to power-of-two viewport

    // Carregar shader, compile & link 
    vs = new QOpenGLShader(QOpenGLShader::Vertex, this);
    vs->compileSourceFile(glwidget()->getPluginPath()+"/../isafloor2/isafloor.vert");
    //cout << "vs" << endl;

    fs = new QOpenGLShader(QOpenGLShader::Fragment, this);
    fs->compileSourceFile(glwidget()->getPluginPath()+"/../isafloor2/isafloor.frag");
    //cout << "fs" << endl;

    program = new QOpenGLShaderProgram(this);
    program->addShader(vs);
    program->addShader(fs);
    program->link();
    if (!program->isLinked()) cout << "Shader link error" << endl;


    for (auto object: scene()->objects()) {
        printInfo(object);
    }
}

void IsAFloor::onObjectAdd () {
    for (auto object: scene()->objects()) {
        printInfo(object);
    }
}

void IsAFloor::preFrame() {
    program->bind();

    QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->viewMatrix();
    program->setUniformValue("modelViewProjectionMatrix", MVP); 
    program->setUniformValue("normalMatrix", camera()->viewMatrix().normalMatrix());

    for (auto object: scene()->objects()) {
        program->setUniformValue("proportion", calculate(object));
    }
}

void IsAFloor::postFrame() {
    program->release();
}

void IsAFloor::onSceneClear () {
    for (auto object: scene()->objects()) {
        printInfo(object);
    }
}