

const API_URL = 'http://localhost:3333';


async function request<T>(
    endpoint: string,
    options: RequestInit = {}
  ) {
    const url = `${API_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        ...options.headers,
      },
      ...options,
    };
  
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Network error occurred');
    }
  }
  

export async function get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return request<T>(endpoint, { method: 'GET', ...options });
  }
  
  export async function post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }
  
  export async function deleteRequest<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, { method: 'DELETE' });
  }
  
  export async function downloadFile(endpoint: string): Promise<Blob> {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      // throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
    }
    
    return await response.blob();
  }