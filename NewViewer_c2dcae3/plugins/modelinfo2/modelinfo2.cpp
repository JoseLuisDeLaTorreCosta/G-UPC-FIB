#include "modelinfo2.h"
using namespace std;

void Modelinfo2::printInfo() {
    numObj = scene()->objects().size();

    numPol = 0;
    numVert = 0;
    numTriang = 0;
    for (auto object : scene()->objects()) {
        numPol += object.faces().size();
        numVert += object.vertices().size();

        for (auto face : object.faces()) {
            if (face.numVertices() == 3) numTriang+=1;
        }
    }

    if (numPol == 0) perc = 0;
    else perc = (float) numTriang/(float) numPol*100;
}


void Modelinfo2::onPluginLoad() {
    printInfo();
}

void Modelinfo2::onObjectAdd () {
    printInfo();
}

void Modelinfo2::onSceneClear () {
    printInfo();
}

void Modelinfo2::postFrame() 
{
  QFont font;
  font.setPixelSize(16);
  painter.begin(glwidget());
  painter.setFont(font);
  int x = 15;
  int y = 20;
  painter.drawText(x, y, QString("Objectes carregats: " "%1").arg(numObj));    
  y = 40;
  painter.drawText(x, y, QString("Nombre de poligons: " "%1").arg(numPol));
  y = 60;
  painter.drawText(x, y, QString("Nombre de vertexs:  " "%1").arg(numVert));
  y = 80;
  painter.drawText(x, y, QString("Proporcio tri/poli: " "%1" "%").arg(perc));
  painter.end();
}