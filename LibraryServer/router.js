const Fetch = require('./controllers/fetch');

module.exports = function(app){
  app.get('/', Fetch.items);
  app.get('/ItemLogs/:id', Fetch.itemLogs);
}
