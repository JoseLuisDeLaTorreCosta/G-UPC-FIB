#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

void main()
{
    float x = fract(vtexCoord.x);
    float y = fract(vtexCoord.y);

    if ((x > 0.7 && x < 0.8) || (x > 0.2 && x < 0.7 && y < 0.1) || (x > 0.2 && x < 0.3 && y < 0.25)) fragColor = vec4(0.0, 0.0, 1.0, 1.0);
    else discard;
}
