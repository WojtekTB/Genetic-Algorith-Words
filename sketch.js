var maxPopulation = 1000;
var maxLength = 20;
var charSet = "abcdefghijklmnopqrstuvwxyz.  ";
var mutationRate = 0.01;
var fitnessFunction = function(element) {
  fitness = 0;
  for (let i = 0; i < wordToGuess.length; i++) {
    if (wordToGuess.charAt(i) === element.toString().charAt(i)) {
      fitness++;
    }
  }
  return fitness;
};

var wordToGuess = "to be or not to be.";

var myPopulation;

var myChart;

function updateParams() {
  maxPopulation = parseInt(document.getElementById("maxPopulation").value);
  maxLength = parseFloat(document.getElementById("maxLen").value);
  charSet = String(document.getElementById("charSet").value);
  wordToGuess = String(document.getElementById("word").value);
}

function begin() {
  setup();
  loop();
}

function setup() {
  noLoop();
  //   background(0);
  myPopulation = new Population(
    maxPopulation,
    maxLength,
    charSet,
    mutationRate,
    fitnessFunction
  );
  let bestElemLable = document.getElementById("settings");
  bestElemLable.innerHTML = `Max popilation: ${maxPopulation},\nMutation rate: ${mutationRate *
    100}%,\nPossible character set: "${charSet}"`;
  drawChart(myPopulation.fitnessHistory);
}

function draw() {
  myPopulation.makeMatingPool();
  myPopulation.makeNewGen();
  let curGenLable = document.getElementById("curElement");
  curGenLable.innerHTML = myPopulation.makeGenObject().datas;
  //   let pastGenLable = document.getElementById("pastElement");
  //   pastGenLable.innerHTML =
  //     myPopulation.history[myPopulation.history.length - 1].datas;
  let highestFitness = 0;
  let highestElement;
  let highestElementIndex = 0;
  for (let i = 0; i < myPopulation.population.length; i++) {
    if (myPopulation.population[i].fitness > highestFitness) {
      highestFitness = myPopulation.population[i].fitness;
      highestElement = myPopulation.population[i];
      highestElementIndex = i;
    }
    if (myPopulation.population[i].toString() === wordToGuess) {
      console.log("found match at element: " + i);
      noLoop();
    }
  }
  let bestElemLable = document.getElementById("bestElem");
  bestElemLable.innerHTML = highestElement.toString();
  let bestElemLableFitness = document.getElementById("bestElemFitness");
  bestElemLableFitness.innerHTML = highestFitness;
  let bestElemLableId = document.getElementById("bestElemId");
  bestElemLableId.innerHTML = highestElementIndex + 1;
  myChart.update();
}
