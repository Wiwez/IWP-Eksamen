let array = ["Anders", "er", "en", "fucking", "køter"];

function averageArray(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i].length;
  }
  return sum / array.length;
}

console.log(averageArray(array));