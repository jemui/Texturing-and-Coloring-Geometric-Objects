Assignment 3: Texturing and Coloring Geometric Objects 
Jeanette Mui
jemui@ucsc.edu

Texture Bugs for cubes
 * New textures replace old ones. 
 * New textures are created and textured, but old ones are ignored. 
 
Example order of selecting textures and drawing cubes.
    sky.jpg -> Draw Cube = Sky texture 
	cat.jpg -> Draw Cube = Replace all cubes with cat texture
	teapot.jpg -> Draw Cube  = Replace all cubes with teapot texture
	cat.jpg -> Draw Cube = New cube with teapot texture drawn
	sky.jpg -> Draw Cube = New cube with teapot texture drawn