const container = document.getElementById("container");
let currentDateInSeconds = Math.floor(Date.now() / 1000);
console.log(currentDateInSeconds);

setInterval(SetAnimation, 1000);

function SetBkgOne() {
  container.style.animation = "bkgone 4s";
  container.style.animationFillMode = "forwards";
}

function SetBkgTwo() {
  container.style.animation = "bkgtwo 4s";
  container.style.animationFillMode = "forwards";
}

function SetBkgThree() {
  container.style.animation = "bkgthree 4s";
  container.style.animationFillMode = "forwards";
}

function SetBkgFour() {
  container.style.animation = "bkgfour 4s";
  container.style.animationFillMode = "forwards";
}

function SetAnimation() {
  currentDateInSeconds = Math.floor(Date.now() / 1000);

  if (currentDateInSeconds % 40 === 0) SetBkgOne();
  else if (currentDateInSeconds % 40 === 10) SetBkgTwo();
  else if (currentDateInSeconds % 40 === 20) SetBkgThree();
  else if (currentDateInSeconds % 40 === 30) SetBkgFour();
}

function SetEvents() {
  const itemOne = document.getElementById("itemOne");
  const itemTwo = document.getElementById("itemTwo");

  itemOne.addEventListener("click", function () {
    location.href = "http://127.0.0.1:5500/View/itemDetails.html?id=3";
  });
  itemTwo.addEventListener("click", function () {
    location.href = "http://127.0.0.1:5500/View/itemDetails.html?id=7";
  });
}

function Start() {
  if (currentDateInSeconds % 40 < 10) SetBkgOne();
  else if (currentDateInSeconds % 40 < 20) SetBkgTwo();
  else if (currentDateInSeconds % 40 < 30) SetBkgThree();
  else if (currentDateInSeconds % 40 < 40) SetBkgFour();
  SetEvents();
}

Start();
