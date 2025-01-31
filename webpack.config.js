const path = require('path');
const htmlWebpackPlugin=require('html-webpack-plugin');
const miniCssExtractPlugin= require('mini-css-extract-plugin');

let webpackConfig= (env)=>{
  console.log("environment variables logged",env)
  return {
    entry:"./src/index", //entry point file
    output:{
      filename: "output.js", //default filename is main.js,
      path: path.resolve(__dirname,"dist"),
      clean:true // empty the dist folder before every new build
    },
    mode: env.production ? "production" : "development",
    devtool: env.production ? "source-map":"inline-source-map",
    devServer:{
      static:'./dist'
    },
    resolve:{
      extensions:['.ts','.js']
    },
    module:{
      rules:[
        {
          test:/\.ts$/,
          exclude:/node_modules/,
          use:'ts-loader'
        },
        {
          test:/\.scss$/,
          exclude:/node_modules/,
          use:[miniCssExtractPlugin.loader,"css-loader","sass-loader"], //executes from right to left
        },
        {
          test:/\.html$/,
          exclude:/node_modules/,
          use:'html-loader'
        },
        {
          test:/\.(png|gif|jpg|jpeg|svg|gif)$/,
          type:'asset/resource',
          generator:{
            filename:'images/[hash][name][ext]'
          }
        }
       
      ]
    },
    plugins:[
      new htmlWebpackPlugin({
        template:'./index.html'
      }),
      new miniCssExtractPlugin({filename:'output.css'})
    ]
  }
}

module.exports = webpackConfig;