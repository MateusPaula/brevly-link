import { ListLinksItem } from "./list-links-item";
import { ListLinksHeader } from "./list-links-header";
import { EmptyLinksList } from "./empty-links-list";
import { LoadingLinksState } from "./loading-links-state";
import { ToastDemo } from "./ui/toast";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { useEffect, useRef, useState } from 'react';
import { useLinks, useIsLinksEmpty, useLinkStatus } from "../store/links-store";

export function ListLinksCard() {
    const [shouldShowScrollbar, setShouldShowScrollbar] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const viewportRef = useRef<HTMLDivElement>(null)
    
    const { links, isLoading } = useLinks();
    const isEmpty = useIsLinksEmpty();
    const { deleteMessage } = useLinkStatus();



    useEffect(() => {
        const checkScrollNeeded = () => {
            if (contentRef.current && viewportRef.current) {
                const contentHeight = contentRef.current.scrollHeight
                const maxHeight = window.innerHeight - 288
                setShouldShowScrollbar(contentHeight > maxHeight)
            }
        }

        checkScrollNeeded()
        window.addEventListener('resize', checkScrollNeeded)
        
        return () => window.removeEventListener('resize', checkScrollNeeded)
    }, [links])

    return (
        <div className="flex flex-col gap-4 w-full">
            <div>
                <ListLinksHeader />
            </div>
            
            {isLoading ? (
                <LoadingLinksState />
            ) : (
                <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full">
                        <ScrollArea.Root type="auto" className="overflow-hidden">
                            <ScrollArea.Viewport 
                                ref={viewportRef}
                                className={`w-full max-h-[calc(100vh-18rem)] ${shouldShowScrollbar ? 'pr-6' : ''}`}
                            >
                                {isEmpty ? <EmptyLinksList /> :
                                    <div ref={contentRef} className="w-full">
                                        {links.map((link) => (
                                            <ListLinksItem 
                                                shortUrl={link.shortUrl} 
                                                originalUrl={link.originalUrl} 
                                                visits={link.visits} 
                                                key={`${link.shortUrl}`} 
                                            />
                                        ))}
                                    </div>
                                }
                            </ScrollArea.Viewport>
                            <ScrollArea.Scrollbar className="flex touch-none select-none bg-white transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-4" orientation="vertical">
                                <ScrollArea.Thumb className="relative flex-1 bg-blue-base before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:-translate-x-1/2 before:-translate-y-1/2" />
                            </ScrollArea.Scrollbar>
                        </ScrollArea.Root>
                    </div>
                </div>
            )}
            
            <ToastDemo 
                shouldOpen={!!deleteMessage} 
                title="Link deleted!" 
                description={deleteMessage} 
                variant="success" 
            />
        </div>
    )
}