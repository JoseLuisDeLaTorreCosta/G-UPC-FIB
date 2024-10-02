#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
uniform sampler2D colorMap;

in vec3 P;
in vec3 N;

uniform vec4 lightSpecular;
uniform vec4 lightPosition;
uniform vec4 matSpecular;
uniform float matShininess;
uniform float time;

void main()
{
    vec3 L = normalize(lightPosition - vec4(P, 1.0)).xyz;

    vec3 lightDiff;
    if (mod(time, 2.0) == 0) lightDiff = vec3(0);
    else if (mod(time, 2.0) == 1) lightDiff = vec3(0.8);
    else if (mod(time, 2.0) < 1) lightDiff = mix(vec3(0), vec3(0.8), mod(time, 2.0));
    else lightDiff = mix(vec3(0.8), vec3(0), 1.0 - mod(time, 2.0));
    
    fragColor = frontColor;
}
