#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;
out vec2 gtexcoord;

uniform float cut = -0.25;
uniform int mode = 1;

uniform mat4 modelViewProjectionMatrix;

void emitData(vec4 color, vec3 pos, vec2 texCoord) {
	gfrontColor = color;
	gtexcoord = texCoord;
	gl_Position = modelViewProjectionMatrix * vec4(pos, 1.0);
	EmitVertex();
}

void createBox(vec3 c, float r) {
	vec3 xyz = c + vec3(-r, -r, -r);
	vec3 xyZ = c + vec3(-r, -r, r);
	vec3 xYz = c + vec3(-r, r, -r);
	vec3 xYZ = c + vec3(-r, r, r);
	vec3 Xyz = c + vec3(r, -r, -r);
	vec3 XyZ = c + vec3(r, -r, r);
	vec3 XYz = c + vec3(r, r, -r);
	vec3 XYZ = c + vec3(r, r, r);

	vec4 color = vec4(c*vec3(0.5) + 0.5, 1.0);
	emitData(color, xyZ, vec2(0, 0));
	emitData(color, XyZ, vec2(1, 0));
	emitData(color, xYZ, vec2(0, 1));
	emitData(color, XYZ, vec2(1, 1));
	EndPrimitive();

	emitData(color, XyZ, vec2(0, 0));
	emitData(color, Xyz, vec2(1, 0));
	emitData(color, XYZ, vec2(0, 1));
	emitData(color, XYz, vec2(1, 1));
	EndPrimitive();

	emitData(color, Xyz, vec2(0, 0));
	emitData(color, xyz, vec2(1, 0));
	emitData(color, XYz, vec2(0, 1));
	emitData(color, xYz, vec2(1, 1));
	EndPrimitive();

	emitData(color, xyZ, vec2(0, 0));
	emitData(color, xyz, vec2(1, 0));
	emitData(color, xYZ, vec2(0, 1));
	emitData(color, xYz, vec2(1, 1));
	EndPrimitive();

	emitData(color, xyZ, vec2(0, 0));
	emitData(color, XyZ, vec2(1, 0));
	emitData(color, xyz, vec2(0, 1));
	emitData(color, Xyz, vec2(1, 1));
	EndPrimitive();

	emitData(color, xYZ, vec2(0, 0));
	emitData(color, XYZ, vec2(1, 0));
	emitData(color, xYz, vec2(0, 1));
	emitData(color, XYz, vec2(1, 1));
	EndPrimitive();
}

void main( void )
{
	vec3 centre = ((gl_in[0].gl_Position + gl_in[1].gl_Position + gl_in[2].gl_Position)/3.0).xyz;
	float radi = 0.08;
	if (mode < 3 || centre.x < cut || centre.y < cut || centre.z < cut) {
		createBox(centre, radi);
	}
}
