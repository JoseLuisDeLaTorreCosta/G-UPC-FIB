#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;

out vec4 frontColor;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform float lambda = 0;

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    frontColor = mix(vec4(1.0, 0, 0, 0), vec4(0, 1.0, 0, 0), lambda) * N.z;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
