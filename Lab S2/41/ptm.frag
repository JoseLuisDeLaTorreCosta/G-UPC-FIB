#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

in vec3 N;
uniform sampler2D sampler;

void main()
{
    vec3 Nor = normalize(N);
    fragColor = texture(sampler, vtexCoord)*Nor.z;
}
