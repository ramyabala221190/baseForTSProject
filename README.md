For AutoPrefixer,

Install the below dev dependencies
npm install --save-dev postcss postcss-loader postcss-preset-env

We will create a webpack.config.2.js in the root of the project which is the exact replica of webpack.config.1.js.

We will make a small change in the module.rules key. 
Update FROM
{
test:/\.scss$/,
exclude:/node_modules/,
use:[miniCssExtractPlugin.loader,"css-loader","sass-loader"], //executes from right to left
},

TO

{
test:/\.scss$/,
exclude:/node_modules/,
use:[miniCssExtractPlugin.loader,"css-loader","sass-loader",
{
loader:"postcss-loader",
options:{
postcssOptions:{
plugins:[
["postcss-preset-env",{}]
]
}
}}], //executes from right to left
}


Add commands in package.json
"build-2":"webpack --env production --config webpack.config.2.js",
"start-2": "webpack serve --config webpack.config.2.js"