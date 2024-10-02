#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;
out vec3 N;
out vec3 V;
out vec3 L;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform vec4 lightPosition;
uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;
uniform mat4 modelMatrixInverse;
uniform mat4 modelViewMatrixInverse;
uniform bool world;

void main()
{
    vec4 ver = normalize(modelViewMatrix * vec4(vertex, 1.0));
    vec4 ver_w = normalize(modelMatrix * vec4(vertex, 1.0));
    
    if (!world) {
        N = normalize(normalMatrix * normal);
        V = - ver.xyz;
        L = (lightPosition - ver).xyz;
    }
    else {
        N = normal;
        V = (modelViewMatrixInverse*vec4(0,0,0,1)).xyz-vertex;
        L = (modelViewMatrixInverse*lightPosition).xyz - vertex;
    }
    

    frontColor = vec4(color,1.0) * N.z;
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
