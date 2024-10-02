#ifndef _ISAFLOOR_H
#define _ISAFLOOR_H

#include "plugin.h"
#include <QOpenGLShader>
#include <QOpenGLShaderProgram>

class IsAFloor : public QObject, public Plugin
    {
        Q_OBJECT
        Q_PLUGIN_METADATA(IID "Plugin")   
        Q_INTERFACES(Plugin)
        
        public:
            void onPluginLoad();
            void onObjectAdd ();
            void onSceneClear();

            void preFrame();
            void postFrame();
        
        private:
            QOpenGLShaderProgram* program;
            QOpenGLShader* vs;
            QOpenGLShader* fs;  
            float calculate(Object& object);
            void printInfo(Object& object);
    };
#endif