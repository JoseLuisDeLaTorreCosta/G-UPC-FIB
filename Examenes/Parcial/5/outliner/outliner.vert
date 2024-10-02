#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

out vec3 P;
out vec3 N;
out vec4 V;

uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;
uniform vec4 lightPosition;
const float PI = 3.141592;

void main()
{
    float angle = PI/2.f;
    mat4 rotation = mat4(vec4(1, 0, 0, 0), vec4(0, cos(angle), sin(angle), 0), vec4(0, -sin(angle), cos(angle), 0), vec4(0, 0, 0, 1));
    
    vec3 Normal = (rotation*vec4(normal, 1.0)).xyz;
    P = (modelViewProjectionMatrix * rotation*vec4(vertex, 1.0)).xyz;
    N = normalize(normalMatrix * Normal);
    V = -modelViewMatrix*rotation*vec4(vertex, 1.0);
    frontColor = vec4(color,1.0) * N.z;
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * rotation*vec4(vertex, 1.0);
}
