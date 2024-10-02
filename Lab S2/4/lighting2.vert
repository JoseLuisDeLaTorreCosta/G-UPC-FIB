#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;
uniform vec4 lightPosition;

uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;
uniform float matShininess;

uniform mat4 modelViewMatrix;

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    vec3 L = normalize(vec4(lightPosition - modelViewMatrix*vec4(vertex, 1.0)).xyz);
    vec3 V = normalize(vec4(-modelViewMatrix*vec4(vertex, 1.0)).xyz);
    vec3 R = normalize(2*dot(N, L)*N - L);

    vec4 llumAmbient = lightAmbient*matAmbient;
    vec4 llumDifusa = lightDiffuse*matDiffuse*max(0, dot(N, L));
    vec4 llumEspecular = lightSpecular*matSpecular*pow(max(0, dot(R, V)), matShininess);

    if (dot(N, L) < 0) frontColor = llumAmbient + llumDifusa;
    else frontColor = llumAmbient + llumDifusa + llumEspecular;
    vtexCoord = vec2(mod(texCoord.x, 1.0), mod(texCoord.y, 1.0));
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
