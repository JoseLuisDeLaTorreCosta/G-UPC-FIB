#version 330 core

in vec4 frontColor;
out vec4 fragColor;

uniform float time;
uniform float freq = 2.0;
const float PI = 3.141592;

void main()
{
    fragColor = vec4 (0.5*(sin (2*PI*time*freq) + 1.0));
}
