#ifndef _DRAW_BOUNDING_BOX_H
#define _DRAW_BOUNDING_BOX_H

#include "plugin.h"
#include <QOpenGLShader>
#include <QOpenGLShaderProgram>


class Draw_bounding_box : public QObject, public Plugin
 {
     Q_OBJECT
     Q_PLUGIN_METADATA(IID "Plugin")   
     Q_INTERFACES(Plugin)

 public:
    void onPluginLoad();
    GLuint createBox(GLWidget &g);
    void postFrame();
    
 private:
    QOpenGLShaderProgram* program;
    QOpenGLShader *fs, *vs; 
    
 };
 
 #endif
