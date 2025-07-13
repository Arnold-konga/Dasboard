const router = require('express').Router();
const axios = require('axios');

const getTimestamp = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

router.route('/stkpush').post((req, res) => {
  const { phoneNumber, amount } = req.body;
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const timestamp = getTimestamp();
  const password = new Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

  axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    "BusinessShortCode": shortcode,
    "Password": password,
    "Timestamp": timestamp,
    "TransactionType": "CustomerPayBillOnline",
    "Amount": amount,
    "PartyA": phoneNumber,
    "PartyB": shortcode,
    "PhoneNumber": phoneNumber,
    "CallBackURL": "https://mydomain.com/mpesa/callback",
    "AccountReference": "Test",
    "TransactionDesc": "Test"
  }, {
    headers: {
      'Authorization': `Bearer ${req.token}`
    }
  })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      res.status(400).json('Error: ' + err);
    });
});

router.route('/callback').post((req, res) => {
  console.log('---M-PESA CALLBACK---');
  console.log(req.body);

  const { Body } = req.body;
  if (Body.stkCallback.ResultCode === 0) {
    // Success
    const mpesaReceiptNumber = Body.stkCallback.CallbackMetadata.Item.find(item => item.Name === 'MpesaReceiptNumber').Value;
    // Here you would typically find the pending order associated with this transaction and update its status
    // For now, we will just log the receipt number
    console.log(`M-Pesa receipt number: ${mpesaReceiptNumber}`);
  }

  res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
});

module.exports = router;
