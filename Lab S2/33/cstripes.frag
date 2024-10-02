#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform int nstripes = 16;
uniform vec2 origin = vec2(0,0);

float dist(vec2 or) {
    return length(vtexCoord - origin);
}

void main()
{
    float d = mod(dist(origin), 2.f/nstripes);

    if (d < 1.f/nstripes) fragColor = vec4(1.0, 0.0, 0.0, 1.0);
    else fragColor = vec4(1.0, 1.0, 0.0, 1.0);
}
