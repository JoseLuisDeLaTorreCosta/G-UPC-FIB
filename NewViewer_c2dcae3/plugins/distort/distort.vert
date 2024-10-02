#version 330 core
uniform mat4 modelViewProjectionMatrix;

layout (location = 0) in vec3 vertex;
layout (location = 3) in vec2 texCoord;

out vec2 vtexCoord;

void main()
{
	vtexCoord = texCoord;
	gl_Position    = modelViewProjectionMatrix * vec4(vertex,1.0);
}

