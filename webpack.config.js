const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'To-Do App',
			filename: 'index.html',
			inject: 'body',
			template: './src/index.html',
		})
	],
	module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
			{
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
}