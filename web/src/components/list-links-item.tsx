import { useState } from "react";
import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ToastDemo } from "./ui/toast";
import { useLinkActions } from "../store/links-store";

type LinkItem = {
    shortUrl: string
    originalUrl: string
    visits: number
}

export function ListLinksItem({shortUrl, originalUrl, visits}: LinkItem) {
    const { deleteLink, isLoading } = useLinkActions();
    const [showCopyToast, setShowCopyToast] = useState(false);
    
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this link?')) {
            try {
                await deleteLink(shortUrl);
            } catch (error) {
                console.error('Failed to delete link:', error);
            }
        }
    };
    
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${getCurrentHost()}/${shortUrl}`);
            setShowCopyToast(true);
            setTimeout(() => setShowCopyToast(false), 3000);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };

    const getCurrentHost = () => {
        return window.location.host;
    };

    return (
        <>
            <div className="flex flex-row items-center justify-between gap-4 border-t border-gray-300 py-4 w-full">
                <div className="flex-1 min-w-0">
                    <Link to={`/${shortUrl}`} target="_blank" rel="noopener noreferrer">
                        <span className='text-md font-bold text-blue-base truncate block my-1 hover:underline'>{getCurrentHost()}/{shortUrl}</span>
                    </Link>
                    <span className='text-sm text-gray-500 truncate block'>{originalUrl}</span>
                </div>

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
            
            <ToastDemo 
                shouldOpen={showCopyToast} 
                title="Link copied!" 
                description="The short link has been copied to your clipboard." 
                variant="info" 
            />
        </>
    )
}