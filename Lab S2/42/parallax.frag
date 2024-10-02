#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform sampler2D map;
uniform float time;
uniform float a = 0.5;

const float PI = 3.141592;

void main()
{
    vec4 c = texture(map, vtexCoord);
    float m = max(c.x, max(c.y, c.z));

    float angle = 2*PI*time;
    mat2 rotate = mat2(vec2(cos(angle), sin(angle)), vec2(-sin(angle), cos(angle)));

    vec2 u = rotate*vec2(m, m);

    vec2 offset = (a/100.f)*u;
    
    fragColor = texture(map, vtexCoord + offset);
}
