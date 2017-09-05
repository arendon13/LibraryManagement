const Fetch = require('./controllers/fetch');
const Updates = require('./controllers/updates');

module.exports = function(app){
  app.get('/', Fetch.items);
  app.get('/ItemLogs/:id', Fetch.itemLogs);
  app.get('/Item/:id', Fetch.item);
  app.get('/ItemTypes', Fetch.itemTypes)
  app.post('/addItem', Updates.addItem);
  app.post('/checkOut/:id', Updates.checkOut);
  app.post('/return/:id', Updates.return);
  app.post('/addItemType', Updates.addItemType);
  app.post('/editItem/:id', Updates.editItem);
}
