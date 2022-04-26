const G=6.6708*10**-11;
const sunM=1.98*10**30;
const scaleUa=15;
const ua=149597870;
var planetList=[];
function setup() {
  var canvas=createCanvas(windowWidth, windowHeight);
  canvas.parent('tab1');
  sun=new astre("Sun",1.98*10**30,createVector(0,0),createVector(0,0));
  mercure=new astre("Mercure",3.30*10**23,createVector(0,57909050),createVector(0,0));
  venus=new astre("Venus",4.86*10**24,createVector(0,108209500),createVector(0,0));
  earth=new astre("Earth",5.97*10**24,createVector(0,149597887),createVector(0,0));
  mars=new astre("Mars",6.41*10**23,createVector(0,227944000),createVector(0,0));
  jupiter=new astre("Jupiter",1.89*10**27,createVector(0,778340000),createVector(0,0));
  saturn=new astre("Saturn",5.68*10**26,createVector(0,1426700000),createVector(0,0));
  uranus=new astre("Uranus",8.68*10**25,createVector(0,2870700000),createVector(0,0));
  neptune=new astre("Neptune",42*10**24,createVector(0,4498400000),createVector(0,0));
  planetList.push(mercure,venus,earth,mars,jupiter,saturn,uranus,neptune);
  for(const planet of planetList){
    let planetVel=planet.pos.copy();
    planetVel.rotate(HALF_PI);
    planetVel.setMag(sqrt(G*sun.mass/planet.pos.mag()));
    planet.vel=planetVel;
  }
  
}

function draw() {
  background(0)
  translate(width/2,height/2);
  sun.show();
  for(const planet of planetList){
    sun.attract(planet);
    planet.updatePos();
    planet.show();
  }
}

function astre(name,mass,pos,vel){
  this.name=name;
  this.mass=mass
  this.pos=pos;
  this.vel=vel;
  this.path=[];
  this.show= function(){
    if(this.name=="Sun"){
      circle(0,0,10);
      fill("white");
      text(this.name,pos.x/ua*scaleUa,pos.y/ua*scaleUa)
    }
    else{
      circle(pos.x/ua*scaleUa,pos.y/ua*scaleUa,5);
      fill("white");
      text(this.name,pos.x/ua*scaleUa,pos.y/ua*scaleUa)
      for(let i=0;i<this.path.length-2;i++){
        strokeWeight(1);
        stroke(255);
        line(this.path[i].x/ua*scaleUa,this.path[i].y/ua*scaleUa,this.path[i+1].x/ua*scaleUa,this.path[i+1].y/ua*scaleUa);
        stroke(0);
      }
    }
  }
  this.updatePos=function(){
    this.pos.x+=this.vel.x;
    this.pos.y+=this.vel.y;
    this.path.push(this.pos.copy());
    if(this.path.length>100){
      this.path.shift();
    }
  }
  this.attract=function(planet){
    let d=dist(this.pos.x,this.pos.y,planet.pos.x,planet.pos.y);
    let vect=this.pos.copy().sub(planet.pos);
    vect.setMag((G*this.mass*planet.mass)/(d*d));
    planet.applyForce(vect);
  }
  this.applyForce=function(f){
    this.vel.x+=f.x/this.mass;
    this.vel.y+=f.y/this.mass;
  }
}
