var x=Object.defineProperty;var C=(l,e,t)=>e in l?x(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var n=(l,e,t)=>C(l,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();class g{constructor(e,t={}){n(this,"gl");n(this,"type");n(this,"buffer");n(this,"normalized",!1);Object.assign(this,t),this.gl=e,this.type=this.gl.getContext().FLOAT,this.buffer=this.gl.getContext().createBuffer(),this.update()}update(){if(this.values){const e=this.gl.getContext();e.bindBuffer(this.target,this.buffer),e.bufferData(this.target,this.values,e.STATIC_DRAW)}}attach(e,t){const s=this.gl.getContext(),i=s.getAttribLocation(t,e);return this.target===s.ARRAY_BUFFER&&(s.enableVertexAttribArray(i),s.vertexAttribPointer(i,this.size,this.type,this.normalized,0,0)),i}use(e){const t=this.gl.getContext();t.bindBuffer(this.target,this.buffer),this.target===t.ARRAY_BUFFER&&(t.enableVertexAttribArray(e),t.vertexAttribPointer(e,this.size,this.type,this.normalized,0,0))}}class _{constructor(e,t,s,i={},o={}){n(this,"gl");n(this,"uniformInstances",[]);Object.assign(this,o),this.gl=e,this.uniforms=i;const r=this.gl.getContext(),h=`
            precision highp float;
        `;this.vertexSource=`
            ${h}
            attribute vec4 position;
            attribute vec2 uv;
            attribute vec2 uvNorm;
            ${this._getUniformVariableDeclarations(this.gl.commonUniforms,"vertex")}
            ${this._getUniformVariableDeclarations(i,"vertex")}
            ${t}
        `,this.Source=`
            ${h}
            ${this._getUniformVariableDeclarations(this.gl.commonUniforms,"fragment")}
            ${this._getUniformVariableDeclarations(i,"fragment")}
            ${s}
        `,this.vertexShader=this._getShaderByType(r.VERTEX_SHADER,this.vertexSource),this.fragmentShader=this._getShaderByType(r.FRAGMENT_SHADER,this.Source),this.program=r.createProgram(),r.attachShader(this.program,this.vertexShader),r.attachShader(this.program,this.fragmentShader),r.linkProgram(this.program),r.getProgramParameter(this.program,r.LINK_STATUS)||console.error(r.getProgramInfoLog(this.program)),r.useProgram(this.program),this.attachUniforms(void 0,this.gl.commonUniforms),this.attachUniforms(void 0,this.uniforms)}_getShaderByType(e,t){const s=this.gl.getContext(),i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),s.getShaderParameter(i,s.COMPILE_STATUS)||console.error(s.getShaderInfoLog(i)),i}_getUniformVariableDeclarations(e,t){return Object.entries(e).map(([s,i])=>i.getDeclaration(s,t)).join(`
`)}attachUniforms(e,t){e?t.type==="array"?t.value.forEach((s,i)=>{this.attachUniforms(`${e}[${i}]`,s)}):t.type==="struct"?Object.entries(t.value).forEach(([s,i])=>{this.attachUniforms(`${e}.${s}`,i)}):this.uniformInstances.push({uniform:t,location:this.gl.getContext().getUniformLocation(this.program,e)}):Object.entries(t).forEach(([s,i])=>{this.attachUniforms(s,i)})}}class w{constructor(e,t,s,i={}){n(this,"gl");n(this,"wireframe",!1);n(this,"attributeInstances",[]);Object.assign(this,i),this.geometry=t,this.material=s,this.gl=e,Object.entries(this.geometry.attributes).forEach(([o,r])=>{this.attributeInstances.push({attribute:r,location:r.attach(o,this.material.program)})}),this.gl.meshes.push(this)}draw(){const e=this.gl.getContext();e.useProgram(this.material.program),this.material.uniformInstances.forEach(({uniform:s,location:i})=>{s.update(i)}),this.attributeInstances.forEach(({attribute:s,location:i})=>{s.use(i)});const t=this.wireframe?e.LINES:e.TRIANGLES;e.drawElements(t,this.geometry.attributes.index.values.length,e.UNSIGNED_SHORT,0)}remove(){this.gl.meshes=this.gl.meshes.filter(e=>e!=this)}}class S{constructor(e,t,s,i,o,r,h={}){n(this,"gl");n(this,"attributes");Object.assign(this,h),this.gl=e;const c=this.gl.getContext();c.createBuffer(),this.attributes={position:new g(this.gl,{target:c.ARRAY_BUFFER,size:3}),uv:new g(this.gl,{target:c.ARRAY_BUFFER,size:2}),uvNorm:new g(this.gl,{target:c.ARRAY_BUFFER,size:2}),index:new g(this.gl,{target:c.ELEMENT_ARRAY_BUFFER,size:3,type:c.UNSIGNED_SHORT})},this.setTopology(i,o),this.setSize(t,s,r)}setTopology(e=1,t=1){this.xSegCount=e,this.ySegCount=t,this.vertexCount=(this.xSegCount+1)*(this.ySegCount+1),this.quadCount=this.xSegCount*this.ySegCount*2,this.attributes.uv.values=new Float32Array(2*this.vertexCount),this.attributes.uvNorm.values=new Float32Array(2*this.vertexCount),this.attributes.index.values=new Uint16Array(3*this.quadCount);for(let s=0;s<=this.ySegCount;s++)for(let i=0;i<=this.xSegCount;i++){const o=s*(this.xSegCount+1)+i;if(this.attributes.uv.values[2*o]=i/this.xSegCount,this.attributes.uv.values[2*o+1]=1-s/this.ySegCount,this.attributes.uvNorm.values[2*o]=i/this.xSegCount*2-1,this.attributes.uvNorm.values[2*o+1]=1-s/this.ySegCount*2,i<this.xSegCount&&s<this.ySegCount){const r=s*this.xSegCount+i;this.attributes.index.values[6*r]=o,this.attributes.index.values[6*r+1]=o+1+this.xSegCount,this.attributes.index.values[6*r+2]=o+1,this.attributes.index.values[6*r+3]=o+1,this.attributes.index.values[6*r+4]=o+1+this.xSegCount,this.attributes.index.values[6*r+5]=o+2+this.xSegCount}}this.attributes.uv.update(),this.attributes.uvNorm.update(),this.attributes.index.update()}setSize(e=1,t=1,s="xz"){this.width=e,this.height=t,this.orientation=s,this.attributes.position.values&&this.attributes.position.values.length===3*this.vertexCount||(this.attributes.position.values=new Float32Array(3*this.vertexCount));const i=e/-2,o=t/-2,r=e/this.xSegCount,h=t/this.ySegCount;for(let c=0;c<=this.ySegCount;c++){const p=o+c*h;for(let b=0;b<=this.xSegCount;b++){const y=i+b*r,f=c*(this.xSegCount+1)+b;this.attributes.position.values[3*f+"xyz".indexOf(s[0])]=y,this.attributes.position.values[3*f+"xyz".indexOf(s[1])]=-p}}this.attributes.position.update()}}class a{constructor(e,t,s,i={}){n(this,"gl");n(this,"type");n(this,"value");n(this,"typeFn");n(this,"_typeMap",{float:"1f",int:"1i",vec2:"2fv",vec3:"3fv",vec4:"4fv",mat4:"Matrix4fv"});Object.assign(this,i),this.gl=e,this.type=t,this.value=s,this.typeFn=this._typeMap[this.type]||this._typeMap.float,this.update()}update(e){if(this.value){var t=this.value,s=null;this.typeFn.indexOf("Matrix")===0&&(t=this.transpose,s=this.value),this.gl.getContext()[`uniform${this.typeFn}`](e,t,s)}}getDeclaration(e,t,s){if(this.excludeFrom!==t){if(this.type==="array")return`${this.value[0].getDeclaration(e,t,this.value.length)}
const int ${e}_length = ${this.value.length};`;if(this.type==="struct"){let i=e.replace("u_","");i=i.charAt(0).toUpperCase()+i.slice(1);const o=Object.entries(this.value).map(([r,h])=>h.getDeclaration(r,t).replace(/^uniform/,"")).join("");return`uniform struct ${i} {
    ${o}
} ${e}${s>0?`[${s}]`:""};`}return`uniform ${this.type} ${e}${s>0?`[${s}]`:""};`}}}class m{constructor(e,t,s){n(this,"_class",m);n(this,"_canvas");n(this,"_context");n(this,"commonUniforms",{});n(this,"meshes",[]);this.setCanvas(e);const i=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];this.commonUniforms={projectionMatrix:new a(this,"mat4",i),modelViewMatrix:new a(this,"mat4",i),resolution:new a(this,"vec2",[1,1]),aspectRatio:new a(this,"float",1)},this.setSize(t,s)}setCanvas(e){this._canvas=e,this._context=e.getContext("webgl",{antialias:!0})}getCanvas(){return this._canvas}getContext(){return this._context}setSize(e=640,t=480){this.getCanvas().width=e,this.getCanvas().height=t,this.getContext().viewport(0,0,e,t),this.commonUniforms.resolution.value=[e,t],this.commonUniforms.aspectRatio.value=e/t}setOrthographicCamera(e=0,t=0,s=0,i=-2e3,o=2e3){this.commonUniforms.projectionMatrix.value=[2/this.getCanvas().width,0,0,0,0,2/this.getCanvas().height,0,0,0,0,2/(i-o),0,e,t,s,1]}render(){this.getContext().clearColor(0,0,0,0),this.getContext().clearDepth(1),this.meshes.forEach(e=>{e.draw()})}}const L=`//
// https://github.com/jamieowen/glsl-blend
//

// Normal

vec3 blendNormal(vec3 base, vec3 blend) {
    return blend;
}

vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
    return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));
}

// Screen

float blendScreen(float base, float blend) {
    return 1.0-((1.0-base)*(1.0-blend));
}

vec3 blendScreen(vec3 base, vec3 blend) {
    return vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));
}

vec3 blendScreen(vec3 base, vec3 blend, float opacity) {
    return (blendScreen(base, blend) * opacity + base * (1.0 - opacity));
}

// Multiply

vec3 blendMultiply(vec3 base, vec3 blend) {
    return base*blend;
}

vec3 blendMultiply(vec3 base, vec3 blend, float opacity) {
    return (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));
}

// Overlay

float blendOverlay(float base, float blend) {
    return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

vec3 blendOverlay(vec3 base, vec3 blend) {
    return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));
}

vec3 blendOverlay(vec3 base, vec3 blend, float opacity) {
    return (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));
}

// Hard light

vec3 blendHardLight(vec3 base, vec3 blend) {
    return blendOverlay(blend,base);
}

vec3 blendHardLight(vec3 base, vec3 blend, float opacity) {
    return (blendHardLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Soft light

float blendSoftLight(float base, float blend) {
    return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}

vec3 blendSoftLight(vec3 base, vec3 blend) {
    return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));
}

vec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {
    return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Color dodge

float blendColorDodge(float base, float blend) {
    return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}

vec3 blendColorDodge(vec3 base, vec3 blend) {
    return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));
}

vec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {
    return (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));
}

// Color burn

float blendColorBurn(float base, float blend) {
    return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}

vec3 blendColorBurn(vec3 base, vec3 blend) {
    return vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));
}

vec3 blendColorBurn(vec3 base, vec3 blend, float opacity) {
    return (blendColorBurn(base, blend) * opacity + base * (1.0 - opacity));
}

// Vivid Light

float blendVividLight(float base, float blend) {
    return (blend<0.5)?blendColorBurn(base,(2.0*blend)):blendColorDodge(base,(2.0*(blend-0.5)));
}

vec3 blendVividLight(vec3 base, vec3 blend) {
    return vec3(blendVividLight(base.r,blend.r),blendVividLight(base.g,blend.g),blendVividLight(base.b,blend.b));
}

vec3 blendVividLight(vec3 base, vec3 blend, float opacity) {
    return (blendVividLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Lighten

float blendLighten(float base, float blend) {
    return max(blend,base);
}

vec3 blendLighten(vec3 base, vec3 blend) {
    return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
}

vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
    return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear burn

float blendLinearBurn(float base, float blend) {
    // Note : Same implementation as BlendSubtractf
    return max(base+blend-1.0,0.0);
}

vec3 blendLinearBurn(vec3 base, vec3 blend) {
    // Note : Same implementation as BlendSubtract
    return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity) {
    return (blendLinearBurn(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear dodge

float blendLinearDodge(float base, float blend) {
    // Note : Same implementation as BlendAddf
    return min(base+blend,1.0);
}

vec3 blendLinearDodge(vec3 base, vec3 blend) {
    // Note : Same implementation as BlendAdd
    return min(base+blend,vec3(1.0));
}

vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
    return (blendLinearDodge(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear light

float blendLinearLight(float base, float blend) {
    return blend<0.5?blendLinearBurn(base,(2.0*blend)):blendLinearDodge(base,(2.0*(blend-0.5)));
}

vec3 blendLinearLight(vec3 base, vec3 blend) {
    return vec3(blendLinearLight(base.r,blend.r),blendLinearLight(base.g,blend.g),blendLinearLight(base.b,blend.b));
}

vec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {
    return (blendLinearLight(base, blend) * opacity + base * (1.0 - opacity));
}
`,F=`varying vec3 v_color;

void main() {
    vec3 color = v_color;
    if (u_darken_top == 1.0) {
        vec2 st = gl_FragCoord.xy/resolution.xy;
        color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;
    }
    gl_FragColor = vec4(color, 1.0);
}
`,z=`//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
{
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}
`,D=`varying vec3 v_color;

void main() {
  float time = u_time * u_global.noiseSpeed;

  vec2 noiseCoord = resolution * uvNorm * u_global.noiseFreq;

  vec2 st = 1. - uvNorm.xy;

  //
  // Tilting the plane
  //

  // Front-to-back tilt
  float tilt = resolution.y / 2.0 * uvNorm.y;

  // Left-to-right angle
  float incline = resolution.x * uvNorm.x / 2.0 * u_vertDeform.incline;

  // Up-down shift to offset incline
  float offset = resolution.x / 2.0 * u_vertDeform.incline * mix(u_vertDeform.offsetBottom, u_vertDeform.offsetTop, uv.y);

  //
  // Vertex noise
  //

  float noise = snoise(vec3(
    noiseCoord.x * u_vertDeform.noiseFreq.x + time * u_vertDeform.noiseFlow,
    noiseCoord.y * u_vertDeform.noiseFreq.y,
    time * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed
  )) * u_vertDeform.noiseAmp;

  // Fade noise to zero at edges
  noise *= 1.0 - pow(abs(uvNorm.y), 2.0);

  // Clamp to 0
  noise = max(0.0, noise);

  vec3 pos = vec3(
    position.x,
    position.y + tilt + incline + noise - offset,
    position.z
  );

  //
  // Vertex color, to be passed to fragment shader
  //

  if (u_active_colors[0] == 1.) {
    v_color = u_baseColor;
  }

  for (int i = 0; i < u_waveLayers_length; i++) {
    if (u_active_colors[i + 1] == 1.) {
      WaveLayers layer = u_waveLayers[i];

      float noise = smoothstep(
        layer.noiseFloor,
        layer.noiseCeil,
        snoise(vec3(
          noiseCoord.x * layer.noiseFreq.x + time * layer.noiseFlow,
          noiseCoord.y * layer.noiseFreq.y,
          time * layer.noiseSpeed + layer.noiseSeed
        )) / 2.0 + 0.5
      );

      v_color = blendNormal(v_color, layer.color, pow(noise, 4.));
    }
  }

  //
  // Finish
  //

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`,v=class v{constructor(e){n(this,"_class",v);n(this,"vertexShader",null);n(this,"uniforms",null);n(this,"time",1253106);n(this,"mesh",null);n(this,"material",null);n(this,"geometry",null);n(this,"scrollingTimeout",null);n(this,"scrollingRefreshDelay",200);n(this,"scrollObserver",null);n(this,"width",null);n(this,"minWidth",1111);n(this,"height",600);n(this,"xSegCount",null);n(this,"ySegCount",null);n(this,"freqX",14e-5);n(this,"freqY",29e-5);n(this,"freqDelta",1e-5);n(this,"activeColors",[1,1,1,1]);n(this,"shaderFiles",{vertex:D,noise:z,blend:L,fragment:F});n(this,"options",{});n(this,"_flags",{playing:!0});n(this,"_canvas");n(this,"_context");n(this,"_minigl");if(this.options=e,this.setCanvas(this.findCanvas(this.getOption("canvas"))),!this.getCanvas())throw"Missing Canvas. Pass the canvas to the Gradient constructor.";this._minigl=new m(this.getCanvas(),this.getCanvas().offsetWidth,this.getCanvas().offsetHeight),this.init()}getOption(e,t=void 0){return t===void 0&&e in this._class.defaultOptions&&(t=this._class.defaultOptions[e]),e in this.options?this.options[e]:t}findCanvas(e){const t=typeof e=="string"?document.querySelector(e):e;return t instanceof HTMLCanvasElement?t:null}setCanvas(e){e?(this._canvas=e,this._context=e.getContext("webgl",{antialias:!0})):(this._canvas=null,this._context=null)}getCanvas(){return this._canvas}getContext(){return this._context}setFlag(e,t){return this._flags[e]=t}getFlag(e,t=void 0){return this._flags[e]||t}handleScroll(){clearTimeout(this.scrollingTimeout),this.scrollingTimeout=setTimeout(this.handleScrollEnd,this.scrollingRefreshDelay),this.getFlag("playing")&&(this.setFlag("isScrolling",!0),this.pause())}handleScrollEnd(){this.setFlag("isScrolling",!1),this.getFlag("isIntersecting")&&this.play()}resize(){const[e,t]=this.getOption("density");this.width=window.innerWidth,this._minigl.setSize(this.width,this.height),this._minigl.setOrthographicCamera(),this.xSegCount=Math.ceil(this.width*e),this.ySegCount=Math.ceil(this.height*t),this.mesh.geometry.setTopology(this.xSegCount,this.ySegCount),this.mesh.geometry.setSize(this.width,this.height),this.mesh.material.uniforms.u_shadow_power.value=this.width<600?5:6}animate(e=0){const t=!!window.document.hidden||!this.getFlag("playing")||parseInt(e,10)%2===0;let s=this.getFlag("lastFrame",0);if(t||(this.time+=Math.min(e-s,1e3/15),s=this.setFlag("lastFrame",e),this.mesh.material.uniforms.u_time.value=this.time,this._minigl.render()),s!==0&&this.getOption("static"))return this._minigl.render(),this.disconnect();this.getFlag("playing")&&requestAnimationFrame(this.animate.bind(this))}pause(){this.setFlag("playing",!1)}play(){requestAnimationFrame(this.animate.bind(this)),this.setFlag("playing",!0)}disconnect(){this.scrollObserver&&(window.removeEventListener("scroll",this.handleScroll),this.scrollObserver.disconnect()),window.removeEventListener("resize",this.resize)}initMaterial(){const e=this.getOption("colors").map(t=>(t.length===4&&(t=`#${t.substr(1).split("").map(i=>i+i).join("")}`),t&&`0x${t.substr(1)}`)).filter(Boolean).map(this.normalizeColor);this.uniforms={u_time:new a(this._minigl,"float",0),u_shadow_power:new a(this._minigl,"float",10),u_darken_top:new a(this._minigl,"float",this.getCanvas().dataset.jsDarkenTop?1:0),u_active_colors:new a(this._minigl,"vec4",this.activeColors),u_global:new a(this._minigl,"struct",{noiseFreq:new a(this._minigl,"vec2",[this.freqX,this.freqY]),noiseSpeed:new a(this._minigl,"float",5e-6)}),u_vertDeform:new a(this._minigl,"struct",{incline:new a(this._minigl,"float",Math.sin(this.getOption("angle"))/Math.cos(this.getOption("angle"))),offsetTop:new a(this._minigl,"float",-.5),offsetBottom:new a(this._minigl,"float",-.5),noiseFreq:new a(this._minigl,"vec2",[3,4]),noiseAmp:new a(this._minigl,"float",this.getOption("amplitude")),noiseSpeed:new a(this._minigl,"float",10),noiseFlow:new a(this._minigl,"float",3),noiseSeed:new a(this._minigl,"float",this.seed)},{excludeFrom:"fragment"}),u_baseColor:new a(this._minigl,"vec3",e[0],{excludeFrom:"fragment"}),u_waveLayers:new a(this._minigl,"array",[],{excludeFrom:"fragment"})};for(let t=1;t<e.length;t+=1){const s=new a(this._minigl,"struct",{color:new a(this._minigl,"vec3",e[t]),noiseFreq:new a(this._minigl,"vec2",[2+t/e.length,3+t/e.length]),noiseSpeed:new a(this._minigl,"float",11+.3*t),noiseFlow:new a(this._minigl,"float",6.5+.3*t),noiseSeed:new a(this._minigl,"float",this.seed+10*t),noiseFloor:new a(this._minigl,"float",.1),noiseCeil:new a(this._minigl,"float",.63+.07*t)});this.uniforms.u_waveLayers.value.push(s)}return this.vertexShader=[this.shaderFiles.noise,this.shaderFiles.blend,this.shaderFiles.vertex].join(`

`),new _(this._minigl,this.vertexShader,this.shaderFiles.fragment,this.uniforms)}initMesh(){this.material=this.initMaterial(),this.geometry=new S(this._minigl),this.mesh=new w(this._minigl,this.geometry,this.material),this.mesh.wireframe=this.getOption("wireframe")}updateFrequency(e){this.freqX+=e,this.freqY+=e}toggleColor(e){this.activeColors[e]=this.activeColors[e]===0?1:0}init(){const e=this.getOption("loadedClass");e&&this.getCanvas().classList.add(e),this.initMesh(),this.resize(),requestAnimationFrame(this.animate.bind(this)),window.addEventListener("resize",this.resize)}normalizeColor(e){return[(e>>16&255)/255,(e>>8&255)/255,(255&e)/255]}};n(v,"defaultOptions",{canvas:null,colors:["#f00","#0f0","#00f"],wireframe:!1,density:[.06,.16],angle:0,amplitude:320,static:!1,loadedClass:"is-loaded",zoom:1,speed:5,rotation:0});let u=v;window.Gradient=u;window.jQuery&&(jQuery.fn.gradient=function(l={}){return l.canvas=this.get(0),this._gradient=new u(l),this});class d{constructor(e,t,s,i,o,r){this.mass=e,this.rMajor=t,this.rMinor=s,this.focusDist=i,this.color=o,this.boundaryMajor=t-.001,this.signY=r>.5?-1:1,this.xIndex=Math.cos(r*2*Math.PI-Math.PI)*this.rMajor,this.posX=0,this.posY=0,this.velX=0,this.gravParam=e,this.orbitalPeriod=2*Math.PI*t**1.5/this.gravParam**.5,this.deltaTime=this.orbitalPeriod/1e3}updatePosition(){this.posX=this.xIndex+this.velX*this.deltaTime,this.signY*this.posX>this.boundaryMajor&&(this.posX=this.signY*this.boundaryMajor,this.signY=-this.signY),this.posY=this.signY*this.rMinor*(1-this.posX*this.posX/this.rMajor/this.rMajor)**.5,this.velX=this.posY/this.rMinor*(this.gravParam*this.rMajor/((this.posX-this.focusDist)**2+this.posY*this.posY))**.5,this.xIndex=this.posX}draw(e){e.beginPath(),e.arc(this.posX,this.posY,this.mass,0,2*Math.PI),this.posY<0?e.fillStyle=`rgba(${this.color}, ${1- -this.posY/this.rMinor})`:e.fillStyle=`rgba(${this.color},1)`,e.fill()}}document.addEventListener("resize",function(){setupCanvas()});document.addEventListener("DOMContentLoaded",function(){new u({canvas:"canvas#gradient",colors:["#FF7CE7","#FF7CE7","#0079CF","#86b4db"],static:!1}),document.getElementById("gradient").classList.remove("opacity-0"),document.getElementById("halo").classList.remove("opacity-0"),document.getElementById("orbits").classList.remove("opacity-0"),function(){var e=document.querySelector("#orbits"),t=e.getContext("2d");e.width=document.body.clientWidth,e.height=document.body.clientHeight;var s=e.width/2,i=e.height/2;t.transform(1,0,0,-1,s,i-50),t.fillStyle="white";const o=[new d(10,300,305,10,"0,121,207",.2),new d(25,350,275,10,"255,124,231",.56),new d(10,380,180,10,"0,121,207",.08),new d(25,350,350,10,"255,124,231",.96),new d(10,320,250,10,"0,121,207",.5),new d(15,380,280,-10,"255,124,231",.28),new d(25,400,280,10,"255,124,231",.1),new d(20,450,340,10,"255,255,255",.32),new d(25,500,380,10,"255,255,255",.25),new d(10,550,450,-10,"0,121,207",.48)];function r(){t.clearRect(-e.width/2,-e.height/2-50,e.width,e.height),o.forEach(h=>{h.updatePosition(),h.draw(t)}),window.requestAnimationFrame(r)}r()}()});
