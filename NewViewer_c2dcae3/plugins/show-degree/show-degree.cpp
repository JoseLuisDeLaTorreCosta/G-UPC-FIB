#include "show-degree.h"
#include "glwidget.h"


void Show_degree::onPluginLoad() {
    Object &first_object = scene()->objects()[0];
    int nCares = first_object.faces().size();
    int nVertexCares = nCares*3;
    int nVertexs = first_object.vertices().size();
    graumig = (float) nVertexCares/(float) nVertexs;
}

void Show_degree::postFrame() 
{
  QFont font;
  font.setPixelSize(32);
  painter.begin(glwidget());
  painter.setFont(font);
  int x = 15;
  int y = 40;
  painter.drawText(x, y, QString("%1").arg(graumig));    
  painter.end();
}