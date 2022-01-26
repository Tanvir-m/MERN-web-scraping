const router = require('express').Router();
const User = require('../models/Users');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// register
router.post('/register', async (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    //   checking user exist or not
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(500).json('Wrong credential');

    // if user exist decrypt the passwod
    const decPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    // compare user passwor and decrypt password are same or not
    decPassword !== req.body.password &&
      res.status(500).json('Wrong credential');
    const { password, ...others } = user._doc;

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '2h',
    });

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
