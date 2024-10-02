#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;
uniform float time;

in float pos;

void main()
{
    float x = pos;
    
    if (x <= time-1.f) fragColor = vec4(0, 0.0, 1.0, 1.0);
    else discard;
}
