#ifndef _FRAMERATE_H
#define _FRAMERATE_H

#include "plugin.h"
#include <QOpenGLShader>
#include <QOpenGLShaderProgram>
#include <QPainter>
#include <QElapsedTimer>

class Framerate : public QObject, public Plugin
    {
        Q_OBJECT
        Q_PLUGIN_METADATA(IID "Plugin")   
        Q_INTERFACES(Plugin)
        
        public:
            void preFrame() Q_DECL_OVERRIDE;
            void postFrame() Q_DECL_OVERRIDE;
        
        private:
            QOpenGLShaderProgram* program;
            QPainter painter;
            QElapsedTimer timer;
    };
#endif