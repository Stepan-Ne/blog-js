# blog-js
Front: pure JS.
Back: firebase.

1. npm i -D webpack webpack-cli webpack-dev-server
2. webpack.config.js:
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        port: 3000
    }
}
3. package.json:
"scripts": {
    "start": "webpack-dev-server --mode development --open",
    "build": "webpack --mode production"
  },
  4. npm i -D 
  https://webpack.js.org/plugins/html-webpack-plugin/
5. add plugin to webpuck.config:
plugins: [
        new HTMLPlugin({
            template: './src/index.html'
        })
    ]
6. cleaning publick dir:
   add to plugins:  new CleanWebpackPlugin() 
7. https://www.muicss.com/docs/v1/example-layouts/blog
8. install loaders:
 module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },