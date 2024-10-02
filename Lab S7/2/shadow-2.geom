#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;
uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewProjectionMatrixInverse;

void main( void )
{
	
	for( int i = 0 ; i < 3 ; i++ )
	{
		gfrontColor = vfrontColor[i];
		gl_Position = gl_in[i].gl_Position;
		EmitVertex();
	}
	EndPrimitive();
	for( int i = 0 ; i < 3 ; i++ )
	{
		gfrontColor = vec4(0.0);
		vec4 V = modelViewProjectionMatrixInverse*gl_in[i].gl_Position;
		V.y = boundingBoxMin.y;
		gl_Position = modelViewProjectionMatrix*V;
		EmitVertex();
	}
    EndPrimitive();

	if (gl_PrimitiveIDIn == 0) {
		float R = length(boundingBoxMax - boundingBoxMin);
		vec3 C = (boundingBoxMax+boundingBoxMin)/2;
		float y = boundingBoxMin.y - 0.01;

		gfrontColor = vec4(0.0, 1.0, 1.0, 1.0);
		gl_Position = modelViewProjectionMatrix*vec4(C.x + R, y, C.z + R,1);
		EmitVertex();

		gfrontColor = vec4(0.0, 1.0, 1.0, 1.0);
		gl_Position = modelViewProjectionMatrix*vec4(C.x + R, y, C.z - R,1);
		EmitVertex();

		gfrontColor = vec4(0.0, 1.0, 1.0, 1.0);
		gl_Position = modelViewProjectionMatrix*vec4(C.x - R, y, C.z + R,1);
		EmitVertex();

		gfrontColor = vec4(0.0, 1.0, 1.0, 1.0);
		gl_Position = modelViewProjectionMatrix*vec4(C.x - R, y, C.z - R,1);
		EmitVertex();

		EndPrimitive();
	}
}
