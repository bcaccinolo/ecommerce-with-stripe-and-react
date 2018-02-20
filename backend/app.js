const pjson = require('./package.json');
const express = require('express');
const app = express();
const port = 4000;

var stripe = require("stripe")(pjson.stripeSecretKey);


app.get('/api', function(req, res){
  console.log(req.query);
  const cardToken = req.query.token;
  const amount = req.query.amount;
  // Charge the user's card:
  stripe.charges.create({
    amount: amount,
    currency: 'usd',
    description: 'Example charge',
    source: cardToken,
  }, (err, charge) => {
    console.log(charge);

    if (err) {
      const message = err.type + ' : ' + err.message;
      res.json({ok: false, message: message});
    } else {
      res.json({ok: true, message: 'success'});
    }
  });
});

app.listen(port)
console.log('Web server listening on port http://localhost:' + port)
