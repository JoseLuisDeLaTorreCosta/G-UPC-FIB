#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform vec3 boundingBoxMax;
uniform vec3 boundingBoxMin;

void main()
{
    float pos = 4*(vertex.y - boundingBoxMin.y)/(boundingBoxMax.y - boundingBoxMin.y);

    vec3 C;

    if (pos == 0) C = vec3(1, 0, 0);
    else if (pos < 1) C = mix (vec3(1, 0, 0), vec3(1, 1, 0), fract(pos));
    else if (pos < 2) C = mix (vec3(1, 1, 0), vec3(0, 1, 0), fract(pos));
    else if (pos < 3) C = mix (vec3(0, 1, 0), vec3(0, 1, 1), fract(pos));
    else if (pos < 4) C = mix (vec3(0, 1, 1), vec3(0, 0, 1), fract(pos));
    else if (pos == 5) C = vec3(0, 0, 1);

    
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(C,1.0);
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
