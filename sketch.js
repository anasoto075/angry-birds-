const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg;
var chain;
var platform;

var gameState = "onSling";
var score = 0;

var bg = ("Sprites/bg.png");
function preload() {
    getBackgroundImg();
    backgroundImg = loadImage("Sprites/bg.png");
    pig2IMG = loadImage("Sprites/enemy2.png");
    pig1IMG = loadImage("Sprites/enemy.png");
    pig3IMG = loadImage("Sprites/enemy2.png");

}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    
    ground = new Ground(600,height,1200,20);

    platform = new Ground(150,305,300,170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(pig1IMG,810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(pig3IMG, 810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    box7 = new Box(400,240,70,70);
    box6 = new Box(620,240,70,70);
    pig2 = new Pig(pig2IMG,510, 350);

    bird = new Bird(200,50);
    slingShot = new SlingShot(bird.body,{x:200,y:50})
    
    
}

function draw(){
    background(backgroundImg);
    textSize(30);
    text("Score: "+ score,width-300,50);
    Engine.update(engine);
    console.log(box2.body.position.x);
    console.log(box2.body.position.y);
    console.log(box2.body.angle);
    box1.display();
    box2.display();
    ground.display();
    platform.display();
    pig1.display();
    pig1.score();
    log1.display();
    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    box6.display();
    box7.display();
    pig2.display();
    pig2.score();
    log4.display();
    log5.display();

    bird.display();
    
    slingShot.display();
}
function mouseDragged(){
    if (gameState !== "launched"){
        Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY})
    }
}
function mouseReleased(){
    slingShot.fly();
    gameState = "launched"; 
}

async function getBackgroundImg() {
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Tokio");
  var responseJSON = await response.json();
  var datetime =  responseJSON.datetime;
  var hour = datetime.slice(11-13);

  if (hour>=6 && hour<=19){
    bg = ("Sprites/bg.png"); 
  }else {
      bg = ("Sprites/bg2.jpg");
  }
  backgroundImg= loadImage(bg);
  console.log(backgroundImg);
}
function keyPressed (){
    if (keyCode == 32){
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body,{x:200,y:50})
        slingShot.attach(bird.body);
        gameState = "onSling";
    }
}