#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;
out vec3 N;


uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

void main()
{
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
    vec3 PN = gl_Position.xyz/gl_Position.w;
    N = normalize(normalMatrix * normal);
    frontColor = vec4(color,1.0) * N.z;
    vtexCoord = 0.5*vec2(PN.x, PN.y) + vec2(0.5, 0.5);
}
