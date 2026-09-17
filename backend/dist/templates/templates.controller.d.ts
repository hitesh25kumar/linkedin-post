import { TemplatesService } from './templates.service';
export declare class TemplatesController {
    private readonly templatesService;
    constructor(templatesService: TemplatesService);
    findAll(user: {
        sub: string;
    }): Promise<(import("mongoose").FlattenMaps<import("../database/schemas/template.schema").TemplateDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    create(user: {
        sub: string;
    }, dto: any): Promise<import("mongoose").Document<unknown, {}, import("../database/schemas/template.schema").TemplateDocument, {}, {}> & import("../database/schemas/template.schema").Template & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(user: {
        sub: string;
    }, id: string, dto: any): Promise<import("mongoose").Document<unknown, {}, import("../database/schemas/template.schema").TemplateDocument, {}, {}> & import("../database/schemas/template.schema").Template & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    delete(user: {
        sub: string;
    }, id: string): Promise<{
        deleted: boolean;
    }>;
}
