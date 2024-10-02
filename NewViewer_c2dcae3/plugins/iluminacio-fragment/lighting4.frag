#version 330 core

in vec4 frontColor;
in vec3 N;
in vec3 L;
in vec3 V;
out vec4 fragColor;


uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;
uniform vec4 lightPosition;

uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;
uniform float matShininess;

void main()
{
    vec3 Nor = normalize(N);
    vec3 Lig = normalize(L);
    vec3 Ver = normalize(V);
    vec3 R = 2*dot(Nor, Lig)*Nor - Lig;

    vec4 llumAmbient = lightAmbient*matAmbient;
    vec4 llumDifusa = lightDiffuse*matDiffuse*max(0, dot(Nor, Lig));
    vec4 llumEspecular = lightSpecular*matSpecular*pow(max(0, dot(R, Ver)), matShininess);
    
    if (dot(N, L) < 0) fragColor = llumAmbient + llumDifusa;
    else fragColor = llumAmbient + llumDifusa + llumEspecular;
}
