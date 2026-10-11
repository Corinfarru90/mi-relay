const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const authHeader = req.headers.authorization;
  if (authHeader !== 'Bearer 123456') {
    return res.status(401).json({ error: 'Token inválido' });
  }

  const data = req.method === 'POST' ? req.body : req.query;
  const to = data.to || req.query.to;
  const subject = data.subject || req.query.subject;
  const text = data.text || req.query.text;
  const html = data.html || req.query.html;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'corinfarru@gmail.com',
      pass: 'uakeqzfgplpjfplq'
    }
  });

  try {
    await transporter.sendMail({
      from: '"Notificaciones App" <corinfarru@gmail.com>',
      replyTo: 'corinfarru@gmail.com',
      to,
      subject,
      text,
      html
    });
    return res.status(200).json({ success: true, message: 'Correo enviado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
