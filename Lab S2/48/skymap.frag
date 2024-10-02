#version 330 core

in vec4 frontColor;
out vec4 fragColor;

uniform sampler2D spheremap;
in vec3 P;
uniform mat4 modelViewMatrixInverse;
uniform vec4 lightPosition;

vec4 sampleSphereMap(sampler2D sampler, vec3 V)
{
    float z = sqrt((V.z+1.0)/2.0);
    vec2 st = vec2((V.x/(2.0*z)+1.0)/2.0, (-V.y/(2.0*z)+1.0)/2.0);
    return texture(sampler, st);
}

void main()
{
    vec3 O = (modelViewMatrixInverse*lightPosition).xyz;
    vec3 V = normalize(O - P);
    fragColor = sampleSphereMap(spheremap, V);
}
