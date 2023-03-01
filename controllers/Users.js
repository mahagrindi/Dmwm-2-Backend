const User = require("../models/user");
const crypto = require("crypto");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const emailjs = require("@emailjs/nodejs");

exports.UserList = async (req, res) => {
  try {
    const users = await User.find({}).populate();
    res.json({ users });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// *************************
// ********* Inscription ***
// *************************
exports.userInscription = async (req, res) => {
  try {
    const { firstname, lastname, email, password, bio } = req.body;
    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      bio,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.ACCES_TOKEN_KEY
    );
    // save user token
    user.token = token;
    res.status(201).json(token);
    // console.log("signup posted");
    // console.log("token", user.token);
  } catch (err) {
    res.status(401).send("signup failed");
  }
};

//*************************
// ********* Login ********
// *************************

exports.userLogin = async (req, res) => {
  // Our login logic starts here

  // Get user input
  const { email, password } = req.body;

  // Validate user input
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }
  // Validate if user exist in our database
  const user = await User.findOne({ email });
  user
    ? bcrypt
        .compare(password, user.password)
        .then(() => {
          let token = jwt.sign(
            { userId: User._id, email },
            process.env.ACCES_TOKEN_KEY
          );
          user.token = token;
          res.status(201).json(token);
          //   res.send({ token });
          //   console.log("successfully logged in");
        })
        .catch(() => res.status(401).send("Password failed"))
    : console.log("failll");
  // res.status(401).send("User not found");
};

//**********************************
// ********* reset password ********
// *********************************

exports.forgotPassword = async (req, res, next) => {
  try {
    //get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User does not exist");
    }
    //generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    //send it to user's email
    const resetURL = `http://${req.get(
      "host"
    )}/user/resetPassword/${resetToken}`;
    const message = `|Forgot your password ? \n submit a PATCH request with your new password and passwordConfirm tp : ${resetURL}\n
       If you didn't forget your password, please ignore this emai!`;

    const serviceID = "service_0xkww3p";
    const templateID = "template_bqhwddo";
    const templateParams = {
      toemail: user.email,
      message: message,
    };
    emailjs
      .send(serviceID, templateID, templateParams, {
        publicKey: "tQeJFsfqcE7hA5SLM",
        privateKey: "892d8OWjYQkGgtTcX3UXO", // optional, highly recommended for security reasons
      })
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
    // console.log("{ reset token :", resetToken, "}","user.passwordResetToken", user.passwordResetToken);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
};

exports.resetPassword = async (req, res, next) => {
  //get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  try {
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }, //verif if token didn't expired
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
  //if token has not expired, and there is  user, set the new user

  if (!user) {
    return res.status(400).send("Token invalid or expired");
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  //update changedPasswordAt property for the user

  //log the user in, send jwt

  const token = jwt.sign({ user_id: user._id }, process.env.ACCES_TOKEN_KEY);
  // save user token
  user.token = token;
  res.status(200).json({ status: "success", token });
};
