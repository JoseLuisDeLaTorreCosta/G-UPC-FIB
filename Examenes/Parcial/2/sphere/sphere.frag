#version 330 core

in vec4 frontColor;
out vec4 fragColor;


in vec2 vtexCoord;

uniform int mode = 2;

uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

uniform vec4 matAmbient, matDiffuse, matSpecular;
uniform float matShininess;
uniform vec4 lightAmbient, lightDiffuse, lightSpecular, lightPosition;

void main()
{
    float r = length(vtexCoord.xy);
    
    vec3 P = vec4(modelViewMatrix*vec4(vtexCoord.x, vtexCoord.y, sqrt(1 - pow(vtexCoord.x, 2) - pow(vtexCoord.y, 2)), 1.0)).xyz;
    vec3 N = normalize(normalMatrix*vec3(vtexCoord.x, vtexCoord.y, sqrt(1 - pow(vtexCoord.x, 2) - pow(vtexCoord.y, 2))));

    if (mode == 2) {
        vec3 L = normalize(lightPosition - vec4(P, 1.0)).xyz;
        vec3 V = normalize(-vec4(P, 1.0).xyz);
        vec3 R = normalize(2*dot(N, L)*N - L);

        vec4 llumAmbient = lightAmbient*matAmbient;
        vec4 llumDifusa = lightDiffuse*matDiffuse*max(0, dot(N, L));
        vec4 llumEspecular = lightSpecular*matSpecular*pow(max(0, dot(R, V)), matShininess);

        if (r <= 1) {
            if (dot(N, L) < 0) fragColor = llumAmbient + llumDifusa;
            else fragColor = llumAmbient + llumDifusa + llumEspecular;
        }
        else discard;
    }
    if (mode == 1) {
        if (r <= 1) fragColor = vec4(1.0, 1.0, 1.0, 1.0) * N.z;
        else discard;
    }
    if (mode == 0) {
        if (r <= 1) fragColor = vec4(0.0);
        else discard;
    }
}
