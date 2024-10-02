#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

out vec3 P;
out vec3 N;
out vec3 V;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

const float PI = 3.141592;

void main()
{
    float angle = PI/2.0;
    mat3 rotation = mat3(vec3(1, 0, 0), vec3(0, cos(angle), sin(angle)), vec3(0, -sin(angle), cos(angle)));
    
    vec3 V = rotation*vertex;
    N = normalize(normalMatrix * rotation * normal);
    frontColor = vec4(color,1.0) * N.z;
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(rotation*vertex, 1.0);
    P = gl_Position.xyz;
    V = normalize(-P);
}
