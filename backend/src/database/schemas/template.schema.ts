import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TemplateDocument = Template & Document;

@Schema({ timestamps: true })
export class Template {
  @Prop({ type: Types.ObjectId, ref: 'User', required: false, default: null })
  userId: Types.ObjectId | null;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: 'Professional' })
  tone: string;

  @Prop({ default: 'Industry Insight' })
  postType: string;

  @Prop({ default: '' })
  instructions: string;

  @Prop({ default: false })
  isDefault: boolean;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
