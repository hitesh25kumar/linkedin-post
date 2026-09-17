import { Model } from 'mongoose';
import { User, UserDocument } from '../database/schemas/user.schema';
export declare class SettingsService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getSettings(userId: string): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateSettings(userId: string, dto: Partial<{
        name: string;
        headline: string;
        bio: string;
        industry: string;
        expertise: string[];
        preferences: {
            defaultTone: string;
            defaultAudience: string;
            defaultLength: string;
        };
    }>): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
