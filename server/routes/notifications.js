const router = require('express').Router();

// This is a mock implementation. In a real app, you would use a service like FCM.
const sendNotification = (token, title, body) => {
  console.log(`Sending notification to token ${token}`);
  console.log(`Title: ${title}`);
  console.log(`Body: ${body}`);
  // In a real app, you would make an API call to your push notification service here.
};

router.route('/send').post((req, res) => {
  const { token, title, body } = req.body;
  sendNotification(token, title, body);
  res.json('Notification sent!');
});

module.exports = router;
