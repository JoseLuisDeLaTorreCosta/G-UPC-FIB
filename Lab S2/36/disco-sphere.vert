#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;
out vec3 V;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform float time;

void main()
{
    float angle = 0.1*time;
    mat3 rotation = mat3(vec3(cos(angle), 0, -sin(angle)), vec3(0, 1, 0), vec3(sin(angle), 0, cos(angle)));
    vec3 vert = rotation*vertex;
    
    
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(color,1.0) * N.z;
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vert, 1.0);
    V = gl_Position.xyz;
}
