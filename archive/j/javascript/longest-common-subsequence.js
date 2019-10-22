'use strict'

class LongestCommonSubsequence {

  constructor() {
    this.map = new Map();
    this.recursiveCount = 0;
    this.topDownCount = 0;
  }

  getLCS(input1, input2) {
    let result = this.findLCSRecursive(input1, input2);
    result = this.findLCSTopDown(input1, input2);
    console.log(`${JSON.stringify(Array.from(result).reduce((acc,item) => acc + ", " + item))}`);
    console.log(`Recursive - ${this.recursiveCount}, TopDown - ${this.topDownCount}`);
  }

  findLCSRecursive(input1, input2, pos1=0, pos2=0) {
    this.recursiveCount++;
    if(pos1 >= input1.length || pos2 >= input2.length) return new Set();
    let moveBoth = new Set(), movePos1 = new Set(), movePos2 = new Set();
    if(input1[pos1] === input2[pos2]) {
      let next = this.findLCSRecursive(input1, input2, pos1+1, pos2+1);
      let current = new Set([input1[pos1]]);
      moveBoth = new Set([...current, ...next]);
    } else {
      movePos1 = this.findLCSRecursive(input1, input2, pos1+1, pos2);
      movePos2 = this.findLCSRecursive(input1, input2, pos1, pos2+1);
    }
    let result = new Set([...moveBoth, ...movePos1, ...movePos2]);
    return result;
  }

  findLCSTopDown(input1, input2, pos1=0, pos2=0) {
    if(this.map.has(this.getKey(pos1,pos2))) return this.map.get(this.getKey(pos1, pos2));
    this.topDownCount++;
    if(pos1 >= input1.length || pos2 >= input2.length) return new Set();
    let moveBoth = new Set(), movePos1 = new Set(), movePos2 = new Set();
    if(input1[pos1] === input2[pos2]) {
      let next = this.findLCSTopDown(input1, input2, pos1+1, pos2+1);
      let current = new Set([input1[pos1]]);
      moveBoth = new Set([...current, ...next]);
    } else {
      movePos1 = this.findLCSTopDown(input1, input2, pos1+1, pos2);
      movePos2 = this.findLCSTopDown(input1, input2, pos1, pos2+1);
    }
    let result = new Set([...moveBoth, ...movePos1, ...movePos2]);
    this.map.set(this.getKey(pos1, pos2), result);
    return result;
  }

  getKey(pos1, pos2) {
    return pos1 + '-' + pos2;
  }
}

const DELIMITER = ", ";
const noInputException = () => 'Usage: please provide two lists in the format "1, 2, 3, 4, 5"';
const main = (input1, input2) => {
  try {
    if(!input1 || !input2) throw noInputException();
    const arr1 = input1.split(DELIMITER);
    const arr2 = input2.split(DELIMITER);
    if(!arr1.length || !arr2.length) throw noInputException();
    const lcs = new LongestCommonSubsequence();
    lcs.getLCS(arr1, arr2);
    process.exit(0);
  } catch(e) {
    console.log(e);
    process.exit(1);
  }
}

// main("1, 4, 5, 3, 15, 6","1, 7, 4, 5, 11, 6")
main(process.argv[2], process.argv[3])