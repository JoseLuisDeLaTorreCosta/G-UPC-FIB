#version 330 core

in vec4 gfrontColor;
out vec4 fragColor;
in vec2 gtexcoord;

uniform int mode = 1;

void main()
{
    if (mode == 1) fragColor = gfrontColor;
    else if (mode >= 2) {
        if (gtexcoord.x >= 0.05 && gtexcoord.x <= 0.95 && gtexcoord.y >= 0.05 && gtexcoord.y <= 0.95) fragColor = gfrontColor;
        else fragColor = vec4(0.0);
    }
}
