import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { useLinkActions } from "../store/links-store";

type Link = {
    shortUrl: string
    originalUrl: string
    visits: number
}

export function ListLinksItem({shortUrl, originalUrl, visits}: Link) {
    const { deleteLink, isLoading } = useLinkActions();
    
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this link?')) {
            await deleteLink(shortUrl);
            // TODO: You could add a toast notification here
        }
    };
    
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            // TODO: You could add a toast notification here
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };

    const getCurrentHost = () => {
        return window.location.host; // Ex: http://localhost:5173 ou https://meudominio.com
      };

    return (
        <div className="flex flex-row items-center justify-between gap-4 border-t border-gray-300 py-4 w-full">
            {/* URL section - takes available space */}
            <div className="flex-1 min-w-0">
                <span className='text-md font-bold text-blue-base truncate block my-1'>{getCurrentHost()}/{shortUrl}</span>
                <span className='text-sm text-gray-500 truncate block'>{originalUrl}</span>
            </div>

            {/* Visits and actions section - fixed width */}
            <div className="flex flex-row items-center gap-1 flex-shrink-0">
                <span className="text-sm text-gray-500 whitespace-nowrap mr-4">{visits} Visits</span>
                <Button 
                    size="icon" 
                    className="bg-gray-200"
                    onClick={handleCopy}
                    disabled={isLoading}
                >
                    <CopyIcon size={20} className="text-gray-600" />
                </Button>
                <Button 
                    size="icon" 
                    className="bg-gray-200"
                    onClick={handleDelete}
                    disabled={isLoading}
                >
                    <TrashIcon size={20} className="text-gray-600" />
                </Button>
            </div>
        </div>
    )
}