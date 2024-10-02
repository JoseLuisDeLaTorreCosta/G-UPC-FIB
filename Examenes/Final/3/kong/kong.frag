#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
uniform sampler2D colormap;

vec2 newvtexCoord = vtexCoord*13;


//0. Barril
//1. Kong 
//2. Suelo 
//3. Escalera
//4. Princesa
//5. Mario
//6. Negro
void paint(int num) {
    fragColor = texture(colormap, vec2(fract(newvtexCoord.x)/7.f + num/7.f, fract(newvtexCoord.y)));
}


void main()
{
    float x = newvtexCoord.x;
    float y = newvtexCoord.y;
    
    if (x >= 1 && x < 12 && (y < 1 || (y >= 4 && y < 5) || (y >= 8 && y < 9))) {
        paint(2);
    }
    else if (y >= 10 && y < 11 && x >= 5 && x < 8) {
        paint(2);
    }
    else if (x >= 6 && x < 7 && y >= 11 && y < 12) {
        paint(4);
    }
    else if (x >= 1 && y >= 1 && x < 2 && y < 2) {
        paint(5);
    }
    else if (x >= 3 && x < 4 && y >= 9 && y < 10) {
        paint(1);
    }
    else if (((x >= 3 && x < 4) || (x >= 9 && x < 10)) && (y >= 1 && y < 4)) {
        paint(3);
    }
    else if (x >= 6 && x < 7 && y >= 5 && y < 8) {
        paint(3);
    }
    else if (y >= 9 && y < 12 && ((x >= 4 && x < 5) || (x >= 8 && x <= 9))) {
        paint(3);
    }
    else if (x >= 1 && x < 3 && y >= 9 && y < 11) {
        paint(0);
    }
    else {
        paint(6);
    }
}
