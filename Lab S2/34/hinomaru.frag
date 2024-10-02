#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

vec4 step(float edge, float x) {
    if (x < edge) return vec4(1.0, 0.0, 0.0, 1.0);
    else return vec4(1.0);
}

void main()
{
    float x = fract(vtexCoord.x);
    float y = fract(vtexCoord.y);

    float d = length(vtexCoord.xy - vec2(0.5, 0.5));
    fragColor = step(0.2, d);
}
