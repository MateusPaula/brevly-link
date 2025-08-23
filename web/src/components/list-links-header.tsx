import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";

export function ListLinksHeader() {
    return (
        <div className="flex flex-row items-center justify-between gap-4 w-full">       
            <div className="flex-1 min-w-0">
                <h1 className="text-lg text-gray-600 font-bold">My Links</h1>
            </div>
            <Button className="flex flex-row items-center gap-2 flex-shrink-0 text-sm">
                <DownloadSimpleIcon size={20} className="text-gray-600"/>
                <span className="hidden sm:inline text-gray-600">Export CSV</span>
            </Button>
        </div>
    )
}