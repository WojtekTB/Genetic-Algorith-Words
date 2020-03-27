class Element {
  constructor(fitnessFunction, charSet, maxLength, data) {
    this.data = [];
    this.randomizeData = () => {
      //randomly choose how long the string of data will be
      let randomDataLength = Math.floor(Math.random() * maxLength);
      //randomize the data that will be in the string based off of provided character set
      for (let i = 0; i < randomDataLength; i++) {
        this.data.push(Math.floor(Math.random() * charSet.length));
      }
    };
    //if no data was inputted, then randomize it, else just set it to a value that was provided
    if (data === undefined) {
      this.randomizeData();
    } else {
      this.data = data;
    }
    //charset like "abcdefghijklmnopqrstuvwxyz. "
    this.charSet = charSet;
    this.fitnessFunction = fitnessFunction;
    this.fitness = fitnessFunction(this);
  }

  getData() {
    return this.data;
  }

  getCharSet() {
    return this.charSet;
  }

  getDataElement(n) {
    if (n > this.data.length - 1) {
      return -1;
    }
    return this.data[n];
  }

  getFitness() {
    return this.fitness;
  }

  toString() {
    //returns the data of element but in word form
    let string = "";
    for (let i of this.data) {
      string += this.charSet[i];
    }
    return string;
  }

  mutate() {
    //change a random piece of data in the element to a new random value
    let dataLength = this.data.length;
    let charToChange = Math.floor(Math.random() * dataLength);
    this.data[charToChange] = Math.floor(Math.random() * this.charSet.length);
  }
  crossWith(element) {
    let partner = element;
    //randomly pick who's length you will use for the child

    /**
     * So I am afraid that if you don't let the data get longer it is possible
     * that the system will favour shorter strings and eventually
     * the whole population will become smaller and smaller?
     * One idea is on mutation to randomly add length?
     * but if the mutation doesn't happened fast enough in that case the
     * shortening of the data will outpase the mutation, and if mutation
     * happenes too often it will be harder to come to make actual progress?
     */

    let childDataLength =
      Math.random() > 0.5 ? partner.data.length : this.data.length;
    let childData = [];
    for (let i = 0; i < childDataLength; i++) {
      let dataFromPartner = Math.random() > 0.5 ? true : false;
      //assign which data you want to push to a child
      let dataA;
      let dataB;
      if (dataFromPartner) {
        dataA = partner.getDataElement(i);
        dataB = this.getDataElement(i);
      } else {
        dataA = this.getDataElement(i);
        dataB = partner.getDataElement(i);
      }
      //if data A doesn't exist, then use data B
      if (dataA === -1) {
        childData.push(dataB);
      } else {
        childData.push(dataA);
      }
    }
    return new Element(this.fitnessFunction, this.charSet, 0, childData);
  }
}
