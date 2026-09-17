import { Document, Types } from 'mongoose';
export type TemplateDocument = Template & Document;
export declare class Template {
    userId: Types.ObjectId | null;
    name: string;
    description: string;
    tone: string;
    postType: string;
    instructions: string;
    isDefault: boolean;
}
export declare const TemplateSchema: import("mongoose").Schema<Template, import("mongoose").Model<Template, any, any, any, Document<unknown, any, Template, any, {}> & Template & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Template, Document<unknown, {}, import("mongoose").FlatRecord<Template>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Template> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
