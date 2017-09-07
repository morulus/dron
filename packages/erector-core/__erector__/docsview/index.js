import gmr from "github-markdown-render";
import path from 'path';
import {
  createChannel,
  callback,
  echo,
  fork,
  spawn,
  resolve,
  readFile,
  isDirectory,
  getState,
  ejs,
  assignState,
} from 'erector';
var express = require('express');
const PORT = 1337;

function* renderPage(content) {
  const { layout } = yield getState();
  yield ejs(layout, {
    content,
  });
}

function* resolveTarget(target) {
  const content = yield readFile(target);
  switch (path.extname(target)) {
    case '.md':
      const html = yield gmr(content);
      yield html;
    break;
    default:
      yield content;
    break;
  }
}

function observeGet(getChannel) {
  return function* () {
    let next;
    while (next = yield getChannel) {
      let target;
      const [ req, res ] = next;
      if (req.url === '/') {
        target = yield resolve(`./readme.md`);
      } else {
        const p = yield resolve(`.${req.url}`);
        if (yield isDirectory(p)) {
          const files = yield readDir(p);
          res.send(files.join(', '));
        } else {
          target = p;
        }
      }
      if (target) {
        const content = yield resolveTarget(target);
        yield echo.note(`Page ${req.url} rendered in`, new Date().getTime() - global.start, 'ms');
        const html = yield renderPage(content);
        res.send(html);
      }
    }
  }
}

function observeAssets(getAssets) {
  return function* () {
    let next;
    while (next = yield getAssets) {
      const [ req, res ] = next;
      const content = yield readFile(resolve.module(`.${req.url}`));
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(content);
      res.end();
    }
  }
}

export default function* () {
  const app = express();
  // Observe get channel
  const getAssets = yield createChannel(function(next) {
    app.get('/assets/*', function(req, res) {
      next([req, res]);
    });
  });
  // Observe get all
  const getChannel = yield createChannel(function(next) {
    app.get('/*', function (req, res) {
      global.start = new Date().getTime();
      next([req, res]);
    })
  });
  // Get layout
  yield assignState(readFile(resolve.module('./layouts/index.html')), (layout) => ({
    layout,
  }));

  yield fork(observeGet(getChannel));
  yield fork(observeAssets(getAssets));

  yield callback([app, app.listen], PORT);
  yield echo.success(`Example app listening on port ${PORT}!`);
  yield spawn('open', [`http://localhost:${PORT}`]);
}
