#ifndef _SHOW_DEGREE_H
#define _SHOW_DEGREE_H

#include "plugin.h"
#include <QPainter>

class Show_degree : public QObject, Plugin
 {
     Q_OBJECT
     Q_PLUGIN_METADATA(IID "Plugin")   
     Q_INTERFACES(Plugin)

 public:
    void onPluginLoad();
    void postFrame() Q_DECL_OVERRIDE;
 private:
    QPainter painter;
    float graumig;
 };
 
#endif