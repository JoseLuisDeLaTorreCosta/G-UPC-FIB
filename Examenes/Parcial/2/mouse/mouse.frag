#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

uniform int mode = 2;

void main()
{
    float sphere_center = length(vtexCoord.xy - vec2(0.5, 0.4));
    float sphere_left = length(vtexCoord.xy - vec2(0.2, 0.8));
    float sphere_right = length(vtexCoord.xy - vec2(0.8, 0.8));

    
    vec2 center_mouthSkin = vec2(0.5, 0.3);
    vec2 center_eyeSkin1 = vec2(0.45, 0.5);
    vec2 center_eyeSkin2 = vec2(0.55, 0.5);

    vec2 coords2mouthSkin = (vtexCoord - center_mouthSkin)*vec2(1, 2);
    vec2 coords2eyeSkin1 = (vtexCoord - center_eyeSkin1)*vec2(2, 1);
    vec2 coords2eyeSkin2 = (vtexCoord - center_eyeSkin2)*vec2(2, 1);


    vec2 center_eye1 = vec2(0.45, 0.52);
    vec2 center_eye2 = vec2(0.55, 0.52);
    vec2 center_pupil1 = vec2(0.45, 0.47);
    vec2 center_pupil2 = vec2(0.55, 0.47);
    vec2 cords2eye1 = (vtexCoord - center_eye1)*vec2(2, 1);
    vec2 cords2eye2 = (vtexCoord - center_eye2)*vec2(2, 1);
    vec2 cords2pupil1 = (vtexCoord - center_pupil1)*vec2(2, 1);
    vec2 cords2pupil2 = (vtexCoord - center_pupil2)*vec2(2, 1);

    if (mode == 2 && (length(cords2pupil1) < 0.06 || length(cords2pupil2) < 0.06)) fragColor = vec4(0.0, 0.0, 0.0, 1.0); 
    else if (mode == 2 && (length(cords2eye1) < 0.12 || length(cords2eye2) < 0.12)) fragColor = vec4(1.0);
    else if (mode >= 1 && (length(coords2mouthSkin) < 0.3 || length(coords2eyeSkin1) < 0.2 || length(coords2eyeSkin2) < 0.2)) fragColor = vec4(1.0, 0.8, 0.6, 1.0);
    else if (sphere_center < 0.35 || sphere_left < 0.2 || sphere_right < 0.2) fragColor = vec4(0.0, 0.0, 0.0, 1.0); 
    else fragColor = vec4(0.8);
}
