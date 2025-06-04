const express = require('express');
const router = express.Router();
const { Users } =require('../models'); // Assuming you have a model defined in models/index.js
const bcrypt = require('bcryptjs');
const {validateToken} = require('../middlewares/AuthMiddleware') // Import your validation middleware if needed
const {sign} = require('jsonwebtoken'); 

router.post('/', async (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) =>{
        Users.create({
            username: username,
            password: hash
        }).then((user) => {
            res.json(user);
        }).catch((err) => {
            res.status(500).json({ error: err.message });
        });
    })
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    
    const user = await Users.findOne({ where: { username: username } });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    bcrypt.compare(password, user.password).then(async (Match) => {
        if (!Match) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const accessToken = sign({ id: user.id, username: user.username}, 'your_secret_key');
        res.json({
            accessToken: accessToken,
            username: user.username,
            id: user.id
        });
    })
});

router.get('/auth', validateToken, async (req, res) => {
    res.json(req.user); // Assuming req.user is set by validateToken middleware
})

router.get('/basicInfo/:id', async (req, res) => {
    const id = req.params.id;

    const basicInfo = await Users.findByPk(id, {
        attributes: {exclude: ['password']}// Adjust attributes as per your model
    });
    res.json(basicInfo);
})

router.put('/changepassword', validateToken, async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    const user = await Users.findOne({where: {username: req.user.username}});

    bcrypt.compare(oldPassword, user.password).then(async (Match) => {
        if (!Match) res.json({error: "Wrong Password"});

        bcrypt.hash(newPassword, 10).then((hash) => {
            Users.update({password: hash}, {where: {username: req.user.username}});
            res.json("Password Changed Successfully");
        }).catch((err) => {
            res.status(500).json({ error: err.message });
        });
  })
});

module.exports = router;