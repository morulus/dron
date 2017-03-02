import { channel, cancel, echo } from 'erector';

export default function* () {
  const counter = yield channel(function* () {
    yield new Promise(resolve => setTimeout(
      () => resolve('tick'),
      1000,
    ));
  });
  let times = 0;
  while ( yield counter() ) {
    yield echo('tick');
    if (++times === 3 ) {
      yield cancel(counter);
    }
  }
  yield echo('done');
  // tick
  // tick
  // tick
  // done
}
