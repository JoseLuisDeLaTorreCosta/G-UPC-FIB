#version 330 core

in vec4 frontColor;
out vec4 fragColor;

uniform sampler2D colormap;
in vec2 vtexCoord;
in vec3 N;


float dist_to_point (vec2 centre) {
    return length(vtexCoord - centre);
}

void main()
{
    vec3 Nor = normalize(N);
    vec2 offset = -0.1*Nor.xy;
    

    vec2 centre_eye1 = vec2(0.34, 0.65) + offset;
    vec2 centre_eye2 = vec2(0.66, 0.65) + offset;
    
    if (dist_to_point(centre_eye1) < 0.05 || dist_to_point(centre_eye2) < 0.05) fragColor = vec4(0.0);
    else fragColor = texture(colormap, vtexCoord);
}
