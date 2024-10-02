#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

float a = 1.f/9.f;

void main()
{
    float x = mod(fract(vtexCoord.x), 2*a);

    if (x < a) fragColor = vec4(1.0, 1.0, 0, 1);
    else fragColor = vec4(1.0, 0, 0, 1);
}
