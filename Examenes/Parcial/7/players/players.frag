#version 330 core

in vec4 frontColor;
out vec4 fragColor;

uniform sampler2D courtMap;
uniform sampler2D player1;
in vec2 vtexCoord;
in vec2 P;
uniform int mode = 3;

uniform vec2 p1 = vec2(-3, -8); // 3m cap a l’esquerra (-X), 8m cap a baix (-Y)
uniform vec2 p2 = vec2( 3, -8);
uniform vec2 p3 = vec2(-2, 2);
uniform vec2 p4 = vec2( 2, 2);

void main()
{
    if (mode == 3) {
        bool d1 = P.x >= p1.x-1 && P.x <= p1.x+1 && P.y >= p1.y-1 && P.y <= p1.y+1;
        bool d2 = P.x >= p2.x-1 && P.x <= p2.x+1 && P.y >= p2.y-1 && P.y <= p2.y+1;
        bool d3 = P.x >= p3.x-1 && P.x <= p3.x+1 && P.y >= p3.y-1 && P.y <= p3.y+1;
        bool d4 = P.x >= p4.x-1 && P.x <= p4.x+1 && P.y >= p4.y-1 && P.y <= p4.y+1;

        if (d1 || d2 || d3 || d4) {
            vec2 newvtexcoord = vtexCoord*vec2(-5, 10) + vec2(0, 0.5);
            if (d1 || d2) {
                newvtexcoord.x += 0.5;
            }
            else {
                newvtexcoord.y*=-1;
            }
            vec4 C = texture(player1, newvtexcoord);
            if (C.r > 0.5 || C.b < 0.5) {
                fragColor = C;
                return;
            }
        }
    }
    
    if (mode == 2) {
        float d1 = abs(length(p1 - P));
        float d2 = abs(length(p2 - P));
        float d3 = abs(length(p3 - P));
        float d4 = abs(length(p4 - P));
        if (d1 <= 0.4 || d2 <= 0.4 || d3 <= 0.4 || d4 <= 0.4) {
            fragColor = vec4(1.0);
            return;
        }
        else if (d1 <= 0.5 || d2 <= 0.5 || d3 <= 0.5 || d4 <= 0.5) {
            fragColor = vec4(0.0);
            return;
        }
    }
    
    if (mode >= 1) {
        float x = mod(P.x, 1.0);
        float y = mod(P.y, 1.0);
        if (x < 0.05 || y < 0.05) {
            fragColor = texture(courtMap, vtexCoord)*1.2;
            return;
        }
    }
    
    fragColor = texture(courtMap, vtexCoord);
}
