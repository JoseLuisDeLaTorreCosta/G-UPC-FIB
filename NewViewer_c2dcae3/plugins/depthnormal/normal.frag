#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 N;

void main()
{
    
    fragColor = vec4(normalize(N), 1.0)/2.0 + 0.5;
}
