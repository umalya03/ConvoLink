import User from "../models/User.js"
import jwt from "jsonwebtoken"

export async function signup(req,res) {
    const {email,password,fullName} = req.body;

    try {
        
        if(!email || !password || !fullName){
            return res.status(400).json({ message: "All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({ message: "Password must have at least 6 characters"});
        }

        //check whether it is a correct email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: "Email already exists, Please use a different one." });
        }

        const idx = Math.floor(Math.random() * 100) + 1; //generate a number between 1 - 100 
        const randomAvatar = `https://robohash.org/${idx}?set=set2`;

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvatar
        })

        // TODO: create the user in stream as well

        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt",token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prevent XSS attacks
            sameSite:"strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({success:true, user:newUser})
    } catch (error) {
        console.log("Error in signup controller" , error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function login(req,res) {
    res.send("Login Route");
}

export function logout(req,res) {
    res.send("Logout Route");
}