/*********************************************************************************
 *
 * Inviwo - Interactive Visualization Workshop
 *
 * Copyright (c) 2016 Inviwo Foundation
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *********************************************************************************/
 
#include "utils/structs.glsl"

uniform sampler2D vfColor;
uniform ImageParameters vfParameters;
in vec3 texCoord_;


float passThrough(vec2 coord){
    return texture(vfColor,coord).x;
}

float divX(vec2 coord){
    return texture(vfColor,coord).x;
}

float divY(vec2 coord){
    return texture(vfColor,coord).y;
}

float magnitude( vec2 coord ){
	float v_x = texture(vfColor,coord).x;
	float v_y = texture(vfColor,coord).y;
	float mag = sqrt(v_x * v_x + v_y * v_y);

    return mag;
}

float divergence(vec2 coord){
	vec2 pixelSize = vfParameters.reciprocalDimensions;
	float dV_x = divX( vec2(coord.x + pixelSize.x, coord.y) ) - divX( vec2(coord.x - pixelSize.x, coord.y) );
	float dV_y = divY( vec2(coord.x, coord.y + pixelSize.y) ) - divY( vec2(coord.x, coord.y - pixelSize.y) );
	float dX = 2 * pixelSize.x;
	float dY = 2 * pixelSize.y;
    return (dV_x/dX + dV_y/dY);
}

float rotation(vec2 coord){
    vec2 pixelSize = vfParameters.reciprocalDimensions;
	float dV_y = divY( vec2(coord.x, coord.y + pixelSize.y) ) - divY( vec2(coord.x, coord.y - pixelSize.y) );
	float dV_x = divX( vec2(coord.x + pixelSize.x, coord.y) ) - divX( vec2(coord.x - pixelSize.x, coord.y) );
	float dX = 2 * pixelSize.x;
	float dY = 2 * pixelSize.y;

    return (dV_y/dX - dV_x/dY);
}


void main(void) {
    float v = OUTPUT(texCoord_.xy);
    FragData0 = vec4(v,v,v,1 );
}
