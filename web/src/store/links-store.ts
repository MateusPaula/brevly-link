import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/shallow';
import { createShortLink as createShortLinkApi, getAllLinks, deleteLink as deleteLinkApi } from '../http/links';
import type { Link, CreateLinkRequest } from '../http/types';

type LinksState = {
  // State
  links: Link[];
  total: number;
  isLoading: boolean;
  error: {
    message: string | null;
    title: string;
  } | null;
  success: boolean;
  
  // Actions
  createShortLink: (data: CreateLinkRequest) => Promise<void>;
  deleteLink: (shortUrl: string) => Promise<void>;
  fetchLinks: () => Promise<void>;
}

const initialState = {
  links: [],
  total: 0,
  isLoading: false,
  error: null,
  success: false,
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
      });
      
      try {
        await deleteLinkApi(shortUrl);
        
        // Fetch updated links list
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
  }))
);

export const useLinks = () => {
  return useLinksStore(
    useShallow(store => ({
      links: store.links,
      total: store.total,
      isLoading: store.isLoading,
      fetchLinks: store.fetchLinks,
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
      isLoading: store.isLoading,
    }))
  );
};

export const useIsLinksEmpty = () => {
  return useLinksStore(store => store.links.length === 0);
};
