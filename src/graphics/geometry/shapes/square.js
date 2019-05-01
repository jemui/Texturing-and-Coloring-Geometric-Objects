/**
 * Specifies a Square. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Square}
 */
class Square extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Square} Square created
   */
  constructor(shader,x,y) {
      super(shader,x,y);

      this.vertices = this.generateSquareVertices();
      this.faces = {0: this.vertices};
      this.rot = 0;   

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSquareVertices() {
      var vertices = []

      // convert to gl coordinates
      var x = (this.x/canvas.width)*2-1;
      var y = (this.y/canvas.height)*-2+1;
      var z = 0.0;

      var size = document.getElementById("size").value/10;

      // Vertices
      var vertex1 = new Vertex( x+size, y+size, z);
      var vertex2 = new Vertex( x-size, y+size , z);
      var vertex3 = new Vertex( x-size, y-size, z);
      var vertex4 = new Vertex( x-size, y-size, z);
      var vertex5 = new Vertex( x+size, y-size, z);
      var vertex6 = new Vertex( x+size, y+size,z);

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      return vertices;
  }

  // Rotates the square every frame
  render() {
    // Object's gl coordinates
    var x = (this.x/canvas.width)*2-1;
    var y = (this.y/canvas.height)*-2+1;

    // Translate origin to center of the object and update matrix
    this.translationMatrix = new Matrix4();
    this.translationMatrix.setTranslate(x, y, 0);
    this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);

    // Rotate the matrix around object's center
    this.rotationMatrix = new Matrix4();
    this.rotationMatrix.setRotate(-0.5, 0, 0, 1);
    this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);

    // Translate object back for proper rotation
    this.translationMatrix.setTranslate(-x, -y, 0);
    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);  

    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }
}
