import { LinkIcon } from '@phosphor-icons/react'

export function EmptyLinksList() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <LinkIcon weight='bold' size={32} className='text-gray-400'/>
            <span className='text-xs text-gray-500'>THERE IS NO LINKS REGISTERED YET</span>
        </div>
    )
}