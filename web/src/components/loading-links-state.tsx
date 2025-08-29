export function LoadingLinksState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 border-t border-gray-300">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-base rounded-full animate-spin"></div>
            </div>
            
            <p className="mt-4 text-gray-600 text-lg font-medium">
                Loading links...
            </p>
            
            <p className="mt-1 text-gray-400 text-sm">
                Please wait while we fetch your links
            </p>
        </div>
    )
}