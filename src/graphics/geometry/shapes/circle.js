/**
 * Specifies a Circle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Circle}
 */
class Circle extends Geometry {
  /**
   * Constructor for Circle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Circle} Circle created
   */
  constructor(shader,x,y) {
      super(shader,x,y);

      this.vertices = this.generateCircleVertices();
      this.faces = {0: this.vertices};

      this.transX = (Math.random()*0.008)-0.004;
      this.transY = (Math.random()*0.008)-0.004;

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  // a circle consists of triangles 
  generateCircleVertices() {
      var vertices = []
      var numVert = document.getElementById("segment").value;

      // Convert to gl coordinates 
      var x = (this.x/canvas.width)*2-1;
      var y = (this.y/canvas.height)*-2+1;
      var z = 0.0;

      var r = document.getElementById("size").value/10;
      var p = 6*Math.PI;

      var delta = (2*Math.PI) / numVert;
      var center = new Vertex(x, y, z);

      console.log(numVert);

      // Draw circle 
      for(var theta = 0; theta < p; theta += delta) {
         var x2 = (Math.cos(theta) * r) + x;
         var y2 = (Math.sin(theta) * r) + y;

         var x3 = (Math.cos(theta + delta) * r) + x;
         var y3 = (Math.sin(theta + delta) * r) + y;

         vertices.push(center);
         vertices.push(new Vertex(x2, y2, z));
         vertices.push(new Vertex(x3, y3, z));
     
      }
       return vertices;
  }

  render() {
      // Create translation matrix
      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(this.transX, this.transY,0);

      // reset timer and x and y translate variables
      if(timer >= 30) {
          timer = 0;

          this.transX = (Math.random()*0.008)-0.004;
          this.transY = (Math.random()*0.008)-0.004;
      }
      this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);

      this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }
}
