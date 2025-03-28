export const images = {
  1: require("../assets/images/1.png"),
  2: require("../assets/images/2.png"),
  3: require("../assets/images/3.png"),
  4: require("../assets/images/4.png"),
  5: require("../assets/images/5.png"),
  6: require("../assets/images/6.png"),
  7: require("../assets/images/7.png"),
  8: require("../assets/images/8.png"),
  9: require("../assets/images/9.png"),
  10: require("../assets/images/10.png"),
  11: require("../assets/images/11.png"),
  12: require("../assets/images/12.png"),
};

export function getRandomImage() {
  let min = 1;
  let max = 12;
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  return images[random];
}

export function getRandomImageNumber() {
  let min = 1;
  let max = 12;
  let random = Math.floor(Math.random() * (max - min + 1)) + min;

  return random;
}
