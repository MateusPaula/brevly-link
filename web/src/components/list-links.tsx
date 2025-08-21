import { ListLinksContentWidget } from "./list-links-item";
import { ListLinksHeaderWidget } from "./list-links-header";


export function ListLinksWidget() {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <ListLinksHeaderWidget />
            </div>
            <div>
                <ListLinksContentWidget/>
            </div>
        </div>
    )
}