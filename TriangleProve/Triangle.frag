#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

uniform vec2 vertex1 = vec2(0.3, 0.5); //Vertex base1
uniform vec2 vertex2 = vec2(0.7, 0.2); //Vertex base2
uniform vec2 vertex3 = vec2(0.6, 0.7); //Vertex alt

bool triangle() {
    vec2 v1Tv2 = vertex2 - vertex1;
    vec2 v3Tv2 = vertex3 - vertex1;

    float w1 = (v3Tv2.x * (vertex1.y - vtexCoord.y) + v3Tv2.y * (vtexCoord.x - vertex1.x)) / (v1Tv2.x * v3Tv2.y - v1Tv2.y * v3Tv2.x);
    float w2 = (vtexCoord.y - vertex1.y - w1 * v1Tv2.y)/ v3Tv2.y;

    if ((w1 >= 0.0) && (w2 >= 0.0) && ((w1 + w2) <= 1.0)) return true;
    else return false;
}


void main()
{
    if (triangle()) fragColor = vec4(0.0);
    else discard;
}
