/**
 * Specifies a Cube. A subclass of geometry.
 * 
 * Bug: 
 * New textures replace old ones. 
 * New textures are created and textured, but old ones are ignored. 
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
   * @param {Image} image Takes in texture for texture coordinates (Optional)
   * @param {Custom} custom Renders initial cube differently (Optional)
   * @returns {Cube} Cube created
   */
  constructor(shader, x, y, image, custom) { //image
      super(shader, x, y);

      this.vertices = this.generateCubeVertices();
      this.faces = {0: this.vertices};
      this.image = image;

      if(this.image != null && custom == null) {
          for(var i = 0; i < this.vertices.length; i+=6) {
              this.vertices[i].texCoord   = [1.0, 1.0];
              this.vertices[i+1].texCoord = [0.0, 1.0];
              this.vertices[i+2].texCoord = [0.0, 0.0];
              this.vertices[i+3].texCoord = [0.0, 0.0];
              this.vertices[i+4].texCoord = [1.0, 0.0];
              this.vertices[i+5].texCoord = [1.0, 1.0];
          }
      } else if (custom == 1) {
            /**
             * 1 face has the whole texture image, 
             * 1 has the top half, 
             * 1 has the bottom half, 
             * 1 has the texture twice (on the left and right of each other), 
             * 1 has the texture 9 times in a 3x3 grid.
             * The last face has the whole texture image
             */

            // whole texture image
            this.vertices[0].texCoord = [1.0, 1.0];
            this.vertices[1].texCoord = [0.0, 1.0];
            this.vertices[2].texCoord = [0.0, 0.0];
            this.vertices[3].texCoord = [0.0, 0.0];
            this.vertices[4].texCoord = [1.0, 0.0];
            this.vertices[5].texCoord = [1.0, 1.0];

            // top half  
            this.vertices[6].texCoord = [1.0, 1.0];
            this.vertices[7].texCoord = [0.0, 1.0];
            this.vertices[8].texCoord = [0.0, 0.5];
            this.vertices[9].texCoord = [0.0, 0.5];
            this.vertices[10].texCoord = [0.5, 0.5];
            this.vertices[11].texCoord = [1.0, 1.0];

            // bottom half
            this.vertices[12].texCoord = [0.5, 0.5];
            this.vertices[13].texCoord = [0.0, 0.5];
            this.vertices[14].texCoord = [0.0, 0.0];
            this.vertices[15].texCoord = [0.0, 0.0];
            this.vertices[16].texCoord = [1.0, 0.0];
            this.vertices[17].texCoord = [0.5, 0.5];

            // texture to the left and right
            this.vertices[18].texCoord = [2.0, 1.0];
            this.vertices[19].texCoord = [0.0, 1.0];
            this.vertices[20].texCoord = [0.0, 0.0];
            this.vertices[21].texCoord = [0.0, 0.0];
            this.vertices[22].texCoord = [2.0, 0.0];
            this.vertices[23].texCoord = [2.0, 1.0];
    
            // 3x3 grid
            this.vertices[24].texCoord = [3.0, 3.0];
            this.vertices[25].texCoord = [0.0, 3.0];
            this.vertices[26].texCoord = [0.0, 0.0];
            this.vertices[27].texCoord = [0.0, 0.0];
            this.vertices[28].texCoord = [3.0, 0.0];
            this.vertices[29].texCoord = [3.0, 3.0];  

            // 6th face can be normal
            this.vertices[30].texCoord = [1.0, 1.0];
            this.vertices[31].texCoord = [0.0, 1.0];
            this.vertices[32].texCoord = [0.0, 0.0];
            this.vertices[33].texCoord = [0.0, 0.0];
            this.vertices[34].texCoord = [1.0, 0.0];
            this.vertices[35].texCoord = [1.0, 1.0];
      }
      
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
      var vertex2 = new Vertex( x-size, y+size , z); // v1
      var vertex3 = new Vertex( x-size, y-size, z); // v2
      var vertex4 = new Vertex( x-size, y-size, z); // v2 
      var vertex5 = new Vertex( x+size, y-size, z); // v3
      var vertex6 = new Vertex( x+size, y+size, z); // v0

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // right face
      vertex1 = new Vertex( x+size, y+size, -z); // v5 
      vertex2 = new Vertex( x+size, y+size , z); // v0
      vertex3 = new Vertex( x+size, y-size, z); // v3
      vertex4 = new Vertex( x+size, y-size, z); // v3
      vertex5 = new Vertex( x+size, y-size, -z); // v4
      vertex6 = new Vertex( x+size, y+size, -z); // v5

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // back face
      vertex1 = new Vertex( x+size, y+size, -z); // v5 
      vertex2 = new Vertex( x-size, y+size , -z); // v6
      vertex3 = new Vertex( x-size, y-size, -z); // v7
      vertex4 = new Vertex( x-size, y-size, -z); // v7
      vertex5 = new Vertex( x+size, y-size, -z); // v4
      vertex6 = new Vertex( x+size, y+size, -z); // v5

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // left face
      vertex1 = new Vertex( x-size, y+size, -z); // v6 
      vertex2 = new Vertex( x-size, y+size , z); // v1
      vertex3 = new Vertex( x-size, y-size, z); // v2
      vertex4 = new Vertex( x-size, y-size, z); // v2
      vertex5 = new Vertex( x-size, y-size, -z); // v7
      vertex6 = new Vertex( x-size, y+size, -z); // v6

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // top face
      vertex1 = new Vertex( x+size, y+size, -z); // v5 
      vertex2 = new Vertex( x-size, y+size , -z); // v6
      vertex3 = new Vertex( x-size, y+size, z); // v1
      vertex4 = new Vertex( x-size, y+size, z); // v1
      vertex5 = new Vertex( x+size, y+size, z); // v0
      vertex6 = new Vertex( x+size, y+size, -z); // v5

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      // bottom face
      vertex1 = new Vertex( x+size, y-size, -z); // v4
      vertex2 = new Vertex( x-size, y-size , -z); // v7
      vertex3 = new Vertex( x-size, y-size, z); // v2
      vertex4 = new Vertex( x-size, y-size, z); // v2
      vertex5 = new Vertex( x+size, y-size, z); // v3
      vertex6 = new Vertex( x+size, y-size, -z); // v4
  
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
