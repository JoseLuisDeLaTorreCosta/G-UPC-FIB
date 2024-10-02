#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform sampler2D fbm;
uniform float time;
const float pi = 3.14159;

vec4 vermell = vec4(1,0,0,1);
vec4 groc = vec4(1,1,0,1);
vec4 verd = vec4(0,1,0,1);
vec4 cian = vec4(0,1,1,1);
vec4 blau = vec4(0,0,1,1);
vec4 magenta = vec4(1,0,1,1);

void main()
{
    vec4 color = texture(fbm, vtexCoord);
    
    float amplitud = 1;
    float frequencia = 0.1;
    float fase = 2*pi*color.r;

    float v = amplitud*sin(fase*time + frequencia);
    v = 3*(v+1);
    if (v<0) fragColor = vermell;
    else if (v<1) fragColor = mix(vermell,groc,fract(v));
    else if (v<2) fragColor = mix(groc,verd,fract(v));
    else if (v<3) fragColor = mix(verd,cian,fract(v));
    else if (v<4) fragColor = mix(cian,blau,fract(v));
    else if (v<5) fragColor = mix(blau,magenta,fract(v));
    else if (v<6) fragColor = mix(magenta,vermell,fract(v));
    else fragColor = vermell;
}
