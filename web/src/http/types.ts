export interface Link {
    id: string;
    originalUrl: string;
    shortUrl: string;
    visits: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateLinkRequest {
    originalUrl: string;
    shortUrl: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    message?: string;
  }
  
  export interface ApiError {
    message: string;
    statusCode: number;
  }
  