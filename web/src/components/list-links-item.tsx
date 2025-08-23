import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { EmptyLinksList } from "./empty-links-list";
import { Button } from "./ui/button";
import * as ScrollArea from '@radix-ui/react-scroll-area';

export function ListLinksItem() {
    const isEmpty = false
    const visits = 30

    const links = [
        {
            shortUrl: 'localhost:3000/google',
            originalUrl: 'https://www.google.com',
            visits: 30
        },
        {
            shortUrl: 'localhost:3000/google1',
            originalUrl: 'https://www.google.com',
            visits: 30
        },
        {
            shortUrl: 'localhost:3000/google2',
            originalUrl: 'https://www.google.com',
            visits: 30
        },
        {
            shortUrl: 'localhost:3000/google3',
            originalUrl: 'https://www.google.com',
            visits: 30
        },
        {
            shortUrl: 'localhost:3000/google4',
            originalUrl: 'https://www.google.com',
            visits: 30
        },
        {
            shortUrl: 'localhost:3000/google5',
            originalUrl: 'https://www.google.com',
            visits: 30
        },
        {
            shortUrl: 'localhost:3000/google6',
            originalUrl: 'https://www.google.com',
            visits: 30
        }
    ]
    return (
        <div className="flex flex-col w-full">
            <ScrollArea.Root type="scroll">
                <ScrollArea.Viewport>
                    {isEmpty ? <EmptyLinksList/> : 
                        <div className="w-full">
                            <div className="flex flex-row items-center justify-between gap-4 border-t border-gray-300 py-4 w-full">
                                {/* URL section - takes available space */}
                                <div className="flex-1 min-w-0">
                                    <span className='text-md font-bold text-blue-base truncate block my-1'>localhost:3000/google</span>
                                    <span className='text-sm text-gray-500 truncate block'>https://www.google.com</span>
                                </div>
                                
                                {/* Visits and actions section - fixed width */}
                                <div className="flex flex-row items-center gap-1 flex-shrink-0">
                                    <span className="text-sm text-gray-500 whitespace-nowrap mr-4">{visits} Visits</span>
                                    <Button size="icon" className="bg-gray-200">
                                        <CopyIcon size={20} className="text-gray-600"/>
                                    </Button>
                                    <Button size="icon" className="bg-gray-200">
                                        <TrashIcon size={20} className="text-gray-600"/>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-between gap-4 border-t border-gray-300 py-4 w-full">
                                {/* URL section - takes available space */}
                                <div className="flex-1 min-w-0">
                                <span className='text-md font-bold text-blue-base truncate block my-1'>localhost:3000/google</span>
                                <span className='text-sm text-gray-500 truncate block'>https://www.google.com</span>
                                </div>
                                
                                {/* Visits and actions section - fixed width */}
                                <div className="flex flex-row items-center gap-1 flex-shrink-0">
                                    <span className="text-sm text-gray-500 whitespace-nowrap mr-4">{visits} Visits</span>
                                    <Button size="icon" className="bg-gray-200">
                                        <CopyIcon size={20} className="text-gray-600"/>
                                    </Button>
                                    <Button size="icon" className="bg-gray-200">
                                        <TrashIcon size={20} className="text-gray-600"/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    }
                </ScrollArea.Viewport>
            </ScrollArea.Root>
        </div>
    )
}