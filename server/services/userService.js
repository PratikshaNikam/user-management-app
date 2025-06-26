const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async ({ name, email, password }) => {
  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { status: 400, data: { msg: 'User already exists' } };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return { status: 201, data: { msg: 'User registered successfully' } };
  } catch (error) {
    return { status: 500, data: { msg: 'Server error', error: error.message } };
  }
};




// Existing registerUser remains here...

exports.loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { status: 400, data: { msg: 'Invalid email or password' } };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 400, data: { msg: 'Invalid email or password' } };
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );   //jwt.sign(payload, secret, options)
    //console.log('Token generated:', token);

    return {
      status: 200,
      data: {
        msg: 'Login successful',
        token,
      },
    };
  } catch (error) {
    return { status: 500, data: { msg: 'Server error', error: error.message } };
  }
};

