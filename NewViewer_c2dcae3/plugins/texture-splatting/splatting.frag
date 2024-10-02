#version 330 core


out vec4 fragColor;
in vec2 vtexCoord;
uniform sampler2D noise0;
uniform sampler2D rock1;
uniform sampler2D grass2;

void main()
{
    float noise = texture(noise0, vtexCoord).r;
    vec4 colorRock = texture(rock1, vtexCoord);
    vec4 colorGrass = texture(grass2, vtexCoord);
    
    fragColor = mix(colorRock, colorGrass, noise);
}
