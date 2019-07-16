const enforce = require('express-sslify');

const applyEnforceHttps = (app) => {
  if (app.get('env') !== 'test' && app.get('env') !== 'dev' ) {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
  }
  ;
};

module.exports = applyEnforceHttps;
