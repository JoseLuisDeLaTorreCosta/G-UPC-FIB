#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;
uniform sampler2D colormap;


void painting_normal(vec2 vtexcoord, int num, float sprites) {
    fragColor = texture(colormap, vec2(mod(fract(vtexcoord.x)/sprites, 1/sprites) + num/sprites, fract(vtexcoord.y)));
}

void painting_reflexed_x(vec2 vtexcoord, int num, float sprites) {
    fragColor = texture(colormap, vec2(-(mod(fract(vtexcoord.x)/sprites, 1/sprites) + num/sprites), fract(vtexcoord.y)));
}

void painting_reflexed_y(vec2 vtexcoord, int num, float sprites) {
    fragColor = texture(colormap, vec2(mod(fract(vtexcoord.x)/sprites, 1/sprites) + num/sprites, -fract(vtexcoord.y)));
}

void painting_reflexed_x_y(vec2 vtexcoord, int num, float sprites) {
    fragColor = texture(colormap, vec2(-(mod(fract(vtexcoord.x)/sprites, 1/sprites) + num/sprites), -fract(vtexcoord.y)));
}

void painting_rotated(vec2 vtexcoord, int num, float sprites) {
    fragColor = texture(colormap, vec2(mod(fract(vtexcoord.y)/sprites, 1/sprites) + num/sprites, fract(vtexcoord.x)));
}

void paint(int sprite, int xorigin, int yorigin, int xsize, int ysize, vec2 vtexcoord) {
    if (vtexcoord.x >= xorigin && vtexcoord.x < (xorigin + xsize) && vtexcoord.y >= yorigin && vtexcoord.y < (yorigin + ysize)) {
        if (sprite < 6) painting_normal(vtexcoord, sprite, 6.0);
        else if (sprite == 6) painting_rotated(vtexcoord, 3, 6.0);
        else if (sprite == 7) painting_reflexed_x(vtexcoord, 1, 6.0);
        else if (sprite == 8) painting_reflexed_y(vtexcoord, 4, 6.0);
        else if (sprite == 9) painting_reflexed_x_y(vtexcoord, 1, 6.0);
    }
}

void main()
{   
    vec2 newvtexcoord = 6*vtexCoord;

    paint(2, 0, 0, 5, 5, newvtexcoord);
    //Pac-man
    paint(1, 4, 4, 1, 1, newvtexcoord);

    //Ghosts
    paint(0, 1, 4, 1, 1, newvtexcoord);
    paint(0, 4, 1, 1, 1, newvtexcoord);

    //Dots 
    paint(5, 4, 2, 1, 2, newvtexcoord);
    paint(5, 2, 4, 2, 1, newvtexcoord);

    //Not rounded walls 
    paint(3, 1, 5, 4, 1, newvtexcoord);
    paint(3, 1, 0, 4, 1, newvtexcoord);
    paint(6, 0, 1, 1, 4, newvtexcoord);
    paint(6, 5, 1, 1, 4, newvtexcoord);
    paint(3, 2, 3, 2, 1, newvtexcoord);

    //Rounded walls 
    paint(4, 5, 5, 1, 1, newvtexcoord);
    paint(7, 0, 5, 1, 1, newvtexcoord);
    paint(8, 5, 0, 1, 1, newvtexcoord);
    paint(9, 0, 0, 1, 1, newvtexcoord);
}
