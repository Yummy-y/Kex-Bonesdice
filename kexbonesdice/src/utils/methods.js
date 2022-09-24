export default {
  rand(min, max) {
    if (min > max) {
      var mid = min;
      min = max;
      max = mid;
    }
    //65<=Math.random()*26+65<26+65
    return parseInt(Math.random() * (max - min + 1) + min);
  }
}
