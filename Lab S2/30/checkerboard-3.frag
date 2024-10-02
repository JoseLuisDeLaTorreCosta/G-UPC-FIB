#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;
uniform float n = 8;

void main()
{
    vec2 newvtexCoord = vtexCoord*n;
    
    if (fract(newvtexCoord.s) < 1.f/9.f || fract(newvtexCoord.t) < 1.f/9.f) fragColor = vec4(0.0);
    else fragColor = vec4(0.8);
}
