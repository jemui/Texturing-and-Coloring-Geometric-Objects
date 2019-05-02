/**
 * Specifies a Cube. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Cube}
 */
class Cube extends Geometry {
  /**
   * Constructor for Cube.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Cube} Cube created
   */
  constructor(shader, x, y, image) { //image
      super(shader, x, y, image);

      this.vertices = this.generateCubeVertices();

      for(var i = 0; i < this.vertices.length; i+=6) {
        this.vertices[i].texCoord = [1.0, 1.0];
        this.vertices[i+1].texCoord = [0.0, 1.0];
        this.vertices[i+2].texCoord = [0.0, 0.0];
        this.vertices[i+3].texCoord = [0.0, 0.0];
        this.vertices[i+4].texCoord = [1.0, 0.0];
        this.vertices[i+5].texCoord = [1.0, 1.0];
      }

      console.log(this.vertices.length);
      // vertices[0].texCoord works 
      // can generate seperate uv arrays

      this.faces = {0: this.vertices};
      this.image = image;
      console.log("cube: " + this.image);
      
      // Set initial position to tilt cube
      this.rotationMatrix = new Matrix4();
      this.rotationMatrix.setRotate(-45, 1, 0, 0);
      this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateCubeVertices() {
      var vertices = []

      // avoid clipping by dividing by a number greater than size
      var size = document.getElementById("size").value/10;

      // convert to gl coordinates
      var x = (this.x/canvas.width)*2-1;
      var y = (this.y/canvas.height)*-2+1;
      var z = size;

      console.log(x + " " + y + " " +size);

      // front face
      var vertex1 = new Vertex( x+size, y+size, z);  // v0 
     // vertex1.texCoord = [1.0, 1.0];

      var vertex2 = new Vertex( x-size, y+size , z); // v1
     // vertex2.texCoord = [0.0, 1.0];

      var vertex3 = new Vertex( x-size, y-size, z); // v2
     // vertex3.texCoord = [0.0, 0.0];

      var vertex4 = new Vertex( x-size, y-size, z); // v2 
    //  vertex4.texCoord = [0.0, 0.0];

      var vertex5 = new Vertex( x+size, y-size, z); // v3
     // vertex5.texCoord = [1.0, 0.0];

      var vertex6 = new Vertex( x+size, y+size, z); // v0
    //  vertex6.texCoord = [1.0, 1.0];

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // right face
      vertex1 = new Vertex( x+size, y+size, -z); // v5 
     // vertex1.texCoord = [1.0, 1.0];

      vertex2 = new Vertex( x+size, y+size , z); // v0
     // vertex2.texCoord = [0.0, 1.0];

      vertex3 = new Vertex( x+size, y-size, z); // v3
    //  vertex3.texCoord = [0.0, 0.0];

      vertex4 = new Vertex( x+size, y-size, z); // v3
    //  vertex4.texCoord = [0.0, 0.0];

      vertex5 = new Vertex( x+size, y-size, -z); // v4
    //  vertex5.texCoord = [1.0, 0.0];

      vertex6 = new Vertex( x+size, y+size, -z); // v5
    //  vertex6.texCoord = [1.0, 1.0];

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // back face
      vertex1 = new Vertex( x+size, y+size, -z); // v5 
     // vertex1.texCoord = [0.0, 1.0];

      vertex2 = new Vertex( x-size, y+size , -z); // v6
    //  vertex2.texCoord = [1.0, 1.0];

      vertex3 = new Vertex( x-size, y-size, -z); // v7
     // vertex3.texCoord = [1.0, 0.0];

      vertex4 = new Vertex( x-size, y-size, -z); // v7
     // vertex4.texCoord = [1.0, 0.0];

      vertex5 = new Vertex( x+size, y-size, -z); // v4
    //  vertex5.texCoord = [0.0, 0.0];

      vertex6 = new Vertex( x+size, y+size, -z); // v5
      //vertex6.texCoord = [0.0, 1.0];

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // left face
      vertex1 = new Vertex( x-size, y+size, -z); // v6 
     // vertex1.texCoord = [0.0, 1.0];

      vertex2 = new Vertex( x-size, y+size , z); // v1
     // vertex2.texCoord = [1.0, 1.0];

      vertex3 = new Vertex( x-size, y-size, z); // v2
    //  vertex3.texCoord = [1.0, 0.0];

      vertex4 = new Vertex( x-size, y-size, z); // v2
      //vertex4.texCoord = [1.0, 0.0];

      vertex5 = new Vertex( x-size, y-size, -z); // v7
     // vertex5.texCoord = [0.0, 0.0];

      vertex6 = new Vertex( x-size, y+size, -z); // v6
    //  vertex6.texCoord = [0.0, 1.0];

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // top face
      vertex1 = new Vertex( x+size, y+size, -z); // v5 
     // vertex1.texCoord = [0.0, 1.0];

      vertex2 = new Vertex( x-size, y+size , -z); // v6
    //  vertex2.texCoord = [1.0, 1.0];

      vertex3 = new Vertex( x-size, y+size, z); // v1
    //  vertex3.texCoord = [1.0, 0.0];

      vertex4 = new Vertex( x-size, y+size, z); // v1
   //   vertex4.texCoord = [1.0, 0.0];

      vertex5 = new Vertex( x+size, y+size, z); // v0
    //  vertex5.texCoord = [0.0, 0.0];

      vertex6 = new Vertex( x+size, y+size, -z); // v5
    //  vertex6.texCoord = [0.0, 1.0];

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // bottom face
      vertex1 = new Vertex( x+size, y-size, -z); // v4
     // vertex1.texCoord = [0.0, 1.0];

      vertex2 = new Vertex( x-size, y-size , -z); // v7
    //  vertex2.texCoord = [1.0, 1.0];

      vertex3 = new Vertex( x-size, y-size, z); // v2
    //  vertex3.texCoord = [1.0, 0.0];

      vertex4 = new Vertex( x-size, y-size, z); // v2
     // vertex4.texCoord = [1.0, 0.0];

      vertex5 = new Vertex( x+size, y-size, z); // v3
     // vertex5.texCoord = [0.0, 0.0];

      vertex6 = new Vertex( x+size, y-size, -z); // v4
    //  vertex6.texCoord = [0.0, 1.0];

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);
      return vertices;
  }

  render() {
      // Object's gl coordinates
       var x = (this.x/canvas.width)*2-1;
       var y = (this.y/canvas.height)*-2+1;

       // Translate origin to center of the object and update matrix
       this.translationMatrix = new Matrix4();
       this.translationMatrix.setTranslate(x, y, 0);
       this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);

       // Rotate the object
       this.rotationMatrix = new Matrix4();
       this.rotationMatrix.setRotate(0.5, 1, 1, 0);
       this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);

       // Translate object back for proper rotation
       this.translationMatrix.setTranslate(-x, -y, 0);
       this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
       this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);  

       this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }
}
