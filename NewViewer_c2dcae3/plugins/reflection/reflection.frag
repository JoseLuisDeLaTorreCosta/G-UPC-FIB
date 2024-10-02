#version 330 core
in vec4 frontColor;
out vec4 fragColor;

uniform sampler2D colorMap;

uniform float SIZE;

uniform bool mirror;

void main()
{
    if (mirror) {
        vec2 st = (gl_FragCoord.xy - vec2(0.5)) / SIZE;
        fragColor = vec4(0.5)*texture2D(colorMap, st);
    }
    else {
        fragColor = frontColor;
    }
}

