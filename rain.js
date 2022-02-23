class Rain {
  constructor(width, height, direction, posX, posY, speed, color) {
    this.width = width;
    this.height = height;
    this.direction = direction;
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.color = color;
  }

  move() {
    this.posX += Math.sin((this.direction * Math.PI) / 2) * this.speed;
    this.posY += Math.cos((this.direction * Math.PI) / 2) * this.speed;
  }

  draw() {
    plumeContext.rotate(-this.direction);
    plumeContext.fillStyle = this.color;
    plumeContext.fillRect(this.posX, this.posY, this.width, this.height);
    plumeContext.rotate(+this.direction);
  }
}

let plume = document.getElementById("plume");
let plumeContext = plume.getContext("2d");

let createRect = (x, y, width, height, color) => {
  plumeContext.fillStyle = color;
  plumeContext.fillRect(x, y, width, height);
};

let Rains = [];
let defaultRainWidth = 2;
let defaultRainHeight = 15;
let maximumRainCount = 500;

let maxRain = 5;

let fps = 60;
let Loop = () => {
  setInterval(show, 1000 / fps);
};

let show = () => {
  update();
  draw();
};

let update = () => {
  plumeContext.clearRect(0, 0, plume.width, plume.height);
  let countRain = 0;
  while (Rains.length < maximumRainCount && maxRain > countRain) {
    let distanceFromCam = Math.random();
    let rain = new Rain(
      defaultRainWidth * (2 - distanceFromCam),
      defaultRainHeight * (2 - distanceFromCam),
      Math.random() / 20,
      Math.random() * plume.width,
      -100,
      (2 - distanceFromCam) * 8,
      "rgba(109, 193, 255," + (1 - distanceFromCam) + ")"
    );
    Rains.push(rain);
    countRain++;
  }

  for (let i = 0; i < Rains.length; i++) {
    Rains[i].move();
    if (Rains[i].posY > plume.height || Rains[i].posX > plume.width) {
      console.log(Rains[i].posY);
      Rains.splice(i, 1);
    }
  }
};

let draw = () => {
  Rains.forEach(rain => {
    rain.draw();
  });
};

Loop();
