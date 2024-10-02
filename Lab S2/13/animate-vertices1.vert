#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform float amplitude = 0.1;
uniform float freq = 1;
uniform float time;
const float PI = 3.141592;

void main()
{
    float Trans = sin(2*PI*freq*time)*amplitude;
    vec3 V = vertex + abs(Trans)*normal;
    
    
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(1.0) * N.z;
    gl_Position = modelViewProjectionMatrix * vec4(V, 1.0);
}
