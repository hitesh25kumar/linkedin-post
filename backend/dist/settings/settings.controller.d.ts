import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getSettings(user: {
        sub: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../database/schemas/user.schema").UserDocument, {}, {}> & import("../database/schemas/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateSettings(user: {
        sub: string;
    }, dto: any): Promise<import("mongoose").Document<unknown, {}, import("../database/schemas/user.schema").UserDocument, {}, {}> & import("../database/schemas/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
