#ifndef _MODELINFO2_H
#define _MODELINFO2_H

#include "plugin.h"
#include <QOpenGLShader>
#include <QOpenGLShaderProgram>
#include <QPainter>

class Modelinfo2 : public QObject, public Plugin
    {
        Q_OBJECT
        Q_PLUGIN_METADATA(IID "Plugin")   
        Q_INTERFACES(Plugin)
        
        public:
            void onPluginLoad();
            void onObjectAdd ();
            void onSceneClear();
            void postFrame() Q_DECL_OVERRIDE;
        
        private:
            QOpenGLShaderProgram* program;
            void printInfo();
            int numObj;
            int numPol;
            int numVert;
            int numTriang;
            float perc;
            QPainter painter;
    };
#endif