const log4js = require('log4js');
log4js.configure({
    appenders: { fileLog: { type: 'file', filename: 'browser-agent.log' } },
    categories: { default: { appenders: ['fileLog'], level: 'info' } }
});


var dateFileLog = log4js.getLogger('fileLog');
exports.logger = dateFileLog;

exports.use = function (app) {
    //app.use(log4js.connectLogger(dateFileLog, {level:'INFO', format:':method :url'}));
    app.use(log4js.connectLogger(dateFileLog, {level: 'auto', format: ':method :url'}));
}

