export default function pause(delay = 0) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay);
  });
}
