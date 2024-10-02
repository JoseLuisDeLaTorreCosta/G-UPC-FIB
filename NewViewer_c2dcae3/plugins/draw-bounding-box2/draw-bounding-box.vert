#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 2) in vec3 color;

out vec4 frontColor;

uniform mat4 modelViewProjectionMatrix;

uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;

void main()
{
    frontColor = vec4(color,1.0);
    mat4 scale=mat4(vec4(boundingBoxMax.x-boundingBoxMin.x, 0, 0, 0),
           vec4(0, boundingBoxMax.y-boundingBoxMin.y, 0, 0),
           vec4(0, 0, boundingBoxMax.z-boundingBoxMin.z, 0),
           vec4(0, 0, 0, 1));
    vec4 C = vec4((boundingBoxMax + boundingBoxMin)/2.0, 1.0);
    
    vec4 V = scale*vec4((vertex - vec3(0.5)), 1.0);
    gl_Position = modelViewProjectionMatrix * (C + V);
}
