import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    me(user: {
        sub: string;
    }): Promise<{
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
}
