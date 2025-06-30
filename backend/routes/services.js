const router = require('express').Router();
const db = require('../db');

router.post('/', async (req, res) => {
  const { user_id, device_model, issue_description } = req.body;
  await db.query('INSERT INTO service_requests (user_id, device_model, issue_description) VALUES (?, ?, ?)', [user_id, device_model, issue_description]);
  res.json({ message: 'Service request submitted' });
});

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM service_requests');
  res.json(rows);
});

module.exports = router;
