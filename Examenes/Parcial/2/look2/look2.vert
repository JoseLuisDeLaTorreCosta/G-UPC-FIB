#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform float angle = 0.5;
const float PI = 3.141592;

void main()
{
    float ang;
    float t = (vertex.y - 1.45)/(1.55 - 1.45);

    if (vertex.y <= 1.45) ang = 0;
    else if (vertex.y >= 1.55) ang = angle;
    else ang = angle*t;
    
    mat4 rotation = mat4(vec4(cos(ang), 0, -sin(ang), 0), vec4(0, 1, 0, 0), vec4(sin(ang), 0, cos(ang), 0), vec4(0, 0, 0, 1));
    vec3 Normal = normalize(rotation*vec4(normal, 1.0)).xyz;
    vec3 N = normalize(normalMatrix * Normal);

    frontColor = vec4(1.0, 1.0, 1.0, 1.0) * N.z;
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * rotation * vec4(vertex, 1.0);
}
