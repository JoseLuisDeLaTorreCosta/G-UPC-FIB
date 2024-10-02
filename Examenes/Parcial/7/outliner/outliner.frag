#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 P;
in vec3 N;
in vec3 V;

uniform int mode = 2;
uniform vec4 lightPosition;
uniform mat4 modelViewProjectionMatrix;

void main()
{  
    vec3 Nor = normalize(N);
    vec3 View = normalize( - P);
    float prod = -dot(View, Nor);
    
    if (mode == 3) {
        if (prod > 0.95) fragColor = vec4(0.8, 1.0, 1.0, 1.0);
        else fragColor = vec4(0.0);
        return;
    }
    
    if (mode == 2) {
        if (prod > 0.4) fragColor = vec4(0.8, 1.0, 1.0, 1.0);
        else fragColor = vec4(0.0);
        return;
    }
    
    if (mode == 1) {
        if (Nor.z > 0.4) fragColor = vec4(1.0, 1.0, 0.9, 1.0);
        else fragColor = vec4(0.0);
        return;
    }
    
    fragColor = vec4(1.0)*Nor.z;
}
