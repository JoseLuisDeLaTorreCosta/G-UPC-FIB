#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform sampler2D explosion;

uniform float time;

void main()
{
    vec2 scale = vec2(1.f/8.f, 1.f/6.f);
    float frame = 1.f/30.f;
    float ancho_fgrm = 1.f/8.f;
    float altura_fgrm = 1.f/6.f;
    vec2 offset = vec2((int(0.5f/frame) % 8)*ancho_fgrm, - altura_fgrm - (int(0.5f/(8.0f*frame)) % 6)*altura_fgrm);
    
    vec2 newvtexCoord = vtexCoord*scale + offset;

    vec4 color = texture(explosion, newvtexCoord);

    fragColor = color.a * color;
}
