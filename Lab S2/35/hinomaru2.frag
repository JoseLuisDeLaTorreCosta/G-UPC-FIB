#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

uniform bool classic;
const float PI = 3.141592;
float angle = PI/16.f;

vec4 step(float edge, float x) {
    if (x < edge) return vec4(1.0, 0.0, 0.0, 1.0);
    else return vec4(1.0);
}

vec4 stepClassic(float edge, float x) {
    vec2 u = vec2(vtexCoord.x - 0.5, vtexCoord.y - 0.5);
    if (x < edge || mod (atan(u.x, u.y)/angle + 0.5, 2) < 1) return vec4(1.0, 0.0, 0.0, 1.0);
    else return vec4(1.0);
}

void main()
{
    float x = fract(vtexCoord.x);
    float y = fract(vtexCoord.y);

    float d = length(vtexCoord.xy - vec2(0.5, 0.5));
    if (!classic) fragColor = step(0.2, d);
    else fragColor = stepClassic(0.2, d);
}
