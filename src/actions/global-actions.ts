export interface ErrorResponse {
    code: number;
    error: {
        message: string;
        causes: string | null;
    }
}