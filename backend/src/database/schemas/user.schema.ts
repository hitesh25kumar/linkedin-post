import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: '' })
  headline: string;

  @Prop({ default: '' })
  bio: string;

  @Prop({ default: '' })
  industry: string;

  @Prop({ type: [String], default: [] })
  expertise: string[];

  @Prop({
    type: Object,
    default: {
      defaultTone: 'Professional',
      defaultAudience: '',
      defaultLength: 'Medium',
    },
  })
  preferences: {
    defaultTone: string;
    defaultAudience: string;
    defaultLength: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
