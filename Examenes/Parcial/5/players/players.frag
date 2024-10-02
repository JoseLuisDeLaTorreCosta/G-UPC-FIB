#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

in vec2 P;

uniform int mode = 2;
uniform sampler2D courtMap;
uniform sampler2D player1;

uniform vec2 p1 = vec2(-3, -8); // 3m cap a l’esquerra (-X), 8m cap a baix (-Y)
uniform vec2 p2 = vec2( 3, -8);
uniform vec2 p3 = vec2(-2, 2);
uniform vec2 p4 = vec2( 2, 2);

vec2 ps[4] = vec2[](p1, p2, p3, p4);


void main()
{

    if (mode == 2) {
        for (int i = 0; i < 4; ++i) {
            float dist_centre = length(ps[i] - P);
            if (dist_centre <= 0.4) {
                fragColor = vec4(1.0);
                return;
            }
            else if (dist_centre > 0.4 && dist_centre <= 0.5) {
                fragColor = vec4(0);
                return;
            }
        }
    }
    else if (mode == 3) {
        vec2 newvtexCoord = vec2(vtexCoord.x*5.f, vtexCoord.y*10.f+0.5);
        for (int i = 0; i < 4; ++i) {
            if ((ps[i].x - 1.f) <= P.x && (ps[i].x + 1.f) > P.x && (ps[i].y - 1.f) <= P.y && (ps[i].y + 1.f) > P.y) {
                if (i < 2) {  
                    newvtexCoord.x+=0.5;
                    newvtexCoord.x*=-1;
                }
                else {
                    newvtexCoord*=-1;
                }
                vec4 C = texture(player1, newvtexCoord);
                if (C.r > 0.5 || C.b < 0.5) {
                    fragColor = C;
                    return;
                }
            }
        }
    }
    
    if (mode >= 1) {
        for (float i = -10; i < 10; ++i) {
            if ((P.x >= i && P.x < (i + 0.05)) || (P.y >= i && P.y < (i + 0.05)) ) {
                fragColor = texture(courtMap, vtexCoord)*1.2;
                return;
            }
        }
    }
    fragColor = texture(courtMap, vtexCoord);
}
