const morgan = require('morgan');

const morganMiddleware = (app) => {
  if (app.get('env') !== 'test') {
    app.use(morgan('dev'));
  }
  ;
};

module.exports = morganMiddleware;