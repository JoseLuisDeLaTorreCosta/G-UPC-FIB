#version 330 core

in vec4 frontColor;
out vec4 fragColor;

uniform sampler2D map;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform vec4 lightPosition;
uniform mat4 modelViewMatrixInverse;
in vec3 V;
in vec3 N;

uniform bool worldSpace = true;

vec4 sampleSphereMap(sampler2D sampler, vec3 R)
{
    float z = sqrt((R.z+1.0)/2.0);
    vec2 st = vec2((R.x/(2.0*z)+1.0)/2.0, (R.y/(2.0*z)+1.0)/2.0);
    if (!worldSpace) st = -st;
    return texture(sampler, st);
}

void main()
{
    vec3 P;
    if (worldSpace) {
        P = normalize(V - (modelViewMatrixInverse*lightPosition).xyz);
    }
    else {
        P = normalize(V - lightPosition.xyz);
    }
    
    vec3 R = reflect(P, N);
    
    fragColor = sampleSphereMap(map, R);
}
