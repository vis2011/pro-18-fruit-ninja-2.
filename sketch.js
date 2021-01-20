var PLAY=1;
var End=0;
var gameState=PLAY;
var msg="swipe";

var sword,fruit,enemy,knifeSound,gameoverSound;

var swordImage,fruitImage,enemyImage,enemyImage1,
fruitImage1,fruitImage2,fruitImage3,fruitGroup,enemyGroup,gameOverImage,position;

var score=0;

function preload(){
  swordImage=loadImage("sword.png");
  fruitImage=loadImage("fruit1.png");
  fruitImage1=loadImage("fruit2.png");
  fruitImage2=loadImage("fruit3.png");
  fruitImage3=loadImage("fruit4.png");
  enemyImage=loadAnimation("alien1.png","alien2.png");
  knifeSound=loadSound("knifeSwooshSound.mp3");
  gameoverSound=loadSound("gameover.mp3");
  gameOverImage=loadImage("gameover.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  sword=createSprite(200,200,20,20);
  sword.addImage(swordImage);
  
  fruitGroup=new Group();
  enemyGroup=new Group();
  
  textAlign(CENTER);
  textSize(25);
  noStroke();
  
    // set options to prevent default behaviors for swipe, pinch, etc
    var options = { preventDefault: true};
  
   // document.body registers gestures anywhere on the page
  var hammer = new Hammer(document.body, options);
hammer.get('swipe').set({direction:Hammer.DIRECTION_ALL });
  
  hammer.on("swipe", swiped);


}

function draw(){
  background("lightblue");
  // background(250, 10, 100);
  
   text(msg, width / 2, height / 2);

  
  if(gameState===PLAY){
  sword.y=World.mouseY;
  sword.x=World.mouseX;
  Spawnfruit();
  Spawnenemy();
  }
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    knifeSound.play();
    score=score+1;
  }
  
  if(enemyGroup.isTouching(sword)){
    gameState=End;
    gameoverSound.play();
  }
  
  if(gameState==End){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    sword.addImage(gameOverImage);
    sword.velocityX=0;
    sword.velocityY=0;
    sword.y=width-400;
    sword.x=width-330;  
    sword.scale=1.5;
  }
    

  drawSprites();
  textSize(20);
  text("score :"+score,width-80,20);
}

function Spawnfruit(){
  if(frameCount%70===0){
    position=Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    fruit.velocityX=-3;
    fruit.y=Math.round(random(10,440));
    
    m=Math.round(random(1,4));
    switch(m){
      case 1:fruit.addImage(fruitImage);
              break;
      case 2:fruit.addImage(fruitImage1);
              break;
      case 3: fruit.addImage(fruitImage2);
              break;
      case 4: fruit.addImage(fruitImage3);
              break;
      default: break;
      
      
      
    }
    fruitGroup.add(fruit);
    
    
    if(position===1){
      fruit.x=width-50;
      fruit.velocityX=-(7+(score/4));
      fruit.lifetime=width- 60;
    }
    else
      if(position===2){
        fruit.x=0;
        fruit.velocityX=(7+score/4);
        fruit.lifetime=width-65;
      }
  }
}

function Spawnenemy(){
  if(frameCount%200===0){
  enemy=createSprite(width-50,200,20,20);
  enemy.y=Math.round(random(20,520));
  enemy.velocityX=-(3+score/10);
    
  m=Math.round(random(1,1));
  switch(m){
       case 1:enemy.addAnimation("alien",enemyImage);
              break;
      default:break;
  }
    enemy.lifetime=width-150;
    enemyGroup.add(enemy);
}
  
}

function swiped(event) {

  console.log(event);

  if (event.direction == 4) {

    msg = "you swiped right";

  } else if (event.direction == 8) {

    msg = "you swiped up";

  } else if (event.direction == 16) {

    msg = "you swiped down";

  } else if (event.direction == 2) {

    msg = "you swiped left";

  }

}