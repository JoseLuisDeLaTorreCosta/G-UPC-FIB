#include "draw-bounding-box.h"


void Draw_bounding_box::onPluginLoad()
{
    
  vs = new QOpenGLShader(QOpenGLShader::Vertex, this);
	vs->compileSourceFile(glwidget()->getPluginPath()+"../draw-bounding-box/draw-bounding-box.vert");
	cout << "VS log: " << vs -> log().toStdString() << endl;
	

	fs = new QOpenGLShader(QOpenGLShader::Fragment, this);
  fs->compileSourceFile(glwidget()->getPluginPath()+"../draw-bounding-box/draw-bounding-box.frag");
  cout << "FS log:" << fs->log().toStdString() << endl;

    program = new QOpenGLShaderProgram(this);
    program->addShader(vs);
    program->addShader(fs);
    program->link();
    cout << "Link log:" << program->log().toStdString() << endl;
}

GLuint Draw_bounding_box::createBox(GLWidget &g) {
    vector<float> vertices = {
      0, 0, 1, 
      0, 1, 1, 
      1, 1, 1, 

      0, 0, 1, 
      1, 0, 1, 
      1, 1, 1, 

      1, 0, 1,
      1, 1, 1, 
      1, 1, 0, 

      1, 0, 1,
      1, 0, 0, 
      1, 1, 0, 

      0, 0, 1, 
      0, 1, 1, 
      0, 1, 0, 

      0, 0, 1, 
      0, 0, 0, 
      0, 1, 0, 

      0, 0, 0, 
      0, 1, 0, 
      1, 1, 0, 

      0, 0, 0, 
      1, 0, 0, 
      1, 1, 0, 

      0, 1, 1, 
      0, 1, 0, 
      1, 1, 0, 

      0, 1, 1, 
      1, 1, 1, 
      1, 1, 0, 

      0, 0, 1, 
      0, 0, 0, 
      1, 0, 0, 

      0, 0, 1, 
      1, 0, 1, 
      1, 0, 0
    };
    vector<float> colors;



    for (int x = 0; x < vertices.size(); ++x) {
      colors.push_back(0);
      colors.push_back(0);
      colors.push_back(0);
    }

    GLuint VAO;
    g.glGenVertexArrays(1,&VAO);

    GLuint coordBufferID;
    g.glGenBuffers(1, &coordBufferID);

    GLuint colorBufferID;
    g.glGenBuffers(1, &colorBufferID);

    g.glBindVertexArray(VAO);
    g.glBindBuffer(GL_ARRAY_BUFFER, coordBufferID);
    g.glBufferData(GL_ARRAY_BUFFER, sizeof(float)*vertices.size(), &vertices[0], GL_STATIC_DRAW);
    g.glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, 0);
    g.glEnableVertexAttribArray(0);

    g.glBindBuffer(GL_ARRAY_BUFFER, colorBufferID);
    g.glBufferData(GL_ARRAY_BUFFER, sizeof(float)*colors.size(), &colors[0], GL_STATIC_DRAW);
    g.glVertexAttribPointer(2, 3, GL_FLOAT, GL_FALSE, 0, 0);
    g.glEnableVertexAttribArray(2);
    g.glBindVertexArray(0);
    return VAO;
}

void Draw_bounding_box::postFrame() 
{
    GLWidget & widget = * glwidget();
	  widget.makeCurrent();

    GLuint VAO = createBox(widget);
    
    // bind shader and define uniforms
    program->bind();
    QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->viewMatrix();
    program->setUniformValue("modelViewProjectionMatrix", MVP); 

    for (auto object : scene()->objects()) {
      program->setUniformValue("boundingBoxMin", object.boundingBox().min());
      program->setUniformValue("boundingBoxMax", object.boundingBox().max());
      widget.glBindVertexArray(VAO);
      widget.glDrawArrays(GL_TRIANGLES, 0, 36);
      widget.glBindVertexArray(0);
    }
    
    // unbind shader
    program->release();
}