#ifndef _MODELINFO_H
#define _MODELINFO_H

#include "plugin.h"
#include <QOpenGLShader>
#include <QOpenGLShaderProgram>

class Modelinfo : public QObject, public Plugin
    {
        Q_OBJECT
        Q_PLUGIN_METADATA(IID "Plugin")   
        Q_INTERFACES(Plugin)
        
        public:
            void onPluginLoad();
            void onObjectAdd ();
            void onSceneClear();
        
        private:
            QOpenGLShaderProgram* program;
            void printInfo();
    };
#endif