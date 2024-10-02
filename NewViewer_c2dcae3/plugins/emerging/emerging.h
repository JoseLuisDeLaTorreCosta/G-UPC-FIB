#ifndef _EMERGING_H
#define _EMERGING_H

#include "plugin.h"
#include <QOpenGLShader>
#include <QOpenGLShaderProgram>
#include <QElapsedTimer>

class Emerging : public QObject, public Plugin 
 {
     Q_OBJECT
     Q_PLUGIN_METADATA(IID "Plugin")   
     Q_INTERFACES(Plugin)
 public:
     void onPluginLoad();
     float lines_to_paint();
     void preFrame();
     void postFrame();

 private:
     QOpenGLShaderProgram* program;
     QOpenGLShader *fs, *vs; 
     QElapsedTimer timer;

 };

 #endif