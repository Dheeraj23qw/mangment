import bcrypt from "bcryptjs";
import User from "../model/user.model.js";


export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!password || password.trim() === "") {
      return res.status(400).json({ message: "Password is required for registration" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    const createdUser = new User({
      fullname,
      email,
      password: hashPassword,
      authSource: "local", 
    });

    await createdUser.save();
    
    res.status(201).json({
      message: "User Created Successfully",
      user: {
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Safety: If user has NO password, they must use their Social Provider
    if (!user.password || user.authSource !== "local") {
      return res.status(400).json({ 
        message: `This account uses ${user.authSource || 'social'} login. Please use that method instead.` 
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        authSource: user.authSource 
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const socialLogin = async (req, res) => {
  try {
    const { fullname, email, firebaseUid, profilePic, authSource } = req.body;

    // 1. Find user by Firebase ID or Email
    let user = await User.findOne({ 
      $or: [{ firebaseUid: firebaseUid }, { email: email }] 
    });

    if (user) {
      let isUpdated = false;

      // Update Firebase UID if they were a local user before
      if (!user.firebaseUid) {
        user.firebaseUid = firebaseUid;
        user.authSource = authSource; 
        isUpdated = true;
      }

      // Keep profile picture synced
      if (profilePic && user.profilePic !== profilePic) {
        user.profilePic = profilePic;
        isUpdated = true;
      }

      if (isUpdated) await user.save();

      return res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          profilePic: user.profilePic
        }
      });
    }

    const newUser = new User({
      fullname,
      email,
      firebaseUid,
      profilePic,
      authSource,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered via Social Login",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic
      }
    });

  } catch (error) {
    console.error("Social Login Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};