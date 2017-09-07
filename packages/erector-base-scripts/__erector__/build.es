import { cliapp, echo, resolve } from 'erector';
import path from 'path';
import pretransform from '../../erector-pretransform';

export default cliapp({
  description: 'Build bundle',
  help: `Usage: erector build`,
  getInitialState(args) {
    return {
      watch: !!args.watch,
    };
  },
  worker: function* ({ watch }) {
    const src = yield resolve(path.join(__dirname,'./src/**/*.js'));
    const dist = yield resolve('./');
    const channel = yield pretransform(src, dist, {
      ignoreInitial: false,
      watch,
    });
    let stats;
    while(stats = yield channel) {
      yield echo.ok(`Build complete in ${stats.ms} ms.`);
    }
    return false;
  }
})
