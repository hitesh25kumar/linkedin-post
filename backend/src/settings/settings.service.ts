import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../database/schemas/user.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getSettings(userId: string) {
    const user = await this.userModel.findById(userId).select('-passwordHash');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateSettings(userId: string, dto: Partial<{
    name: string;
    headline: string;
    bio: string;
    industry: string;
    expertise: string[];
    preferences: { defaultTone: string; defaultAudience: string; defaultLength: string; };
  }>) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $set: dto },
      { new: true },
    ).select('-passwordHash');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}

