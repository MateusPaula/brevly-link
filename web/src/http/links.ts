
import { get, post, deleteRequest, downloadFile } from './api';
import { type Link, type CreateLinkRequest, type getAllLinksResponse } from './types';

export async function getAllLinks(): Promise<getAllLinksResponse> {
    const response = await get<getAllLinksResponse>('/links', {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
  }

export async function createShortLink(data: CreateLinkRequest): Promise<Link> {
    const response = await post<Link>('/links', data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
  }

export async function increaseLinkVisits(shortUrl: string): Promise<Link> {
    const response = await post<Link>(
      `/links/visits`, 
      { shortUrl },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
}

export async function deleteLink(shortUrl: string): Promise<{message: string}> {
    const response = await deleteRequest<{message: string}>(`/links/${shortUrl}`);
    return response;
  }
  
export async function exportLinksToCSV(searchQuery?: string): Promise<any> {
  const query = searchQuery ? `?searchQuery=${searchQuery}` : '';
  const response = await get<any>(
    `/links/export${query}`
  );
  return response;
}

export async function getLinkForRedirect(shortUrl: string): Promise<Link> {
  const response = await get<Link>(`/redirect/${shortUrl}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
}

