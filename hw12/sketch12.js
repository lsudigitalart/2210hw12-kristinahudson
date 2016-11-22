var mic;
var amp;

var scale = 1.0;

function setup() {
  createCanvas(500, 500);
  fill(255);
  ellipse(300, 300, 300);

  mic = new p5.AudioIn();
  mic.start();
  amp = new p5.Amplitude();
  amp.setInput(mic);
  sl = new SockLib("127.0.0.1", 9999);
  sl.sendmsg("sphere -n \"new_sphere\";")

}

function draw() {
  background(0);
  noStroke();
  fill(255);
  ellipse(150, 200, 400);

  scale = map(amp.getLevel(), 0, 1.0, 10, width);
  fill(0, 255, 0, 160);
  ellipse(100, 100, scale, scale);
  scaleMaya(scale, scale, scale);

  fill(255, 0, 0, 160)
  ellipse(300, 100, scale, scale);
  scaleMaya(scale, scale, scale);

  fill(0, 0, 255, 160)
  rect(200, 120, scale*4, scale*2, scale*4, scale*10);
  scaleMaya(scale, scale, scale, scale);




}

function scaleMaya(scale, scale) {
  sl.sendmsg("move -a -os -wd "+scale+" "+scale+" 0 \"new_sphere\";");
}
