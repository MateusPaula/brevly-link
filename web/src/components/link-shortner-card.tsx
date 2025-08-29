import { useEffect, useRef, useState } from 'react';
import { WarningIcon } from '@phosphor-icons/react';
import { useLinkActions, useLinkStatus } from '../store/links-store';
import type { CreateLinkRequest } from '../http/types';
import { ToastDemo } from './ui/toast';
import * as Form from '@radix-ui/react-form';

export function LinkShortnerCard() {
  const { createShortLink, isLoading } = useLinkActions();
  const { error, success } = useLinkStatus();
  const [pathname, setPathname] = useState('');

  const formRef = useRef<HTMLFormElement>(null);
  const BASE_SHORT_URL = 'brev.ly/';

  // Reset form when success
  useEffect(() => {
    if (success && formRef.current) {
      formRef.current.reset();
      // Reset the short URL field to have the base URL
      const shortUrlField = formRef.current.querySelector('input[name="shortUrl"]') as HTMLInputElement;
      if (shortUrlField) {
        shortUrlField.value = BASE_SHORT_URL;
      }
    }
  }, [success, BASE_SHORT_URL]);

  const validateUrl = (value: string) => {
    if (!value.trim()) return false;
    
    try {
      new URL(value.startsWith('https://') ? value : `https://${value}`);
      return false;
    } catch {
      return true;
    }
  };

  const handlePathnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const cleanValue = value.replace(/[^a-zA-Z0-9\-_]/g, '');
    setPathname(cleanValue);
    event.target.value = cleanValue;
  };

  const validateShortUrl = (value: string) => {
    // Should return false to not show the error message
    return !(value?.trim() && value.length > 0);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const originalUrl = formData.get('originalUrl') as string;
    const shortUrl = formData.get('shortUrl') as string;

    const linkData: CreateLinkRequest = {
      originalUrl: originalUrl.startsWith('http') ? originalUrl : `https://${originalUrl}`,
      shortUrl: shortUrl.trim()
    };

    await createShortLink(linkData);
    setPathname('');
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg text-gray-600 font-bold">New Link</h1>
      <Form.Root ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Form.Field name="originalUrl" className="flex flex-col gap-2">
          <Form.Label className="text-xs text-gray-600 font-medium">
            ORIGINAL LINK
          </Form.Label>
          
          <Form.Control asChild>
            <input 
              type="text" 
              className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" 
              placeholder="www.example.com"
              disabled={isLoading}
              required
            />
          </Form.Control>
          
          <Form.Message match="valueMissing" className="flex flex-row items-center gap-2">
            <WarningIcon size={16} className="text-danger" />
            <span className="text-sm text-gray-600">Enter a valid URL.</span>
          </Form.Message>
          

          <Form.Message match={validateUrl} className="flex flex-row items-center gap-2">
            <WarningIcon size={16} className="text-danger" />
            <span className="text-sm text-gray-600">Enter a valid URL.</span>
          </Form.Message>
        </Form.Field>
        
        <Form.Field name="shortUrl" className="flex flex-col gap-2">
          <Form.Label className="text-xs text-gray-600 font-medium">
            SHORT LINK
          </Form.Label>
          
          <div className="relative">
            <div className="w-full p-4 rounded-xl border border-gray-300 focus-within:ring-1 flex items-center bg-white">
              <span className="text-gray-400 select-none pointer-events-none">
                {BASE_SHORT_URL}
              </span>
              
              <Form.Control asChild>
                <input 
                  type="text"
                  name="shortUrl"
                  value={pathname}
                  onChange={handlePathnameChange}
                  className="flex-1 outline-none bg-transparent border-0 focus:ring-0"
                  placeholder="example"
                  disabled={isLoading}
                  maxLength={50}
                  required
                />
              </Form.Control>
            </div>
          </div>
          
          <Form.Message match="valueMissing" className="flex flex-row items-center gap-2">
            <WarningIcon size={16} className="text-danger" />
            <span className="text-sm text-gray-600">Enter a valid short URL with no special characters</span>
          </Form.Message>

        
          <Form.Message match={validateShortUrl} className="flex flex-row items-center gap-2">
            <WarningIcon size={16} className="text-danger" />
            <span className="text-sm text-gray-600">Enter a valid short URL</span>
          </Form.Message>
        </Form.Field>
        
        <Form.Submit asChild>
          <button 
            className="bg-blue-base hover:bg-blue-dark text-white text-md p-5 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Link'}
          </button>
        </Form.Submit>
      </Form.Root>
      
      <ToastDemo shouldOpen={!!error} title={error?.title || ''} description={error?.message || ''} variant={error ? 'error' : 'info'} />
    </div>
  )
}