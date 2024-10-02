#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec3 P;

uniform vec3 origin = vec3(0, 0, 0);
uniform vec3 axis = vec3(0, 0, 1);
uniform float slice = 0.05;


void main()
{
    vec3 com_axis = vec3(1.0) - axis;
    float d = mod(length(origin*com_axis - P*com_axis), 2*slice);
    
    if (d < slice) fragColor = vec4(0.0, 1.0, 1.0, 1.0);
    else fragColor = vec4(0.0, 0.0, 1.0, 1.0);
}
