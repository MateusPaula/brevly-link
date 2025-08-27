import { useState } from 'react';
import { createShortLink } from '../http/links';
import type { CreateLinkRequest } from '../http/types';
import { WarningIcon } from '@phosphor-icons/react';

export function LinkShortnerCard() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const BASE_SHORT_URL = 'brev.ly/';

  const handleShortUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (!value.startsWith(BASE_SHORT_URL)) {
      setShortUrl(BASE_SHORT_URL);
    } else {
      setShortUrl(value);
    }
  };

  const handleSaveLink = async () => {
    setError(null);
    setSuccess(false);

    if (!originalUrl.trim()) {
      setError('Por favor, insira a URL original');
      return;
    }

    if (!shortUrl.trim() || shortUrl === BASE_SHORT_URL) {
      setError('Por favor, insira um pathname para o link encurtado');
      return;
    }

    // Validação básica de URL
    try {
      new URL(originalUrl.startsWith('http') ? originalUrl : `https://${originalUrl}`);
    } catch {
      setError('Por favor, insira uma URL válida');
      return;
    }

    setIsLoading(true);

    try {
      const linkData: CreateLinkRequest = {
        originalUrl: originalUrl.startsWith('http') ? originalUrl : `https://${originalUrl}`,
        shortUrl: shortUrl.replace(BASE_SHORT_URL, '') // Remove o prefixo para enviar apenas o pathname
      };

      await createShortLink(linkData);
      
      setSuccess(true);
      setOriginalUrl('');
      setShortUrl('');
      
      // Opcional: mostrar mensagem de sucesso por alguns segundos
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (err) {
      console.log('err',err);
      setError(err instanceof Error ? err.message : 'Erro ao criar link encurtado');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg text-gray-600 font-bold">New Link</h1>
      
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          Link criado com sucesso!
        </div>
      )}
      
      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-600">ORIGINAL LINK</span>
        <input 
          type="text" 
          className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="www.example.com"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          disabled={isLoading}
        />
        <div className='flex flex-row items-center gap-2'>
          <WarningIcon size={16} className='text-red-500'/>
          <span className='text-sm text-gray-500'>Enter a valid URL.</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <span className="text-xs text-gray-600">SHORT LINK</span>
        <input 
          type="text" 
          className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={shortUrl}
          onChange={handleShortUrlChange}
          onFocus={() => {
            if (!shortUrl) {
              setShortUrl(BASE_SHORT_URL);
            }
          }}
          placeholder="brev.ly/example"
          disabled={isLoading}
        />
        <div className='flex flex-row items-center gap-2'>
          <WarningIcon size={16} className='text-red-500'/>
          <span className='text-sm text-gray-500'>Enter a short URL with no whitespaces and special characters.</span>
        </div>
      </div>
      
      <button 
        className="bg-blue-base hover:bg-blue-dark text-white text-md p-5 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        onClick={handleSaveLink}
        disabled={isLoading}
      >
        {isLoading ? 'Salvando...' : 'Save Link'}
      </button>
    </div>
  )
}