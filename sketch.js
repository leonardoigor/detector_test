
let img
let detector;
let file
let input
let b = true
function preload () {
  const modelDetails = {
    model: 'model.json',
    metadata: 'model_meta.json',
    weights: 'model.weights.bin'
  };
  img = loadImage('./dog.jpg')
  detector = ml5.objectDetector('cocossd')
  input = createFileInput(handleFile);

}
function handleFile (e) {
  b = true
  console.log();
  img = createImg(e.data)
}
function goDetections (error, results) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(results);
    for (let i = 0; i < results.length; i++) {
      let obj = results[i];
      stroke(0, 255, 0)
      strokeWeight(4)
      noFill()
      rect(obj.x, obj.y, obj.width, obj.height)
      noStroke()
      fill(255);
      textSize(24);
      text(obj.label, obj.x, obj.y + 24)
    }
  }

}
function setup () {
  createCanvas(document.body.clientWidth, document.body.clientHeight);
  frameRate(1)

}

function draw () {
  if (b && img) {
    background(220);
    image(img, 0, 0,)
    detector.detect(img, goDetections)
    b = false
  }
}
