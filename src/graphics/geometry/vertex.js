/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class Vertex {
  constructor(x, y, z) {
      this.point  = new Vector3([x, y, z]);
      
      var col = document.getElementById("changeColor").value;

      if(col == "Solid Color 😞") {
          // Get color from sliders
          var r = document.getElementById("red").value/255;
          var g = document.getElementById("green").value/255;
          var b = document.getElementById("blue").value/255;
      } else {
          // Rainbow colors
          var r = Math.random();
          var g = Math.random();
          var b = Math.random();
      }

      this.color  = [r, g, b, 1.0];

      // This class can be extended to support other attributes such as
      // normals and UV coordinates.
  }
}
