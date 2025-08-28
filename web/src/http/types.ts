export interface Link {
    originalUrl: string;
    shortUrl: string;
    visits: number;
    createdAt: string;
  }
  
export interface getAllLinksResponse {
    links: Link[];
    total: number;
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
  