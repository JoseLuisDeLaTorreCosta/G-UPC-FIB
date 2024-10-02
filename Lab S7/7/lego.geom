#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;
out vec2 gtexcoord;
out vec3 N;

uniform float step = 0.2;
uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;


vec3 Centre() {
	return (gl_in[0].gl_Position.xyz + gl_in[1].gl_Position.xyz + gl_in[2].gl_Position.xyz)/3.0;
}

void emitData(vec3 pos, vec4 color, vec3 normal, float x, float z) {
	gl_Position = modelViewProjectionMatrix*vec4(pos, 1);
	gtexcoord = vec2(x, z);
	gfrontColor = color;
	N = normal;
	EmitVertex();
}

void main( void )
{
	vec3 C = step*round(Centre()/step);
	vec4 color = (vfrontColor[0] + vfrontColor[1] + vfrontColor[2])/3;
	float r = step/2;

	vec3 xyz = C + vec3(-r, -r, -r);
	vec3 xyZ = C + vec3(-r, -r,  r);
	vec3 xYz = C + vec3(-r,  r, -r);
	vec3 xYZ = C + vec3(-r,  r,  r);
	vec3 Xyz = C + vec3( r, -r, -r);
	vec3 XyZ = C + vec3( r, -r,  r);
	vec3 XYz = C + vec3( r,  r, -r);
	vec3 XYZ = C + vec3( r,  r,  r);

	
	vec3 normal = vec3(0, 0, 1);
	emitData(xyZ, color, normal, 0, 1);
	emitData(XyZ, color, normal, 1, 1);
	emitData(xYZ, color, normal, 0, 1);
	emitData(XYZ, color, normal, 1, 1);
	EndPrimitive();

	normal = vec3(1, 0, 0);
	emitData(XyZ, color, normal, 1, 1);
	emitData(Xyz, color, normal, 1, 0);
	emitData(XYZ, color, normal, 1, 1);
	emitData(XYz, color, normal, 1, 0);
	EndPrimitive();

	normal = vec3(0, 0, -1);
	emitData(Xyz, color, normal, 1, 0);
	emitData(xyz, color, normal, 0, 0);
	emitData(XYz, color, normal, 1, 0);
	emitData(xYz, color, normal, 0, 0);
	EndPrimitive();

	normal = vec3(-1, 0, 0);
	emitData(xyZ, color, normal, 0, 1);
	emitData(xyz, color, normal, 0, 0);
	emitData(xYZ, color, normal, 0, 1);
	emitData(xYz, color, normal, 0, 0);
	EndPrimitive();

	normal = vec3(0, -1, 0);
	emitData(xyZ, color, normal, 0, 1);
	emitData(XyZ, color, normal, 1, 1);
	emitData(xyz, color, normal, 0, 0);
	emitData(Xyz, color, normal, 1, 1);
	EndPrimitive();

	normal = vec3(0, 1, 0);
	emitData(xYZ, color, normal, 0, 1);
	emitData(XYZ, color, normal, 1, 1);
	emitData(xYz, color, normal, 0, 0);
	emitData(XYz, color, normal, 1, 0);
	EndPrimitive();
}
