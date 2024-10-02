#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;


in vec3 N[];
uniform mat4 modelViewProjectionMatrix;
const float speed = 0.5; 
uniform float time;


void main( void )
{	
	vec3 trans = speed*time*(N[0] + N[1] + N[2])/3.f;
	
	for( int i = 0 ; i < 3 ; i++ )
	{
		gfrontColor = vfrontColor[i];
		gl_Position = modelViewProjectionMatrix*(gl_in[i].gl_Position + vec4(trans, 0));
		EmitVertex();
	}
    EndPrimitive();
}
