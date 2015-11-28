import path from 'path';
import webpack from 'webpack';

export default {
  devtool: '#eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/reduxstagram.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: {
      request: 'browser-request'
    }
  },
  module: {
    loaders: [
    // Javascript
    {
      test: /\.js$/,
      loader: 'babel',
      include: path.join(__dirname, 'client'),
      query: {
        optional: ['runtime'],
        plugins: [
          'react-display-name',
          'react-transform'
        ],
        extra: {
          'react-transform': {
            'transforms': [{
              'transform': 'react-transform-hmr',
              'imports': ['react'],
              'locals': ['module']
            }]
          }
        }
      }
    },

    // CSS
    { 
      test: /\.styl$/, 
      include: path.join(__dirname, 'client'),
      loader: 'style-loader!css-loader!stylus-loader'
    }
    ]
  }
};
