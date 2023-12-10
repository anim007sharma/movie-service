import User from "../models/user.model";
import jwt from "jsonwebtoken";

class UserService {
  public async getAuthToken(email: string, password: string) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordMatch = await user.matchPassword(password);
      if (!isPasswordMatch) {
        throw new Error("Invalid email or password");
      }
      const token = this.generateToken(user);
      return token; 
    } catch (e) {
      throw e;
    }
  }

  private generateToken(user) {
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    return token;
  }
}

export default UserService;
