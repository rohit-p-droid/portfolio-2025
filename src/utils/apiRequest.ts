import { config } from "../config/config";
import { tokenStorage } from './tokenStorage';

export interface ApiRequestType {
    url: string;
    method?: string;
    data?: any;
    headers?: Record<string, string>;
}

export async function apiRequest<T>({
    url,
    method = "GET",
    data = null,
    headers = {},
}: ApiRequestType): Promise<T> {
    try {
        const token = tokenStorage.get();
        
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
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

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw { status: response.status, ...errorData };
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}