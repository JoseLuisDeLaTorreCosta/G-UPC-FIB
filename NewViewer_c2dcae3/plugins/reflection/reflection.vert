#version 330 core
uniform mat4 modelViewProjectionMatrix;
uniform mat4 reflectionMatrix;

layout (location = 0) in vec3 vertex;
layout (location = 2) in vec3 color;

out vec4 frontColor;
const float PI = 3.141592;

void main()
{
	frontColor = vec4(color,1.0);
	gl_Position    = modelViewProjectionMatrix * reflectionMatrix * vec4(vertex,1.0);
}

