#version 330 core


out vec4 fragColor;

in vec2 vtexCoord;
uniform int dificultad = 3;

void main()
{
    float x = fract(vtexCoord.x);
    float y = fract(vtexCoord.y);

    float length_x = length(vtexCoord.x);
    float length_y = length(vtexCoord.y);
    float d = sqrt(pow(vtexCoord.x - 0.5f, 2) + pow(3.f*(vtexCoord.y - 0.5f)/4.f, 2));
    float d2 = sqrt(pow(vtexCoord.x - 0.3f, 2) + pow(3.f*(vtexCoord.y - 0.5f)/4.f, 2));
    float d3 = sqrt(pow(vtexCoord.x - 0.72f, 2) + pow(3.f*(vtexCoord.y - 0.5f)/4.f, 2));
    float d4 = sqrt(pow(vtexCoord.x - 0.55f, 2) + pow(3.f*(vtexCoord.y - 0.5f)/4.f, 2));

    switch (dificultad) {
        case 1:
            if (y <= 1.f/3.f) fragColor = vec4(0.2, 0.4, 1.0, 1.0);
            else if (y <= 2.f/3.f) fragColor = vec4(1.0, 1.0, 0.0, 1.0);
            else if (y <= 1.f) fragColor = vec4(0.0, 1.0, 0.4, 1.0);
            break;
        case 2:
            if (d < 0.15) fragColor = vec4(0.4, 1.0, 0.4, 1.0);
            else if (x <= 1.f/3.f) fragColor = vec4(1.0, 0.0, 0.0, 1.0);
            else if (x <= 2.f/3.f) fragColor = vec4(0.2, 0.4, 1.0, 1.0);
            else if (x <= 1.f) fragColor = vec4(1.0, 1.0, 0.0, 1.0);
            break;
        case 3:
            if (d2 < 0.15 || (d3 < 0.25 && d4 > 0.25)) discard;
            else fragColor = vec4(0.1, 0.1, 0.9, 1.0);
            break;
    }
}
