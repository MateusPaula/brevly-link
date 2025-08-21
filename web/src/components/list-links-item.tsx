import { EmptyLinksListWidget } from "./empty-links-list";

export function ListLinksContentWidget() {
    return (
        <div className="flex flex-col gap-4">
            <EmptyLinksListWidget/>
        </div>
    )
}