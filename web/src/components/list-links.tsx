import { ListLinksItem } from "./list-links-item";
import { ListLinksHeader } from "./list-links-header";


export function ListLinksWidget() {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div>
                <ListLinksHeader />
            </div>
            <div className="flex flex-col w-full">
                <ListLinksItem/>
            </div>
        </div>
    )
}