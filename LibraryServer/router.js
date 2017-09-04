const Fetch = require('./controllers/fetch');
const Updates = require('./controllers/updates');

module.exports = function(app){
  app.get('/', Fetch.items);
  app.get('/ItemLogs/:id', Fetch.itemLogs);
  // TODO: Create Add Item, Add Item Log (Check out), and Edit Item POST methods
  app.post('/addItem', Updates.addItem);
}
