#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
in vec3 N[];
out vec4 gfrontColor;


uniform float step = 0.2;
uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;


vec3 Centre() {
	return (gl_in[0].gl_Position.xyz + gl_in[1].gl_Position.xyz + gl_in[2].gl_Position.xyz)/3.0;
}


void main( void )
{
	vec3 C = step*round(Centre()/step);
	float r = step/2;

	vec3 xyz = C + vec3(-r, -r, -r);
	vec3 xyZ = C + vec3(-r, -r,  r);
	vec3 xYz = C + vec3(-r,  r, -r);
	vec3 xYZ = C + vec3(-r,  r,  r);
	vec3 Xyz = C + vec3( r, -r, -r);
	vec3 XyZ = C + vec3( r, -r,  r);
	vec3 XYz = C + vec3( r,  r, -r);
	vec3 XYZ = C + vec3( r,  r,  r);

	
	vec3 N = normalMatrix*vec3(0, 0, 1);
	gfrontColor = vec4(0.8)*N.z;
	gl_Position = modelViewProjectionMatrix*vec4(xyZ, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(XyZ, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(xYZ, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(XYZ, 1);
	EmitVertex();
	EndPrimitive();

	N = normalMatrix*vec3(1, 0, 0);
	gfrontColor = vec4(0.8)*N.z;
	gl_Position = modelViewProjectionMatrix*vec4(XyZ, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(Xyz, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(XYZ, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(XYz, 1);
	EmitVertex();
	EndPrimitive();

	N = normalMatrix*vec3(0, 0, -1);
	gfrontColor = vec4(0.8)*N.z;
	gl_Position = modelViewProjectionMatrix*vec4(Xyz, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(xyz, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(XYz, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(xYz, 1);
	EmitVertex();
	EndPrimitive();

	N = normalMatrix*vec3(-1, 0, 0);
	gfrontColor = vec4(0.8)*N.z;
	gl_Position = modelViewProjectionMatrix*vec4(xyZ, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(xyz, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(xYZ, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(xYz, 1);
	EmitVertex();
	EndPrimitive();

	N = normalMatrix*vec3(0, -1, 0);
	gfrontColor = vec4(0.8)*N.z;
	gl_Position = modelViewProjectionMatrix*vec4(xyZ, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(XyZ, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(xyz, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(Xyz, 1);
	EmitVertex();
	EndPrimitive();

	N = normalMatrix*vec3(0, 1, 0);
	gfrontColor = vec4(0.8)*N.z;
	gl_Position = modelViewProjectionMatrix*vec4(xYZ, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(XYZ, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(xYz, 1);
	EmitVertex();
	gl_Position = modelViewProjectionMatrix*vec4(XYz, 1);
	EmitVertex();
	EndPrimitive();
}
