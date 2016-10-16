var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var postcssimport = require('postcss-import');
var autoprefixer = require('autoprefixer')({browsers: ['> 1%','ie >= 9']});
var postcssnested = require('postcss-nested');
var postcsssimplevars = require('postcss-simple-vars');
module.exports = {
	entry: {
		dronpage: './src/dronpage.js'
	},
	output: {
		path: path.resolve("./dist"),
		filename: '[name].js',
		libraryTarget: 'this',
		library: 'dron'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: "style!css!postcss"//ExtractTextPlugin.extract("style","css!postcss")
			},
			{
				test: /\.js[x]?$/,
				loader: 'babel-loader',
				query: {
					compact: false,
					presets: [
						require.resolve('babel-preset-es2015'),
						require.resolve('babel-preset-stage-0'),
						require.resolve('babel-preset-stage-1'),
						require.resolve('babel-preset-stage-2'),
						require.resolve('babel-preset-stage-3')
					],
					plugins: [
						require.resolve('babel-plugin-transform-react-jsx'),
						require.resolve('babel-plugin-add-module-exports')
					]
				},
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		root: path.resolve(__dirname, './src')
	},
	plugins: [
		//new ExtractTextPlugin("[name].css")
	],
	extensions: [],
	postcss: function postcssPlugins() { return [postcssimport, postcsssimplevars, autoprefixer, postcssnested]; }
};
