
import { get, post, deleteRequest, downloadFile } from './api';
import { type Link, type CreateLinkRequest, type getAllLinksResponse } from './types';

export async function getAllLinks(): Promise<getAllLinksResponse> {
    const response = await get<getAllLinksResponse>('/links');
    return response;
  }

export async function createShortLink(data: CreateLinkRequest): Promise<Link> {
    const response = await post<Link>('/links', data);
    return response;
  }

export async function increaseLinkVisits(shortUrl: string): Promise<Link> {
    const response = await post<Link>(
      `/links/${shortUrl}/visit`
    );
    return response;
}

export async function deleteLink(shortUrl: string): Promise<void> {
    const response = await deleteRequest<void>(`/links/${shortUrl}`);
    return response;
  }
  
export async function exportLinksToCSV(): Promise<Blob> {
    return await downloadFile('/links/export/csv');
}