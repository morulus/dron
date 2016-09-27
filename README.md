Dron is a fast, furious & minimalist tool, which does a routine for you.

# Install CLI
```terminal
npm i dron-cli -g
```

# Using automation
Modules of Dron is a mini programs, which can do some job for you. It can generate scaffold for your application or adds to your existing application some necessary files.

Before usage modules you should install it globally:

```terminal
npm i dron-webpack-babel-postcss-jsx -g
```

For example, when i need to add the Webpack to my application's folder, I prefer to use Dron, because, without it, to deploy Webpack bundler in my app folder, i should:

1. Install Webpack itself.
2. Install babel, babel-plugin-es2015, babel-postcss, autoprefixer, postcss-nested and many other required packages.
2. Creates webpack.config.js and configurate it.
3. Make sure that it works correctly.

In the particular case I find it easier to copy the code from another application. Instead, I wrote a module that does that job for me and now, when I need to add the Webpack bundler to my application folder, all I need to do is run command in terminal:

```terminal
dron webpack-babel-postcss-jsx
```

## Creating modules

The modules of Dron - it is just a functions. If you need to create your own automation, you should to create a function, which perform that automation. Then, put your function into the shape of npm package and name it with prefix `dron-`;

For example, we need an automation module which increase minor version of your package. It will be something like that:
```js
function increaseMinorVersion() {
  var packageJson = require('./package.json');
  packageJson.version = packageJson.version.split('.').map(function(v, index) { return index===1 ? parseInt(v)+1 : v; }).join('.');
  fs.writeFileSync(require.resolve('./package.json'), JSON.stringify(packageJson, null, 2), 'utf-8');
}
```

Now, when we have function `increaseMinorVersion`, we can make it executable by Dron CLI. To do that we should to create a directory next to our project and to name it `dron-increase-package-minor-version`. Run `npm init`, create `index.js` containing lovely function, but with little refactoring:

```js
function increaseMinorVersion() {
  var packageJson = this.touch('./package.json');
  packageJson.version = packageJson.version.split('.').map(function(v, index) { return index===1 ? parseInt(v)+1 : v; }).join('.');
  fs.writeFileSync(require.resolve('./package.json'), JSON.stringify(packageJson, null, 2), 'utf-8');
  return true;
}

module.exports = function increaseMinorVersionFactoy() {
  return increaseMinorVersion;
}
```
Last thing - run command in terminal `npm link` in order to make package global.
Now you can increase version of your application by short command in terminal:

```terminal
dron increase-package-minor-version
```

Oh. I almost forget: it will be not bed idea to commit changes. Let's add some code to our `index.js`.

```js
function increaseMinorVersion() {
  var packageJson = this.touch('./package.json');
  packageJson.version = packageJson.version.split('.').map(function(v, index) { return index===1 ? parseInt(v)+1 : v; }).join('.');
  fs.writeFileSync(require.resolve('./package.json'), JSON.stringify(packageJson, null, 2), 'utf-8');
  return packageJson.version;
}

module.exports = function increaseMinorVersionFactoy() {
  return function() {
    return this.run(increaseMinorVersion)
    .then(function(version) {
      return this.run('gitcommit', {
        message: 'Minor release '+version
      });
    });
  }
}
```
We just call the embedded module `dron-gitcommit` after executing out function to complete our task. That's it.

## Real magic

The real magic is that modules can invoke each other without any import handling.

For example, we need to have another module which can to push our commits to the repository. We do not need to require or some way copy our last module for creating new module. All we need is just run our module `increase-package-minor-version` from new automation package.

```js
module.export = function increateAndPushFactory() {
  return function increateAndPush() {
    return this.run('increase-package-minor-version')
    .then(function() {
      return this.run('gitpush');
    });
  }
}
```
Thus, the modules may overlap and even perform recursion.

# Alfa version
This project is very young. It may be unstable and it is still lower than the version 1.x.x. Use it at your own risk.

# Author and contribution
Idea and performance: Vladimir Kalmykov <luciusmorulus@gmail.com>

DronJs is my solo project. One man not army, so I will be inspired by any help in the project's development. You can write me to e-mail [email](luciusmorulus@gmail.com) with proposal for contribution.

# License
Under MIT License.
