import User from "../models/user.model.js";

const createUser = async (req, res) => {
  const { email, name, profilePic, userId, location } = req.body;


  try {
    const existingUser = await User.findOne({ userId });
    if(existingUser){
        return res.status(200).json({msg:"User already Exists",user:existingUser})
    }

    const newUser = await User.create({
        userId,
        name,
        profilePic,
        email,
        location:location
    })
    res.status(200).json({msg:"User Created Sucessfully",user:newUser})
   
  } 
  catch (e) {
    res.status(400).json({error:e.message})
  }
};

const getUsers = async (req,res)=>{
  const {userLocation} =req.body
  try{
    const users = await User.find({location:userLocation})
    res.status(200).json({users:users})
  }
  catch(e){
    res.status(400).json({error:e.message})
  }
}

const updateUser = async (req,res)=>{
  const {userId,userLocation} = req.body
  try{
    const updatedUser = await User.findOneAndUpdate({userId},{location:userLocation},{new:true})
    res.status(200).json({msg:"User updated Sucessfully",user:updatedUser})
  }
  catch(e){
    res.status(400).json({error:e.message})
  }
}


const findUser = async (req,res)=>{
  const {userId} = req.body
  try{
    const user = await User.findOne({userId})
    if(!user){
      return res.status(200).json({msg:"User not found",data:null})
    }
    res.status(200).json({msg:"User Exits",data:user})
  }catch(e){
    res.status(400).json({error:e.message})
  }
}

export {createUser,getUsers,updateUser,findUser}