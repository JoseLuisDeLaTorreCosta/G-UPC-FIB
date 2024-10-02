#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;
uniform mat4 modelViewProjectionMatrix;

void emitData(vec4 color, vec3 pos) {
	gfrontColor = color;
	gl_Position = modelViewProjectionMatrix * vec4(pos, 1.0);
	EmitVertex();
}


void pintBox() {
	vec3 xyz = vec3(boundingBoxMin.x, boundingBoxMin.y, boundingBoxMin.z);
	vec3 xyZ = vec3(boundingBoxMin.x, boundingBoxMin.y, boundingBoxMax.z);
	vec3 xYz = vec3(boundingBoxMin.x, boundingBoxMax.y, boundingBoxMin.z);
	vec3 xYZ = vec3(boundingBoxMin.x, boundingBoxMax.y, boundingBoxMax.z);
	vec3 Xyz = vec3(boundingBoxMax.x, boundingBoxMin.y, boundingBoxMin.z);
	vec3 XyZ = vec3(boundingBoxMax.x, boundingBoxMin.y, boundingBoxMax.z);
	vec3 XYz = vec3(boundingBoxMax.x, boundingBoxMax.y, boundingBoxMin.z);
	vec3 XYZ = vec3(boundingBoxMax.x, boundingBoxMax.y, boundingBoxMax.z);

	vec4 color = vec4(0.0, 1.0, 0.0, 0.0);
	emitData(color, xyZ);
	emitData(color, XyZ);
	emitData(color, xyz);
	emitData(color, Xyz);
	EndPrimitive();

	color = vec4(0.0, 0.0, 1.0, 0.0);
	emitData(color, xyz);
	emitData(color, Xyz);
	emitData(color, xYz);
	emitData(color, XYz);
	EndPrimitive();

	color = vec4(1.0, 0.0, 0.0, 0.0);
	emitData(color, xyZ);
	emitData(color, xyz);
	emitData(color, xYZ);
	emitData(color, xYz);
	EndPrimitive();

	emitData(color, XyZ);
	emitData(color, Xyz);
	emitData(color, XYZ);
	emitData(color, XYz);
	EndPrimitive();
}


void main( void )
{
	vec4 cam = modelViewProjectionMatrix * vec4(0.0);
	vec4 bbMin = modelViewProjectionMatrix * vec4(boundingBoxMin, 1);
	vec4 bbMax = modelViewProjectionMatrix * vec4(boundingBoxMax, 1);

	vec3 centre = (bbMax.xyz + bbMin.xyz)/2.0;
	float radi = distance(bbMax, bbMin)/2.0;
	
	for( int i = 0 ; i < 3 ; i++ )
	{
		if (distance(centre, cam.xyz) < radi) gfrontColor = 2*vfrontColor[i];
		else gfrontColor = vfrontColor[i];
		gl_Position = gl_in[i].gl_Position;
		EmitVertex();
	}
    EndPrimitive();

	if (gl_PrimitiveIDIn == 0){
			pintBox();
	}
}
