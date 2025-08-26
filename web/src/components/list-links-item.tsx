import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { EmptyLinksList } from "./empty-links-list";
import { Button } from "./ui/button";
import * as ScrollArea from '@radix-ui/react-scroll-area';

type Link = {
    shortUrl: string
    originalUrl: string
    visits: number
}

export function ListLinksItem({shortUrl, originalUrl, visits}: Link) {
    return (
        <div className="flex flex-row items-center justify-between gap-4 border-t border-gray-300 py-4 w-full">
            {/* URL section - takes available space */}
            <div className="flex-1 min-w-0">
                <span className='text-md font-bold text-blue-base truncate block my-1'>{shortUrl}</span>
                <span className='text-sm text-gray-500 truncate block'>{originalUrl}</span>
            </div>

            {/* Visits and actions section - fixed width */}
            <div className="flex flex-row items-center gap-1 flex-shrink-0">
                <span className="text-sm text-gray-500 whitespace-nowrap mr-4">{visits} Visits</span>
                <Button size="icon" className="bg-gray-200">
                    <CopyIcon size={20} className="text-gray-600" />
                </Button>
                <Button size="icon" className="bg-gray-200">
                    <TrashIcon size={20} className="text-gray-600" />
                </Button>
            </div>
        </div>
    )
}