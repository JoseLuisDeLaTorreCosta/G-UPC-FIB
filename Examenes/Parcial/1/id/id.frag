#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform sampler2D colorMap;
uniform float time;

void main()
{
    vec2 scale = vec2(0.6f, 1.f);
    vec2 offset = vec2(0.6f, 0.f);
    vec2 newvtexCoord = vtexCoord*scale;

    if (vtexCoord.x < 1.f/6.f) newvtexCoord = newvtexCoord + vec2(0.2f, 0.f);
    else if (vtexCoord.x < 2.f/6.f) newvtexCoord = newvtexCoord + vec2(0.0f, 0.f);
    else if (vtexCoord.x < 3.f/6.f) newvtexCoord = newvtexCoord + vec2(0.5f, 0.f);
    else if (vtexCoord.x < 4.f/6.f) newvtexCoord = newvtexCoord + vec2(0.2f, 0.f);
    else if (vtexCoord.x < 5.f/6.f) newvtexCoord = newvtexCoord + vec2(-0.3f, 0.f);
    else if (vtexCoord.x <= 6.f/6.f) newvtexCoord = newvtexCoord + vec2(0.7f, 0.f);
    
    vec4 C = texture(colorMap, newvtexCoord);

    if (C.a < 0.5) discard;
    else fragColor = vec4(0, 0, 1.0, 1.0);
}
