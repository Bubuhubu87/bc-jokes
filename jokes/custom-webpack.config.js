const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'PROD_VAR': JSON.stringify(true),
      'STAGING_VAR': JSON.stringify(false)
    })
  ]
};