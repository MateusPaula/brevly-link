import { LinkIcon } from '@phosphor-icons/react'

export function EmptyLinksListWidget() {
    return (
        <div>
            <LinkIcon weight='bold' size={32}/>
            <span>THERE IS NO LINKS REGISTERED YET</span>
        </div>
    )
}