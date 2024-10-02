#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform mat4 modelViewMatrix;

uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;
uniform float time;
uniform bool eyespace;
const float PI = 3.141592;

void main()
{
    float r = length(boundingBoxMax - boundingBoxMin)/2.0;
    vec4 vert = modelViewMatrix * vec4(vertex, 1.0);
    float d;
    if (eyespace) d = (r/10.f)*vert.y;
    else d = (r/10.f)*vertex.y; 
    

    frontColor = vec4(color,1.0);
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vertex + normal*d*sin(2*PI*time), 1.0);
}
