#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 P;
in vec3 N;
in vec4 V;

uniform int mode = 3;

void main()
{
    float Z = normalize(N).z;

    vec3 Vi = normalize(V).xyz;
    
    if (mode == 3) {
        if (dot(Vi, N) > 0.95) fragColor = vec4(0.8, 1, 1, 1);
        else fragColor = vec4(0, 0, 0, 1);
        return;
    }
    else if (mode == 2) {
        if (dot(Vi, N) > 0.4) fragColor = vec4(0.8, 1, 1, 1);
        else fragColor = vec4(0, 0, 0, 1);
        return;
    }
    else if (mode == 1) {
        if (Z > 0.4) fragColor = vec4(1, 1, 0.9, 1);
        else fragColor = vec4(0, 0, 0, 1);
        return;
    }
    else fragColor = vec4(1)*Z;
}
