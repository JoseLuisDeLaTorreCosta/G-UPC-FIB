#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

void main()
{
    float x = int(mod(vtexCoord.x*8, 2));
    float y = int(mod(vtexCoord.y*8, 2));
    
    if (x == y) fragColor = vec4(0.8);
    else fragColor = vec4(0, 0, 0, 1);
}
