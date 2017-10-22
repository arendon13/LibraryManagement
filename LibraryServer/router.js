const Fetch = require('./controllers/fetch');
const Updates = require('./controllers/updates');
const Authentication = require('./controllers/auth');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app){
  app.get('/', Fetch.items);
  app.get('/ItemLogs/:id', Fetch.itemLogs);
  app.get('/Item/:id', Fetch.item);
  app.get('/ItemTypes', Fetch.itemTypes);
  app.post('/addItem', requireAuth, Updates.addItem);
  app.post('/checkOut/:id', requireAuth, Updates.checkOut);
  app.post('/return/:id', requireAuth, Updates.return);
  app.post('/addItemType', requireAuth, Updates.addItemType);
  app.post('/editItem/:id', requireAuth, Updates.editItem);
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireSignIn, Authentication.signin);
}
