export default function echo(...messages) {
  return function () {
    console.log(...messages);
  }
}
