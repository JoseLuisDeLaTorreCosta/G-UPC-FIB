#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
in vec3 N[];
out vec4 gfrontColor;

const float speed = 1.2;
const float angSpeed = 8.0;

uniform mat4 modelViewProjectionMatrix;
uniform float time;

void main( void )
{
	vec3 n = (N[0] + N[1] + N[2])/3.0;
	float angle = angSpeed*time;
	vec3 c = (gl_in[0].gl_Position.xyz + gl_in[1].gl_Position.xyz + gl_in[2].gl_Position.xyz)/3.0;

	mat3 rotation = mat3(vec3(cos(angle), sin(angle), 0), vec3(-sin(angle), cos(angle), 0), vec3(0, 0, 1));
	
	for( int i = 0 ; i < 3 ; i++ )
	{
		gfrontColor = vfrontColor[i];
		gl_Position = modelViewProjectionMatrix * vec4((gl_in[i].gl_Position.xyz - c)*rotation + speed*time*n + c, 1.0);
		EmitVertex();
	}
    EndPrimitive();
}
