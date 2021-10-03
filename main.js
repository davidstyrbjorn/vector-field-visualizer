// NOTE: The rotation is by definition pointing in the z-direction!

const getVectorV1 = (i,j) => {
    return { 
      vec: createVector(j,i),
      divergence: 0, // 0 + 0
      rotation: 0, // 1 - 1
    };
}

const getVectorV2 = (i,j) => {
    return { 
      vec: createVector(-j,i),
      divergence: 0, // 0 + 0
      rotation: -2 // -1 - 1
    };
}

const getVectorV3 = (i,j) => {
    return { 
      vec: createVector(i,0) ,
      divergence: 1, // 1 + 0
      rotation: 0 // 0 - 0
    };
}

const getVectorV4 = (i,j) => {
    return { 
      vec: createVector(2,0),
      divergence: 0, // 0 + 0
      rotation: 0 // 0 - 0
    };
}

const functionList = [getVectorV1, getVectorV2, getVectorV3, getVectorV4];

let vectorFunc = functionList[0];

// Grid is quadratic going from -size to size in each direction
const size = 2;
const window_size = 800;

function setup() {
  let cnv = createCanvas(window_size, window_size);

  // Center the window
  var x = (windowWidth - window_size) / 2;
  var y = (windowHeight - window_size) / 2;
  cnv.position(x, y);
}

function keyPressed() {
  switch(keyCode){
    case 49:
      vectorFunc = functionList[0];
      break;
    case 50:
      vectorFunc = functionList[1];
      break;
    case 51:
      vectorFunc = functionList[2];
      break;
    case 52:
      vectorFunc = functionList[3];
      break;
  }
}

function draw() {
  background(0);

  const scaled_window = window_size * 0.8;
  const some_offset = 60;
  
  stroke(255,0,0,255);
  for(let x = -size; x <= size; x++){
    for(let y = -size; y <= size; y++){
      // Normalize our position to 0->window
      let distance = size*2;
      let offset_x = x+size;
      let offset_y = y+size;
      let normalized_x = offset_x/distance;
      let normalized_y = offset_y/distance;
    
      position = createVector(some_offset + normalized_x*scaled_window, some_offset +
                  normalized_y*scaled_window);
      
      // Draw point
      strokeWeight(8);
      stroke(255,0,0,255);
      point(position.x, position.y, 100);
      
      // Draw our vector
      obj = vectorFunc(x,y);
      let _vector = obj.vec;
      const length = _vector.mag();
      _vector.normalize();
      _vector.setMag(40);
      
      strokeWeight(length*1.5);
      stroke(0,255,0,255);
      line(position.x, position.y, position.x+_vector.x, position.y+_vector.y)
    }
  }
}
