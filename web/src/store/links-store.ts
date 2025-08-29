import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/shallow';
import { createShortLink as createShortLinkApi, getAllLinks, deleteLink as deleteLinkApi, exportLinksToCSV } from '../http/links';
import type { Link, CreateLinkRequest } from '../http/types';
import { downloadUrl } from '../utils/download-url';

type LinksState = {
  links: Link[];
  total: number;
  isLoading: boolean;
  error: {
    message: string | null;
    title: string;
  } | null;
  success: boolean;
  deleteMessage: string;
  
  createShortLink: (data: CreateLinkRequest) => Promise<void>;
  deleteLink: (shortUrl: string) => Promise<void>;
  fetchLinks: () => Promise<void>;
  exportCsv: (searchQuery?: string) => Promise<void>;
}

const initialState = {
  links: [],
  total: 0,
  isLoading: false,
  error: null,
  success: false,
  deleteMessage: '',
};

export const useLinksStore = create<LinksState, [['zustand/immer', never]]>(
  immer((set, get) => ({
    ...initialState,
    createShortLink: async (data: CreateLinkRequest) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      });
      
      try {
        await createShortLinkApi(data);
        
        set((state) => {
          state.success = true;
        });
        
        await get().fetchLinks();
        
        setTimeout(() => {
          set((state) => {
            state.success = false;
          });
        }, 3000);
        
      } catch (error) {
        set((state) => {
          state.error = {
            message: error instanceof Error ? error.message : 'Failed to create short link',
            title: 'Link Register Error'
          };
        });
      } finally {
        set((state) => {
          state.isLoading = false;
        });
      }
    },
    
    deleteLink: async (shortUrl: string) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
        state.deleteMessage = '';
      });
      
      try {
        const response = await deleteLinkApi(shortUrl);
        
        set((state) => {
          state.deleteMessage = response.message;
        });
        
        await get().fetchLinks();
        
      } catch (error) {
        set((state) => {
          state.error = {
            message: error instanceof Error ? error.message : 'Failed to delete link',
            title: 'Link Delete Error'
          };
        });
      } finally {
        set((state) => {
          state.isLoading = false;
        });
      }
    },
    
    fetchLinks: async () => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });
      
      try {
        const { links } = await getAllLinks();
        
        set((state) => {
          state.links = links;
        });
      } catch (error) {
        set((state) => {
          state.error = {
            message: error instanceof Error ? error.message : 'Failed to load links',
            title: 'Link Load Error'
          };
        });
      } finally {
        set((state) => {
          state.isLoading = false;
        });
      }
    },

    exportCsv: async () => {

      try {
        const { reportUrl } = await exportLinksToCSV();
        if (reportUrl) {
          downloadUrl(reportUrl);
        } 
      } catch (error) {
        set((state) => {
          state.error = {
            message: error instanceof Error ? error.message : 'Failed to export CSV',
            title: 'Export CSV Error'
          };
        });
      }
    },
  }))
);

export const useLinks = () => {
  return useLinksStore(
    useShallow(store => ({
      links: store.links,
      total: store.total,
      isLoading: store.isLoading,
      fetchLinks: store.fetchLinks,
      exportCsv: store.exportCsv,
    }))
  );
};

export const useLinkActions = () => {
  return useLinksStore(
    useShallow(store => ({
      createShortLink: store.createShortLink,
      deleteLink: store.deleteLink,
      isLoading: store.isLoading,
    }))
  );
};

export const useLinkStatus = () => {
  return useLinksStore(
    useShallow(store => ({
      error: store.error,
      success: store.success,
      deleteMessage: store.deleteMessage,
      isLoading: store.isLoading,
    }))
  );
};

export const useIsLinksEmpty = () => {
  return useLinksStore(store => store.links.length === 0);
};
