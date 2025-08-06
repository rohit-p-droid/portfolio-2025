export type ApiResponse <T = any> = {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    errors?: Record<string, string[]>;
    timestamp: string;
}