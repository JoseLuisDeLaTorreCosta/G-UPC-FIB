#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform float time;

void main()
{
    float angle = (vertex.y - 0.5)*sin(time);
    mat3 rotation = mat3(vec3(1, 0, 0), vec3(0, cos(angle), sin(angle)), vec3(0, -sin(angle), cos(angle)));

    vec3 V = vertex + vec3(0, -1, 0);

    if (vertex.y > 0.5) V = rotation*V;

    V+=vec3(0, 1, 0);

    frontColor = vec4(color,1.0);
    gl_Position = modelViewProjectionMatrix * vec4(V, 1.0);
}
