import { config } from "../config/config";
import { tokenStorage } from './tokenStorage';

export interface ApiRequestType {
    url: string;
    method?: string;
    data?: any;
    headers?: Record<string, string>;
    timeout?: number;
}

export async function apiRequest<T>({
    url,
    method = "GET",
    data = null,
    headers = {},
    timeout = 8000, // 8 seconds timeout for better performance
}: ApiRequestType): Promise<T> {
    try {
        const token = tokenStorage.get();
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            signal: controller.signal,
        };

        // Add Authorization header if token exists
        if (token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
            };
        }

        if (data && method !== "GET") {
            options.body = JSON.stringify(data);
        }

        const fullUrl = `${config.API_BASE_URL}${url}`
        const response = await fetch(fullUrl, options);

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw { status: response.status, ...errorData };
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Request timeout - please check your connection');
        }
        throw error;
    }
}