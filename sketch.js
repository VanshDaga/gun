
var man,manImage;
var wall,wallImage;
var zombie,zombieImage;
var bullet,bulletImage;
var score;
var bulletGroup,zombieGroup;

function preload(){
  manImage = loadImage("./assets/man.png")
  wallImage = loadImage("./assets/wall.jpeg")
  bulletImage = loadImage("./assets/bullet.png")
  zombie1Image = loadAnimation("zombie2/zo1.png","zombie2/zo2.png","zombie2/zo3.png","zombie2/zo4.png","zombie2/zo5.png","zombie2/zo6.png")
  zombieImage = loadAnimation("./assets/zombie1/z1.png","./assets/zombie1/z2.png","./assets/zombie1/z3.png","./assets/zombie1/z5.png","./assets/zombie1/z6.png","./assets/zombie1/z7.png","./assets/zombie1/z8.png","./assets/zombie1/z9.png","./assets/zombie1/z10.png","./assets/zombie1/z11.png")
}


function setup(){
  createCanvas(windowWidth,windowHeight)
  man = createSprite(120,400)
  man.addImage(manImage)
  man.scale = 1.2
  bulletGroup = new Group();
  zombieGroup = new Group();

  score = 0;


  


  

}

function draw(){
  background(wallImage)

  spawnZombies()
  
  if (keyDown("space")){
    spawnBullets();
  }
  if (keyDown(UP_ARROW) && man.y>=100){
    man.y-=5
  }
  if (keyDown(DOWN_ARROW) && man.y<=height-100){
    man.y+=5
  }

  bulletGroup.isTouching(zombieGroup,killZombie)
  fill("black")
  textSize(40)
  text("score: "+ score, width/2,10);
  
  drawSprites()
}
function killZombie(B,Z){
  Z.destroy();
  B.destroy();
  score = score+5
  
}

function spawnZombies(){
  if(frameCount % 100===0){
    zombie = createSprite(width,random(100,height-100))
    zombie.addAnimation("first",zombieImage)
    zombie.addAnimation("second",zombie1Image)
    var rand = Math.round(random(1,2))
    switch(rand){
      case 1:zombie.changeAnimation("first");
      break;
      case 2:zombie.changeAnimation("second");
      break;
      default:break;
    }
    zombie.scale = 0.4
    zombie.velocityX = -2
    zombieGroup.add(zombie)
  }
}
function spawnBullets(){
  bullet = createSprite(man.x+20,man.y-30);
  bullet.addImage(bulletImage)
  bullet.velocityX = 2
  bullet.scale = 0.2
  bulletGroup.add(bullet)

}


