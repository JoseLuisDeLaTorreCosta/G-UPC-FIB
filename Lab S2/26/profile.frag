#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 N;
in vec3 V; 

uniform float epsilon = 0.1;
uniform float light = 0.5;

void main()
{
    vec3 Cam = normalize(V);
    vec3 Nor = normalize(N);

    float prod = abs(dot(Cam, Nor));
    if (prod < epsilon) fragColor = vec4(0.7, 0.6, 0.0, 1.0);
    else {
        fragColor = frontColor*light*N.z;
    }
}
