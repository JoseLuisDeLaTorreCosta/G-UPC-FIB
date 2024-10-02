#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;
uniform sampler2D colormap;

vec2 fantasma = vec2(0, 0);
vec2 pacman = vec2(1.f/6.f, 0);
vec2 negre = vec2(2.f/6.f, 0);
vec2 pared = vec2(3.f/6.f, 0);
vec2 pared2 = vec2(4.f/6.f, 0);
vec2 punt = vec2(5.f/6.f, 0);

vec2 element(float x) {
    return vec2(mod(vtexCoord.x, 1.f/6.01)+1.f/6.f*x, mod(vtexCoord.y, 0));
}

vec2 element_rotated(float x) {
    return vec2(mod(vtexCoord.y/6.f, 1.f/6.01)+1.f/6.f*x, mod(vtexCoord.x*6.f, 0));
}

vec2 element_rotated2(float x) {
    return vec2(mod(fract(vtexCoord).y/6.f, 1.f/6.01)+1.f/6.f*x, mod(fract(vtexCoord).x*6.f, 0));
}

vec2 coords(mat4 map) {
    int x, y;
    bool ex = false, ey = false;
    for (int i = 0; i < 4 && !ex; ++i) {
        if (vtexCoord.x >= i*1.f/6.f && vtexCoord.x < (i+1)*1.f/6.f) {
            x = i;
            ex = true;
        }
    }

    for (int j = 0; j < 4 && !ey; ++j) {
        if (vtexCoord.y >= j*1.f && vtexCoord.y < (j+1)*1.f) {
            y = j;
            ey = true;
        }
    }

    if (map[x][y] <= 5) return element(map[x][y]);
    else if (map[x][y] == 6) return element_rotated(3);
    else if (map[x][y] == 7) return vec2(element(4).x, -element(4).y);
    else if (map[x][y] == 8) return vec2(element_rotated(4).x, -element_rotated(4).y);
    else if (map[x][y] == 9) return element_rotated2(4);
}


void main()
{   
    mat4 map;

    map[0] = vec4(9, 6, 6, 8);
    map[1] = vec4(3, 2, 2, 3);
    map[2] = vec4(3, 2, 2, 3);
    map[3] = vec4(7, 6, 6, 4);
    vec2 newvtexCoord = coords(map);
    
    fragColor = texture(colormap, newvtexCoord);
}
