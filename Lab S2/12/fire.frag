#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;
uniform float slice=0.1;
uniform sampler2D sampler0;
uniform sampler2D sampler1;
uniform sampler2D sampler2;
uniform sampler2D sampler3;

uniform float time;

void main()
{
    float t = mod(time, 4*slice);

    if (t < slice) fragColor = texture(sampler0, vtexCoord);
    else if (t < 2*slice) fragColor = texture(sampler1, vtexCoord);
    else if (t < 3*slice) fragColor = texture(sampler2, vtexCoord);
    else fragColor = texture(sampler3, vtexCoord);
}
