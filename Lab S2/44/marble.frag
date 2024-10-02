#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 V;
in vec3 N;

uniform sampler2D noise;
uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;


vec4 shading(vec3 N, vec3 Pos, vec4 diffuse) {
    vec3 lightPos = vec3(0.0,0.0,2.0);
    vec3 L = normalize( lightPos - Pos );
    vec3 V = normalize( -Pos);
    vec3 R = reflect(-L,N);
    float NdotL = max( 0.0, dot( N,L ) );
    float RdotV = max( 0.0, dot( R,V ) );
    float Ispec = pow( RdotV, 20.0 );
    return diffuse * NdotL + Ispec;
}

void main()
{
    vec4 Vcoord = vec4(V, 1.0);
    vec4 S = 0.3*vec4(0, 1, -1, 0);
    vec4 T = 0.3*vec4(-2, -1, 1, 0);
    float s = dot(Vcoord, S);
    float t = dot(Vcoord, T);

    vec2 vtexCoord = vec2(s, t);

    vec4 c = texture(noise, vtexCoord);
    float v = 2*c.x;

    vec4 dif = vec4(1.0);
    if (v < 1) dif = mix(vec4(1.0), vec4(0.5, 0.2, 0.2, 1.0), fract(v));
    else if (v < 2) dif = mix(vec4(0.5, 0.2, 0.2, 1.0), vec4(1.0), fract(v));

    vec3 Nor = normalMatrix * N;
    vec3 Pos = -(modelViewProjectionMatrix * Vcoord).xyz;
    
    fragColor = shading(Nor, Pos, dif);
}
