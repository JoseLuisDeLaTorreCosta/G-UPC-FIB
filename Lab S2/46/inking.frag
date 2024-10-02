#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform int textureSize = 1024;
uniform int edgeSize = 2;
uniform float threshold = 0.2;
uniform sampler2D map;

void main()
{
    vec2 left = vtexCoord + edgeSize*vec2(-1, 0)/textureSize;
    vec2 right = vtexCoord + edgeSize*vec2(1, 0)/textureSize;
    vec2 bottom = vtexCoord + edgeSize*vec2(0, -1)/textureSize;
    vec2 top = vtexCoord + edgeSize*vec2(0, 1)/textureSize;

    float GX = abs(length(texture(map, right) - texture(map, left)));
    float GY = abs(length(texture(map, top) - texture(map, bottom)));

    vec2 llindar = vec2(GX, GY);

    if (length(llindar) > threshold) fragColor = vec4(0.0);
    else fragColor = texture(map, vtexCoord);
}
