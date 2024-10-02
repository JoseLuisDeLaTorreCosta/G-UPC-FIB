#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

uniform sampler2D positionMap;
uniform sampler2D normalMap1;

uniform vec4 lightAmbient;
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;
uniform vec4 lightPosition;

uniform vec4 matAmbient;
uniform vec4 matDiffuse;
uniform vec4 matSpecular;
uniform float matShininess;

uniform int mode = 3;


void main()
{
    float scaleVtexCoord = (0.996 - 0.004)/2.0f;
    float translateVtexCoord = 0.5;
    vtexCoord = vertex.xy*scaleVtexCoord + translateVtexCoord;
    vec3 P = texture(positionMap, vtexCoord).xyz;
    
    vec3 Normal = (texture(normalMap1, vtexCoord).xyz)*2 - 1;
    vec3 N = normalize(normalMatrix * Normal);

    gl_Position = modelViewProjectionMatrix * vec4(P, 1.0);

    if (mode == 0) frontColor = vec4(P,1.0);
    else if (mode == 1) {
        frontColor = vec4(P,1.0)*N.z;
    }
    else if (mode >= 2) {
        vec4 mD;
        if (mode == 2) mD = matDiffuse;
        else mD = vec4(P, 1.0);

        vec4 ver = modelViewMatrix * vec4(vertex, 1.0);

        vec3 L = normalize(lightPosition.xyz - ver.xyz);
        vec3 V = normalize(-ver.xyz);
        vec3 R = normalize(2*dot(N, L)*N - L);

        vec4 llumAmbient = lightAmbient*matAmbient;
        vec4 llumDifusa = lightDiffuse*mD*max(0, dot(N, L));
        vec4 llumEspecular = lightSpecular*matSpecular*pow(max(0, dot(R, V)), matShininess);

        if (dot(N, L) < 0) frontColor = llumAmbient + llumDifusa;
        else frontColor = llumAmbient + llumDifusa + llumEspecular;
    }

}
