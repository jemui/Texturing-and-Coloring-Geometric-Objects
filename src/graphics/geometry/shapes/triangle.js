/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Triangle} Triangle created
   */
  constructor(shader, x, y) {
      super(shader, x, y);

    //  this.image = null;

      this.vertices = this.generateTriangleVertices();
      this.faces = {0: [0, 1, 2]};

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateTriangleVertices() {
      var vertices = []

      // convert to gl coordinates
      var x = (this.x/canvas.width)*2-1;
      var y = (this.y/canvas.height)*-2+1;

      var size = document.getElementById("size").value/10;

      console.log(x + " " + y + " size: "+ size);

      // Vertices
      var vertex0 = new Vertex(x-size, y-size, 0.0);
      vertex0.texCoord = [0.0, 0.0];

      var vertex1 = new Vertex(x+size, y-size, 0.0);
      vertex1.texCoord = [0.0, 0.0];

      var vertex2 = new Vertex(x     , y+size, 0.0);
      vertex2.texCoord = [0.0, 0.0];

      vertices.push(vertex0);
      vertices.push(vertex1);
      vertices.push(vertex2);

      return vertices;
   }

   scaleUp() {
           // Convert to gl coordinates
           var x = (this.x/canvas.width)*2-1;
           var y = (this.y/canvas.height)*-2+1;

           // Translate origin to triangle's center
           this.translationMatrix.setTranslate(x, y, 0);
           this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);

           // Scale triangle up at triangle's center
           this.scalingMatrix.setScale(1.025, 1.025, 0);
           this.modelMatrix = this.modelMatrix.multiply(this.scalingMatrix);

           // Translate triangle back
           this.translationMatrix.setTranslate(-x, -y, 0);
           this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix); 
    }
    scaleDown() {
           var x = (this.x/canvas.width)*2-1;
           var y = (this.y/canvas.height)*-2+1;

           // Translate origin to triangle's center
           this.translationMatrix.setTranslate(x, y, 0);
           this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);

           // Scale triangle down at triangle's center
           this.scalingMatrix.setScale(0.975, 0.975, 0);
           this.modelMatrix = this.modelMatrix.multiply(this.scalingMatrix);

           // Translate triangle back
           this.translationMatrix.setTranslate(-x, -y, 0);
           this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);  
    }

   render() {
       // Convert to gl coordinates
       var x = (this.x/canvas.width)*2-1;
       var y = (this.y/canvas.height)*-2+1;

       // Create the translation and scaling matrix
    //    this.translationMatrix = new Matrix4();
    //    this.scalingMatrix = new Matrix4();
     
    //    if(count % 5 == 0 && count % 10 != 0) {
    //        this.scaleUp();
    //    }
    //    else if (count % 10 == 0) {
    //        this.scaleDown();
    //    }

       this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
   }
}