#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform vec2 mousePosition;
uniform float mouseOverrideX = -1;
uniform vec2 viewport = vec2(800,600);

void main()
{
    vec2 Cursor = mousePosition;
    if (mouseOverrideX >= 0) Cursor.x = mouseOverrideX;

    float alfa = (Cursor.x - 400.f)/400.f;
    
    float t;
    if (vertex.y <= 1.45) t = 0;
    else if (vertex.y >= 1.55) t = 1;
    else t = (vertex.y - 1.45)/(1.55 - 1.45);

    alfa*=t;
    mat4 rotation = mat4(vec4(cos(alfa), 0, -sin(alfa), 0), vec4(0, 1, 0, 0), vec4(sin(alfa), 0, cos(alfa), 0), vec4(0, 0, 0, 1));
    
    
    vec3 Normal = normalize(normalMatrix * normal);
    vec3 N = (rotation * vec4(Normal, 1.0)).xyz;
    frontColor = vec4(1.0, 1.0, 1.0,1.0) * N.z;
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * rotation * vec4(vertex, 1.0);
}
