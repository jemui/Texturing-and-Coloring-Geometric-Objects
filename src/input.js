var _inputHandler = null;
var triangle = true;
var down = false;

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
class InputHandler {
    /**
     * Initializes the event handeling functions within the program.
     */
    constructor(canvas, scene) {
      this.canvas = canvas;
      this.scene = scene;
      this.image = null;

      _inputHandler = this;

      // Mouse Events
      this.canvas.onmousedown = function(ev) { _inputHandler.click(ev) };
      this.canvas.onmousemove = function(ev) { _inputHandler.move(ev) };
      this.canvas.onmouseup = function(ev) { _inputHandler.release(ev) };

      // Button Events
      document.getElementById('fileLoad').onclick = function() { _inputHandler.readSelectedFile() };

      // Texture Events
      document.getElementById('texInput').onchange = function() { _inputHandler.readTexture()};

    }

    /**
     * Function called upon mouse click.
     */
    click(ev) {
        // Print x,y coordinates.
        console.log(ev.clientX, ev.clientY);

        var shape = new Triangle(shader);
        this.scene.addGeometry(shape);
    }

    /**
     * Function called to read a selected file.
     */
    readSelectedFile() {
        var fileReader = new FileReader();
        var objFile = document.getElementById("fileInput").files[0];

        if (!objFile) {
            alert("OBJ file not set!");
            return;
        }

        
        fileReader.readAsText(objFile);
        fileReader.onloadend = function() {
            console.log("texture: "+ _inputHandler.image);
            var customObj = new CustomOBJ(shader, fileReader.result);
            console.log(customObj);
            _inputHandler.scene.addGeometry(customObj);
        }
    }

    readTexture() {
        // Create the image object
        var image = new Image();
        if (!image) {
          console.log('Failed to create the image object');
          return false;
        }

        // Register the event handler to be called on loading an image
        image.onload = function() {
            _inputHandler.image = image;
        };

        var imgPath = document.getElementById("texInput").value;
        var imgPathSplit = imgPath.split("\\");

        // Tell the browser to load an image
        image.src = 'objs/' + imgPathSplit[imgPathSplit.length - 1];
        console.log("loaded "+ image.src);
        return true;
    }


    /**
     * Function called upon mouse click.
     * Draws a shape.
     */
    click(ev) {
        // Print x,y coordinates.
        console.log(ev.clientX, ev.clientY);

        down = true;

        // Passes in mouse position to shapes
        // each triangle should have its own function call to update itself
        if(triangle == true && document.getElementById("tri").innerHTML == "true") {
            var shape = new Triangle(shader,ev.clientX, ev.clientY,this.image);
            this.scene.addGeometry(shape);        
        } else if(document.getElementById("sqr").innerHTML == "true") {
            var shape = new Square(shader,ev.clientX, ev.clientY);
            this.scene.addGeometry(shape);
        } else if(document.getElementById("cir").innerHTML == "true"){
            var shape = new Circle(shader,ev.clientX, ev.clientY);
            this.scene.addGeometry(shape);
        } else if(document.getElementById("cube").innerHTML == "true"){
            var shape = new Cube(shader,ev.clientX, ev.clientY, this.image);
            this.scene.addGeometry(shape);
        }
    }

    /**
     * Function called upon mouse up.
     * Sets var (mouse) down to false. 
     */
    release(ev) {
        down = false;
    }

    /**
     * Function that draws shapes when mouse is down and moving
     */
     move(ev) {
        if(down == true) {
            if(triangle == true && document.getElementById("tri").innerHTML == "true") {
                var shape = new Triangle(shader,ev.clientX, ev.clientY);
                this.scene.addGeometry(shape);
            } else if(document.getElementById("sqr").innerHTML == "true") {
                var shape = new Square(shader,ev.clientX, ev.clientY);
                this.scene.addGeometry(shape);
            } else if(document.getElementById("cir").innerHTML == "true"){
                var shape = new Circle(shader,ev.clientX, ev.clientY);
                this.scene.addGeometry(shape);
            } else if(document.getElementById("cube").innerHTML == "true"){
                var shape = new Cube(shader,ev.clientX, ev.clientY);
                this.scene.addGeometry(shape);
            }
         }
     }
}

// Toggle the button between solid color and rainbow
function change() {
  document.getElementById("changeColor").addEventListener("click", changeColor);

  function changeColor() {
      var button = document.getElementById("changeColor");

      if (button.value=="Solid Color 😞") 
        button.value = "🌈 Rainbow 🌈";
      else 
        button.value = "Solid Color 😞";
  }
}

// Clear the canvas when the "Clear Canvas" button is pressed
function clear() {
  document.getElementById("clear").addEventListener("click", clearCanvas);

  function clearCanvas() {
    main();
  }
}

function shape() {
  // Event listeners for buttons
  document.getElementById("square").addEventListener("click", square);
  document.getElementById("triangle").addEventListener("click", triangle);
  document.getElementById("circle").addEventListener("click", circle);
  document.getElementById("tilted").addEventListener("click", cube);

  // Select square
  function square() {
    document.getElementById("sqr").innerHTML = "true";
    document.getElementById("tri").innerHTML = "false";
    document.getElementById("cir").innerHTML = "false";
    document.getElementById("cube").innerHTML = "false";
  }

  // Select triangle
  function triangle() {
    document.getElementById("sqr").innerHTML = "false";
    document.getElementById("tri").innerHTML = "true";
    document.getElementById("cir").innerHTML = "false";
    document.getElementById("cube").innerHTML = "false";
  }

  // Select circle
  function circle() {
    document.getElementById("sqr").innerHTML = "false";
    document.getElementById("tri").innerHTML = "false";
    document.getElementById("cir").innerHTML = "true";
    document.getElementById("cube").innerHTML = "false";
  }

  // Select Cube
  function cube() {
    document.getElementById("sqr").innerHTML = "false";
    document.getElementById("tri").innerHTML = "false";
    document.getElementById("cir").innerHTML = "false";
    document.getElementById("cube").innerHTML = "true";
  }
}