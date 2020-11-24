//Create variables here
var dog,happyDog;
var database;
var food,foodStock;
var dogImage;
var  fedTime, lastFed;
var feed, addFood;
var  foodObj;

function preload()
{
  //load images here
  dogImage=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(250,250,20,20);
  dog.addImage(dogImage);
  dog.scale=0.1;

  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
}


function draw() {  
 background(46,139,87);

 foodObj.display();

 fill(255,255,254);
 textSize(15);
 if(lastFed >= 12){
   text("Last Feed : " + lastFed % 12 + "PM ", 350,30);
 }
 else if(lastFed == 0){
   text("Last Feed  : 12 AM", 350,30);
 }
 else{
   text("Last Feed : " + lastFed + " AM", 350,30);
 }
 
  
 textSize(20);
 stroke("red");
 text("Note:Press UP_ARROW to feed Drago milk",100,20);
  //add styles here

  drawSprites();

  fill(255,255,254);
   stroke("black");
    text("Food remaining : "+food,170,200);
    
    fedTime=database.ref('FeedTime');
    fedTime.on("value", function(data){
      lastFed=data.val();
    })

   
}

function readStock(data){
 food=data.val();
 foodObj.updateFoodStock(food);
}


function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    fedTime:hour(),
  })
}

function addFoods(){
  food++;
  database.ref('/').update({
    Food:food
  })
}




