import { User, IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppConfig } from '../config';

export class UserService {
  static async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    return user.save();
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user._id, email: user.email }, AppConfig.JWT_SECRET, { expiresIn: '1d' });
    return { user, token };
  }

  static async getById(id: string) {
    return User.findById(id);
  }
} 