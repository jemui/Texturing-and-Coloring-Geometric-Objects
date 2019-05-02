// Vertex Shader
var ASG3_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;
  varying vec4 v_Color;
  uniform mat4 u_ModelMatrix;

  void main() {
    v_Color = a_Color;
    gl_Position = u_ModelMatrix * a_Position;
    v_TexCoord = a_TexCoord;
  }`;

// Fragment Shader
var ASG3_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;
  uniform sampler2D u_Sampler;
  varying vec2 v_TexCoord;

  void main() {
    gl_FragColor = texture2D(u_Sampler, v_TexCoord)+v_Color;
  }`;
