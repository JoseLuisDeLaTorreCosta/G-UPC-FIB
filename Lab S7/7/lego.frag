#version 330 core

in vec4 gfrontColor;
out vec4 fragColor;
in vec3 N;
uniform sampler2D lego;
in vec2 gtexcoord;


vec4 R = vec4(1, 0, 0, 0);
vec4 G = vec4(0, 1, 0, 0);
vec4 B = vec4(0, 0, 1, 0);
vec4 C = vec4(0, 1, 1, 0);
vec4 Y = vec4(1, 1, 0, 0);


float min5(float a, float b, float c, float d, float e) {
    return min(min(a, b), min(min(c, d), e));
}

void main()
{
    float distR = distance(R, gfrontColor);
    float distG = distance(G, gfrontColor);
    float distB = distance(B, gfrontColor);
    float distC = distance(C, gfrontColor);
    float distY = distance(Y, gfrontColor);
    vec4 color;

    float min = min5(distR, distG, distB, distC, distY);
    if (min == distR) color = R;
    else if (min == distG) color = G;
    else if (min == distB) color = B;
    else if (min == distC) color = C;
    else color = Y;

    fragColor = color;
    if (normalize(N) == vec3(0, 1, 0)) fragColor *= texture(lego, gtexcoord).g;
    else fragColor *= texture(lego, vec2(0.5, 0.5)).g;
}
