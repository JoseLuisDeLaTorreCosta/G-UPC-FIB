#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

void main()
{
    float x = mod(vtexCoord.x, 1.0);
    float y = mod(vtexCoord.y, 1.0);
    
    if (x < 0.1 || y < 0.1) fragColor = vec4(1.0, 0.0, 0.0, 1.0);
    else discard;
}
