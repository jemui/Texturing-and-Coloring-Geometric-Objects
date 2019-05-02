var shader = null;
var count = 0;
var timer = 0;

function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  // Initialize the scene
  var scene = new Scene();
  var inputHandler = new InputHandler(canvas, scene);

  // Initialize shader
  shader = new Shader(gl, ASG3_VSHADER, ASG3_FSHADER);

  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_TexCoord");

  // Add uniforms
  var idMatrix = new Matrix4();
  shader.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);
  shader.addUniform("u_Sampler", "sampler2D", 0);

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, null);
  renderer.start();

//  var image = new Image();
 // image.src = 'objs/sky.jpg';

  var shape = new Cube(shader, 0.5, 0.5);
  scene.addGeometry(shape);

  // Update global counter for fluctuating triangles
  var tick = function() {
    count++;
    timer++;

    if(count == 30) 
      count = 0;

    requestAnimationFrame(tick);
  }
  tick();
}
