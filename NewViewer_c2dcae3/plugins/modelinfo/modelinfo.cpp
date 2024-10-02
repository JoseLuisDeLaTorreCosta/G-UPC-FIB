#include "modelinfo.h"
using namespace std;

void Modelinfo::printInfo() {
    cout << "----------INFO----------" << endl;
    int numObj = scene()->objects().size();

    int numPol = 0;
    int numVert = 0;
    int numTriang = 0;
    for (auto object : scene()->objects()) {
        numPol += object.faces().size();
        numVert += object.vertices().size();

        for (auto face : object.faces()) {
            if (face.numVertices() == 3) numTriang+=1;
        }
    }

    float perc;
    if (numPol == 0) perc = 0;
    else perc = (float) numTriang/(float) numPol*100;

    

    cout << "Objectes carregats: " << numObj << endl;
    cout << "Nombre de poligons: " << numPol << endl;
    cout << "Nombre de vertexs:  " << numVert << endl;
    cout << "Proporcio tri/poli: " << perc << "%" << endl;
}


void Modelinfo::onPluginLoad() {
    printInfo();
}

void Modelinfo::onObjectAdd () {
    printInfo();
}

void Modelinfo::onSceneClear () {
    printInfo();
}