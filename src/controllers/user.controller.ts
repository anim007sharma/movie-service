import { Request, Response } from "express";
import UserService from "../service/user.service";

class UserController {
  private userService: UserService
  constructor() {
    this.userService = new UserService();
  }

  public token = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const response = await this.userService.getAuthToken(email, password)
    return res.json({token: response})
  }
}

export default UserController