import { OnModuleInit } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Template, TemplateDocument } from '../database/schemas/template.schema';
export declare class TemplatesService implements OnModuleInit {
    private templateModel;
    constructor(templateModel: Model<TemplateDocument>);
    onModuleInit(): Promise<void>;
    findAll(userId: string): Promise<(import("mongoose").FlattenMaps<TemplateDocument> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    create(userId: string, dto: Partial<Template>): Promise<import("mongoose").Document<unknown, {}, TemplateDocument, {}, {}> & Template & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(userId: string, id: string, dto: Partial<Template>): Promise<import("mongoose").Document<unknown, {}, TemplateDocument, {}, {}> & Template & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    delete(userId: string, id: string): Promise<{
        deleted: boolean;
    }>;
}
