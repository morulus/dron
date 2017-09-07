eventToChannel
==
```js
import { eventToChannel } from 'erector';
```

Create channel from listener. Read about [channel](../channel.md) to understand the channels in Erector.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| emitter | `EventEmitter` | Instance of EventEmitter | 
| event | `string` | event name | 
| mapArgsToVar | `function` | Map args to variable | 




```js
const myEvents = new Events();
const onChange = yield emitterToChannel(myEvents, 'change');
yield fork(function* () {
 while (yield onChange()) {
   yield echo('Changed');
 }
});
onChange.emit('change');
```

