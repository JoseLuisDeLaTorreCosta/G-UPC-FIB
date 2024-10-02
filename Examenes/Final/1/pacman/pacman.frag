#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
uniform sampler2D colormap;

vec2 newvtexcoord = vtexCoord*13;

//0. Ghost
//1. Pac-man
//2. Black space
//3. Horizontal wall 
//4. Top right wall
//5. Dot
//6. Top left wall
//7. Bottom right wall
//8. Bottom left wall
//9. Vertical wall

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


void paint(int num, int xorigin, int yorigin, int xsize, int ysize) {
    if ((newvtexcoord.x >= xorigin) && (newvtexcoord.x < (xorigin + xsize)) && (newvtexcoord.y >= yorigin) && (newvtexcoord.y < (yorigin + ysize))) {
        if (num < 6) painting_normal(newvtexcoord, num, 6);
        else if (num == 6) painting_reflexed_x(newvtexcoord, 1, 6);
        else if (num == 7) painting_reflexed_y(newvtexcoord, 4, 6);
        else if (num == 8) painting_reflexed_x_y(newvtexcoord, 1, 6);
        else if (num == 9) painting_rotated(newvtexcoord, 3, 6);
    }
}

void main()
{
    //Default
    paint(2, 0, 0, 13, 13);
    //Paint Walls
    paint(3, 1, 0, 11, 1);
    paint(3, 1, 12, 11, 1);
    paint(4, 12, 12, 1, 1);
    paint(6, 0, 12, 1, 1);
    paint(7, 12, 0, 1, 1);
    paint(8, 0, 0, 1, 1);
    paint(9, 0, 1, 1, 11);
    paint(9, 12, 1, 1, 11);
    //Painting Pac-man
    paint(1, 1, 11, 1, 1);
    //Painting Ghosts
    paint(0, 1, 10, 1, 1);
    paint(0, 2, 11, 1, 1);
    paint(0, 1, 9, 1, 1);
    paint(0, 2, 10, 1, 1);
    paint(0, 3, 11, 1, 1);
    //Painting dots
    paint(5, 7, 4, 1, 2);
    paint(5, 9, 4, 1, 2);
    paint(5, 7, 1, 3, 1);
    paint(5, 6, 2, 1, 1);
    paint(5, 5, 3, 1, 1);
    paint(5, 10, 2, 1, 1);
    paint(5, 11, 3, 1, 1);
}
