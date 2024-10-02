#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
in vec3 V;
uniform sampler2D sampler;

void main()
{
    vec3 dx = dFdx(V);
    vec3 dy = dFdy(V);
    
    vec3 N = normalize(cross(dx, dy));

    vec2 newvtexCoord = vec2(N.x, N.y);
    
    fragColor = texture(sampler, newvtexCoord)*N.z;
}
