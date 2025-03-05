import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try{
        const {userID} = req.body;

        const user = await userModel.findById(userID)

        if(!user){
            return res.json({success: false, message: "User not found"})
        }
        
        return res.json({
            success: true,
            userData: {
                username: user.username,
                isAccountVerified: user.isAccountVerified,

            }
        })
    }
    catch(error){
        return res.json({success: false, message: error.message})
    }
}