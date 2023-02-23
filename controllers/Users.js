const User = require("../models/user");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

exports.UserList = async(req, res) => {
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
exports.userInscription = async(req, res) => {
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
        const token = jwt.sign({ user_id: user._id, email },
            process.env.ACCES_TOKEN_KEY
        );
        // save user token
        user.token = token;
        res.status(201).json(token);
        console.log("signup posted");
        console.log("token", user.token);
    } catch (err) {
        console.log(err);
        console.log("signup failed");
        res.status(401).send("signup failed");
    }
};

//*************************
// ********* Login ********
// *************************

exports.userLogin = async(req, res) => {
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
        ?
        bcrypt
        .compare(password, user.password)
        .then(() => {
            let token = jwt.sign({ userId: User._id, email },
                process.env.ACCES_TOKEN_KEY
            );
            res.send({ token });
            console.log("successfully logged in");
        })
        .catch(() => res.status(401).send("Password failed")) :
        res.status(401).send("User not found");
};