const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Usa método POST.' });
    }

    const authHeader = req.headers.authorization;
    const MI_TOKEN_SECRETO = '123456'; // Esta es la clave/token que pondrás en tu APK

    if (authHeader !== `Bearer ${MI_TOKEN_SECRETO}`) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    const { to, subject, text, html } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'corinfarru@gmail.com',
            pass: 'Pichilov3$'
        }
    });

    try {
        await transporter.sendMail({ 
            from: 'corinfarru@gmail.com', 
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
