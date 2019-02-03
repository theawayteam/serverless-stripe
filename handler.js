'use strict';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.createCharge = async (event, context) => {
  const requestBody = JSON.parse(event.body);
  const token = requestBody.token.id;
  const amount = requestBody.charge.amount;
  const currency = requestBody.charge.currency;
  const response = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  };

  // create charge
  try {
    const charge = await stripe.charges.create({
      amount,
      currency,
      description: 'The Away Team, LLC',
      source: token
    });
    // successful charge created
    response.statusCode = 200;
    response.body = JSON.stringify({
      message: 'Charge processed successfully',
      charge
    });
    return response;
  } catch(error) {
    response.statusCode = 500;
    response.body =JSON.stringify({
      error
    });
    
    return response;
  }
};
