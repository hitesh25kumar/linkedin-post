import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../database/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        token: string;
        user: {
            id: any;
            name: string;
            email: string;
            headline: string;
            bio: string;
            industry: string;
            expertise: string[];
            preferences: {
                defaultTone: string;
                defaultAudience: string;
                defaultLength: string;
            };
        };
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: any;
            name: string;
            email: string;
            headline: string;
            bio: string;
            industry: string;
            expertise: string[];
            preferences: {
                defaultTone: string;
                defaultAudience: string;
                defaultLength: string;
            };
        };
    }>;
    findById(id: string): Promise<{
        id: any;
        name: string;
        email: string;
        headline: string;
        bio: string;
        industry: string;
        expertise: string[];
        preferences: {
            defaultTone: string;
            defaultAudience: string;
            defaultLength: string;
        };
    }>;
    private sanitizeUser;
}
