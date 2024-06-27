const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error.js");
//const asyncHandler = require(express-async-handler)


const createUser = asyncHandler(async (req, res, next) => {
  try {
    const isExisting = await User.findOne({ whatsapp: req.body.whatsapp });
    if (isExisting) return next(errorHandler(404, "number already exists!"));
    //   {
    //   throw new Error("User already registered");
    // }

    const isExistingUser = await User.findOne({ username: req.body.username });
    if (isExistingUser) return next(errorHandler(404, "UserName already exists!"));
    //   {
    //   throw new Error("UserName already exists");
    // }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let newUser = {
     ...req.body,
      password: hashedPassword,
    };

    if (req.body.referrer) {
      const existingReferrer = await User.findOne({ username: req.body.referrer });
      if (!existingReferrer)  return next(errorHandler(404, "Invalid referral code!"));
      // {
      //   throw new Error("Invalid referral code");
      // }

      const referrerToUpdate = await User.findOne({ _id: existingReferrer._id });


      referrerToUpdate.points += 50;
  referrerToUpdate.referrals += 1;
      newUser.referrer = existingReferrer;
      await referrerToUpdate.save();

    }

    const createdUser = await User.create(newUser);

    const { password,...others } = createdUser._doc;
    const token = jwt.sign(
      { id: createdUser._id, role: createdUser.role, campus: createdUser.campus },
      process.env.JWT_SECRET,
      { expiresIn: "168h" }
    );

    return res
     .status(201)
     .json({ others, token, message: "user created successfully" });
  } catch (error) {
    next(error);
  }
});


// //register
// const createUser = asyncHandler(async (req, res, next) => {
//   try {

//     //check if 
//     const isExisting = await User.findOne({ phone: req.body.phone });
//     if (isExisting) {
//       throw new Error("User already registered");
//     }

//     const isExistingUser = await User.findOne({ username: req.body.username });
//     if (isExistingUser) {
//       throw new Error("UserName already exists");
//     }

//     //hash the password
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     //cretae thr user
//     const newUser = await User.create({
//       ...req.body,
//       password: hashedPassword,
//     });
//     const { password, ...others } = newUser._doc;
//     const token = jwt.sign(
//       { id: newUser._id, role: newUser.role, campus: newUser.campus },
//       process.env.JWT_SECRET,
//       { expiresIn: "168h" }
//     );
//     console.log(newUser);
//     return res
//       .status(201)
//       .json({ others, token, message: "user created successfully" });
//   } catch (error) {
//     next(error);
//     // return res.status(500).json(error.message)
//     //console.error(error)
//   }
// });



//login


const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }); // Use UserModel, not User
    if (!user) return next(errorHandler(404, "User not found!")); //{
    //       throw new Error('User email not found!')
    // }

    const comparePass = await bcrypt.compare(req.body.password, user.password);

    if (!comparePass)
      return next(errorHandler(404, "Incorrect username or password!")); //{
    //   throw new Error('Incorrect password');
    // }

    const token = jwt.sign(
      { id: user._id, campus: user.campus },
      process.env.JWT_SECRET,
      { expiresIn: "168h" }
    );
    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(others);
    // return res.status(200).json({ ...others, token });
  } catch (error) {
    next(error);
    // return res.status(500).json(error.message)
    //console.error(error)
  }
});




//sign out functionality
const signOut = asyncHandler(async(req, res) => {
  try {
    res.clearCookie('access_token')
    res.status(200).json('You have logged out successfully!')
  } catch (error) {
    next(error);
  }
})




// //google auth controller
// const google = asyncHandler(async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       //if user exist, then log him in
//       const token = jwt.sign(
//         { id: user._id, role: user.role, campus: user.campus },
//         process.env.JWT_SECRET,
//         { expiresIn: "168h" }
//       );
//       const { password, ...others } = user._doc;
//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(others);
//     } else {
//       //if user doesnt exist, then create acc for him
//       const generatedPassword = Math.random().toString(36).slice(-8);

//       //hashing the password
//       const hashedPassword = await bcrypt.hash(generatedPassword, 10);

//       //save the user 
//       const newUser = new User({
//         username:
//           req.body.name.split(" ").join("").toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         email: req.body.email,
//         password: hashedPassword,
//         profileimage: req.body.profileimage,
//         // role: "PT",
//         // campus: "UNEC",
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//         expiresIn: "4h",
//       });

//       //separate the passor from the rsponse
//       const { password: pass, ...rest } = newUser._doc;
//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// });


module.exports = {
  createUser,
  loginUser,
  // google,
  signOut
};



