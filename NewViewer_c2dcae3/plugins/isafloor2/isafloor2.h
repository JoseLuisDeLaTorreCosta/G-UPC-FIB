#ifndef _ISAFLOOR_H
#define _ISAFLOOR_H

#include "plugin.h"
#include <QOpenGLShader>
#include <QOpenGLShaderProgram>
#include <cmath>

class ISAFLOOR : public QObject, public Plugin
    {
        Q_OBJECT
        Q_PLUGIN_METADATA(IID "Plugin")   
        Q_INTERFACES(Plugin)
        
        public:
            void onPluginLoad();
            void onObjectAdd();
            void preFrame();
            void postFrame();
        
        private:
            QOpenGLShaderProgram* program;
            QOpenGLShader *fs, *vs; 
            void printInfo();
            float lambda = 0;
    };
#endif