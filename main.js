// check web gl is support or not in browser
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
if (gl === null) {
    alert("Webgl not supported");
}
// create a triangle
gl.clearColor(0.6, 1.5, 0.4, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.attachShader(gl, createShader(gl, gl.VERTEX_SHADER, `attribute vec4 a_position`));
gl.attachShader(gl, createShader(gl, gl.FRAGMENT_SHADER, `precision mediump float; void main() { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }`));
gl.linkProgram(gl.createProgram());

