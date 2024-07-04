const express = require("express");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");

const app = express();

// File Imports
const db = require("./db");
const User = require("./model/userModel");
const verifyToken = require("./utils/verifyUser");
// Midleware

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

cloudinary.config({
  cloud_name: "dq2xyb0xq",
  api_key: "948622883873169",
  api_secret: "FR4uJG6HWgsTgDkJGrINA7vFe4s",
});
app.use("/uploads", express.static(__dirname + "/uploads"));
// Port
const port = process.env.PORT || 8080;
// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Set the filename
  },
});
app.post("/register", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, Number(process.env.SALT));

    const userObj = {
      name,
      username,
      email,
      password: hashPassword,
    };

    const userDb = new User(userObj);
    userDb.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }

  res.status(200).json({ message: "User Registered successfully" });
  // console.log(username,email,password);

  // res.send("Welcom to register")
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userDb = await User.findOne({ username: username }).select(
      "+password"
    );

    if (!userDb) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, userDb.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: userDb._id, username: username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    const { password: hashPassword, ...rest } = userDb._doc;

    res.cookie("secret_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000), // 1 hour
      sameSite: "Strict", // Use "Strict" or "Lax" unless you have a specific reason for "None"
      secure: process.env.NODE_ENV === "production", // Ensure the cookie is only sent over HTTPS in production
    });

    return res
      .status(200)
      .json({ message: "User Login Successful", data: rest });
  } catch (error) {
    console.error("Login error:", error); // Improved error logging
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/logout", (req, res) => {
  return res.cookie("secret_token", "").json("ok");
});

app.get("/profile", (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return;
    res.json(token);
  } catch (error) {
    console.log(error);
  }
});

app.put("/update/:id", verifyToken, async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json('You can update only your account!');
  }
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, Number(process.env.SECRET_KEY));
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.userProfile,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
   console.log(error);
  }
});

app.delete("/delete/:id", verifyToken, async (req, res, next) => {
  const { secret_token } = req.cookies;
  const { id } = req.params;
  console.log(id);

  try {
    const verified = jwt.verify(secret_token, process.env.SECRET_KEY);

    if (verified.id !== id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await User.findByIdAndDelete(id);

    // Clear the token cookie
    res.clearCookie("secret_token", {
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
