#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;
uniform mat4 modelViewProjectionMatrix;

uniform vec3 boundingBoxMin, boundingBoxMax;
uniform float time;

void emitData(vec4 color, vec3 pos) {
	gfrontColor = color;
	gl_Position = modelViewProjectionMatrix * vec4(pos, 1.0);
	EmitVertex();
}

void createBox(float minim) {
	vec3 xyz = vec3(minim - 0.05, boundingBoxMin.y, boundingBoxMin.z);
	vec3 xyZ = vec3(minim - 0.05, boundingBoxMin.y, boundingBoxMax.z);
	vec3 xYz = vec3(minim - 0.05, boundingBoxMax.y, boundingBoxMin.z);
	vec3 xYZ = vec3(minim - 0.05, boundingBoxMax.y, boundingBoxMax.z);
	vec3 Xyz = vec3(minim + 0.05, boundingBoxMin.y, boundingBoxMin.z);
	vec3 XyZ = vec3(minim + 0.05, boundingBoxMin.y, boundingBoxMax.z);
	vec3 XYz = vec3(minim + 0.05, boundingBoxMax.y, boundingBoxMin.z);
	vec3 XYZ = vec3(minim + 0.05, boundingBoxMax.y, boundingBoxMax.z);

	vec4 color = vec4(0, 0, 1, 1);
	emitData(color, xyZ);
	emitData(color, XyZ);
	emitData(color, xYZ);
	emitData(color, XYZ);
	EndPrimitive();

	color = vec4(1, 0, 0, 1);
	emitData(color, XyZ);
	emitData(color, Xyz);
	emitData(color, XYZ);
	emitData(color, XYz);
	EndPrimitive();

	color = vec4(0, 0, 1, 1);
	emitData(color, Xyz);
	emitData(color, xyz);
	emitData(color, XYz);
	emitData(color, xYz);
	EndPrimitive();

	color = vec4(1, 0, 0, 1);
	emitData(color, xyZ);
	emitData(color, xyz);
	emitData(color, xYZ);
	emitData(color, xYz);
	EndPrimitive();

	color = vec4(0, 1, 0, 1);
	emitData(color, xyZ);
	emitData(color, XyZ);
	emitData(color, xyz);
	emitData(color, Xyz);
	EndPrimitive();

	emitData(color, xYZ);
	emitData(color, XYZ);
	emitData(color, xYz);
	emitData(color, XYz);
	EndPrimitive();
}

void main( void )
{
	for( int i = 0 ; i < 3 ; i++ )
	{
		gfrontColor = vfrontColor[i];
		gl_Position = gl_in[i].gl_Position;
		EmitVertex();
	}
    EndPrimitive();

	vec4 bbMax = modelViewProjectionMatrix*vec4(boundingBoxMax, 1.0);
	vec4 bbMin = modelViewProjectionMatrix*vec4(boundingBoxMin, 1.0);

	//float minim = boundingBoxMin.x;
	float minim = mix(boundingBoxMin.x, boundingBoxMax.x, fract(time));

	createBox(minim);
}
