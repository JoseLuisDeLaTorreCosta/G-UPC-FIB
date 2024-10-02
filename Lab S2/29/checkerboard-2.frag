#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

uniform float n = 8;

void main()
{
    float x = int(mod(vtexCoord.x*n, 2));
    float y = int(mod(vtexCoord.y*n, 2));

    if (x == y) fragColor = vec4(0.8);
    else fragColor = vec4(0, 0, 0, 1);
}
