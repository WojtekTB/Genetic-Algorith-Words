var maxPopulation = 100;
var maxLength = 10;
var charSet = "abcdefghijklmnopqrstuvwxyz. ";
var mutationRate = 0.01;
var fitnessFunction = function(element) {
  fitness = 0;
  //   console.log(element);
  for (let i = 0; i < wordToGuess.length; i++) {
    if (wordToGuess.charAt(i) === element.toString().charAt(i)) {
      fitness++;
    }
  }
  return fitness;
};

var wordToGuess = "to be or not to be.";

var myPopulation;

function setup() {
  let cnv = createCanvas(innerWidth, innerHeight);
  cnv.parent("mainCanvas");
  //   background(0);
  myPopulation = new Population(
    maxPopulation,
    maxLength,
    charSet,
    mutationRate,
    fitnessFunction
  );
}

function draw() {
  myPopulation.makeMatingPool();
  myPopulation.makeNewGen();
  let curGenLable = document.getElementById("curElement");
  curGenLable.innerHTML = myPopulation.makeGenObject().datas;
  let pastGenLable = document.getElementById("pastElement");
  pastGenLable.innerHTML =
    myPopulation.history[myPopulation.history.length - 1].datas;
  //   noLoop();
}
