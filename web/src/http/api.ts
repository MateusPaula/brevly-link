

const API_URL = 'http://localhost:3333';


async function request<T>(
    endpoint: string,
    options: RequestInit = {}
  ) {
    const url = `${API_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };
  
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log('errorData', errorData);
        throw new Error(errorData.message);
        // throw new ApiError(
        //   errorData.message || `HTTP error! status: ${response.status}`,
        //   response.status
        // );
      }
  
      return await response.json();
    } catch (error) {
        console.log('error', error);
    //   if (error instanceof ApiError) {
    //     throw error;
    //   }
      
    //   throw new ApiError(
    //     error instanceof Error ? error.message : 'Network error occurred',
    //     0
    //   );
    }
  }
  

export async function get<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, { method: 'GET' });
  }
  
  export async function post<T>(endpoint: string, data?: any): Promise<T> {
    return request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
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