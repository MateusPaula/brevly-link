
import { get, post, deleteRequest, downloadFile } from './api';
import { type Link, type CreateLinkRequest, type ApiResponse } from './types';

export async function getAllLinks(): Promise<Link[]> {
    const response = await get<ApiResponse<Link[]>>('/links');
    return response.data;
  }

export async function createShortLink(data: CreateLinkRequest): Promise<Link> {
    const response = await post<ApiResponse<Link>>('/links', data);
    return response.data;
  }

export async function increaseLinkVisits(shortUrl: string): Promise<Link> {
    const response = await post<ApiResponse<Link>>(
      `/links/${shortUrl}/visit`
    );
    return response.data;
}

export async function deleteLink(shortUrl: string): Promise<void> {
    const response = await deleteRequest<ApiResponse<void>>(`/links?shortUrl=${shortUrl}`);
    return response.data;
  }
  
  // 5. Export to CSV
export async function exportLinksToCSV(): Promise<Blob> {
    return await downloadFile('/links/export/csv');
}