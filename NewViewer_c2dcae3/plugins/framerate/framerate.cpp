#include "framerate.h"
using namespace std;

void Framerate::preFrame() {
    timer.start();
}

void Framerate::postFrame() 
{
  QFont font;
  font.setPixelSize(16);
  painter.begin(glwidget());
  painter.setFont(font);
  int x = 15;
  int y = 20;
  float time = timer.elapsed()/1000.0f;
  int frames = int(1.0f/time);
  painter.drawText(x, y, QString("FrameRate: " "%1").arg(frames));    
  
  painter.end();
}