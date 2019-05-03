/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class Vertex {
  constructor(x, y, z) {
      this.point = new Vector3([x, y, z]);

      var col = document.getElementById("changeColor").value;

      if(col == "Solid Color 😞" && initCube == false && loadedTexture == 0) {
          // Get color from sliders
          var r = document.getElementById("red").value/255;
          var g = document.getElementById("green").value/255;
          var b = document.getElementById("blue").value/255;        
      } 
      else if (col == "🌈 Rainbow 🌈" && initCube == false && loadedTexture == 0) {
          // Rainbow colors
          var r = Math.random();
          var g = Math.random();
          var b = Math.random();
      } 
      else if ( (document.getElementById("cube").innerHTML == "true" || initCube == true) && loadedTexture > 0) {
          // Only load textured cube with no color when loadedTexture > 0
          var r = 0.0;
          var g = 0.0;
          var b = 0.0;
      } 
      else {
          // Initial cube has no color 
          var r = 0.0;
          var g = 0.0;
          var b = 0.0; 
      }

      // Set color and texture coordinates
      this.color  = [r, g, b, 1.0];
      this.texCoord = [0.0, 0.0];

      // This class can be extended to support other attributes such as
      // normals and UV coordinates.
  }
}
