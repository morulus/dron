export default function* transform(module, transformer) {
  return function(state) {
    let data = yield this.run(module);
    yield transformer(data);
  }
}
