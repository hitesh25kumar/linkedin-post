import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../database/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.userModel.findOne({
      email: dto.email.toLowerCase(),
    });
    if (existing) {
      throw new ConflictException(
        'An account with this email already exists',
      );
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.userModel.create({
      name: dto.name,
      email: dto.email.toLowerCase(),
      passwordHash,
    });

    const token = this.jwtService.sign({
      sub: (user._id as any).toString(),
      email: user.email,
    });
    return { token, user: this.sanitizeUser(user) };
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({
      email: dto.email.toLowerCase(),
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({
      sub: (user._id as any).toString(),
      email: user.email,
    });
    return { token, user: this.sanitizeUser(user) };
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new UnauthorizedException('User not found');
    return this.sanitizeUser(user);
  }

  private sanitizeUser(user: UserDocument) {
    return {
      id: (user._id as any).toString(),
      name: user.name,
      email: user.email,
      headline: user.headline,
      bio: user.bio,
      industry: user.industry,
      expertise: user.expertise,
      preferences: user.preferences,
    };
  }
}
