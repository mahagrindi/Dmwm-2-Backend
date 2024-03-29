const User = require("../models/user");
const crypto = require("crypto");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const emailjs = require("@emailjs/nodejs");
const { token } = require("morgan");
const ObjectId = require("mongodb").ObjectId;

exports.UserList = async (req, res) => {
  try {
    const users = await User.find({}).populate();
    res.send(users);
  } catch (err) {
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.findUserById = async (req, res) => {
  const id = req.params.id;
  let user = null;
  await User.findOne({ _id: id }).then(
    (res) => (user = res),
    (err) => console.log(err)
  );

  if (user) {
    console.log(user);
    return res.status(201).send(user);
  } else {
    return res.status(404).send("ID does not exist !!");
  }
};

exports.findUserByUsername = async (req, res) => {
  const username = req.params.username;
  let user = null;
  await User.findOne({ username: username }).then(
    (res) => (user = res),
    (err) => console.log(err)
  );

  if (user) {
    return res.status(201).send(user);
  } else {
    return res.status(404).send("username does not exist !!");
  }
};

// *************************
// ********* Inscription ***
// *************************
exports.userInscription = async (req, res) => {
  const { firstname, lastname, email, password, bio, liens, username } =
    req.body;
  const oldUser = await User.findOne({ email: req.body.email });
  console.log("old user", req.body.email);
  try {
    // check if user already exist
    // Validate if user exist in our database

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    } else {
      console.log("hello else");
      //Encrypt user password
      encryptedPassword = await bcrypt
        .hash(password, parseInt(process.env.SALT))
        .catch((error) => console.log(error));

      // Create user in our database
      // Split the email string at the "@" symbol
      const parts = email.split("@");

      const user = await User.create({
        firstname,
        lastname,
        email: email, // sanitize: convert email to lowercase
        password: encryptedPassword,
        bio,
        liens,
        username: parts[0],
      });

      // Create token
      const token = jwt.sign(
        { _id: user._id, email: email },
        process.env.ACCES_TOKEN_KEY
      );
      // save user token
      user.token = token;
      res.status(201).json(token);
      console.log(user.username);
    }
  } catch (err) {
    console.log(err);
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
  const user = await User.findOne({ email: req.body.email });
  user
    ? bcrypt
        .compare(password, user.password)
        .then(() => {
          let token = jwt.sign(
            { _id: user._id, email: email },
            process.env.ACCES_TOKEN_KEY
          );
          user.token = token;
          console.log(user._id);
          res.status(201).json(token);
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
    if (!req.body.email) {
      return res.status(404).send("Email is required");
    }
    //get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(409).send("User does not exist");
    }
    //generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `http://localhost:4200/#/reset/${resetToken}`;

    const my_html = `<html>        
     <body>
        <p>Hi ${user.name},</p>          
         <p>You recently requested to reset your password for your account. Click the button below to reset it:</p>         
           <a href="${resetURL}"><button style="background-color: #008CBA; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Reset Password</button></a>          
            <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>        
             </body>      
              </html>`;

    const serviceID = "service_0xkww3p";
    const templateID = "template_bqhwddo";
    const templateParams = {
      toemail: user.email,

      my_html: my_html,
    };
    emailjs
      .send(serviceID, templateID, templateParams, {
        publicKey: "Ct-Yh5Ac3p-Qn0UPd",
        privateKey: "0WSHgxStyUzB6IGlGxDh8", // optional, highly recommended for security reasons
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
      message: resetToken,
    });

    // console.log("{ reset token :", resetToken, "}","user.passwordResetToken", user.passwordResetToken);
  } catch (err) {
    res.status(500).send("An error occurred");
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    // Get the token from the URL
    const token = req.params.token;

    // Hash the token and find the user in the database
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // If no user is found, return an error response
    if (!user) {
      return res.status(400).json({ message: "Token invalid or expired" });
    }

    // Set the new password and remove the reset token and expiration time
    console.log("req body pass", req.body.password);
    user.password = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT)
    );
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    user.save();
    UEmail = user.email;
    // Create token
    const newtoken = jwt.sign(
      { _id: user._id, email: UEmail },
      process.env.ACCES_TOKEN_KEY
    );
    // save user token
    user.token = newtoken;
    // res.status(201).json(token);

    // Return a success message

    return res
      .status(200)
      .json({ message: "Password reset successfully", token: newtoken });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Password reset failed" });
  }
};

exports.userDelete = async (req, res) => {
  await User.findByIdAndRemove({ _id: req.body.id })
    .then((user) => {
      console.log(user);
      res.status(200).json({ message: "you deleted user" });
    })
    .catch((error) => {
      console.log(error);
    });
};
exports.ajouterAbonnes = async (req, res) => {
  try {
    const filter = { _id: req.body.id };
    const update = { $push: { following: { id: req.body.idprofile } } };
    await User.findOneAndUpdate(filter, update);
    const filter2 = { _id: req.body.idprofile };
    const update2 = { $push: { followers: { id: req.body.id } } };
    await User.findOneAndUpdate(filter2, update2);
    res.status(200).send({ message: "ok ! " });
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

exports.supprimerAbonnes = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.id });
    const userprofile = await User.findOne({ _id: req.body.idprofile });

    let followingIndex = -1;
    for (let i = 0; i < user.following.length; i++) {
      const objectId = new ObjectId(user.following[i].id);
      if (objectId.equals(userprofile._id)) {
        followingIndex = i;
        break;
      }
    }
    if (followingIndex !== -1) {
      user.following.splice(followingIndex, 1);
    }

    let followersIndex = -1;
    for (let i = 0; i < userprofile.followers.length; i++) {
      const objectId = new ObjectId(userprofile.followers[i].id);
      if (objectId.equals(user._id)) {
        followersIndex = i;
        break;
      }
    }
    if (followersIndex !== -1) {
      userprofile.followers.splice(followersIndex, 1);
    }

    const filter = { _id: req.body.id };
    const update = { following: user.following };
    await User.findOneAndUpdate(filter, update);

    const filter2 = { _id: req.body.idprofile };
    const update2 = { followers: userprofile.followers };
    await User.findOneAndUpdate(filter2, update2);

    res.status(200).send({ message: "ok!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
};
