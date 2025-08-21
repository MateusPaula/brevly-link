import { Header } from "./components/header";
import { LinkShortnerWidget } from "./components/link-shortner";
import { ListLinksWidget } from "./components/list-links";

export function App() {
  return (
    <main className="h-dvh flex flex-col p-8">
      <div className="flex flex-row w-full">
        <Header />
      </div>
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col gap-4 bg-white rounded-2xl p-10">
          <LinkShortnerWidget />
        </div>
        {/* <div className="flex flex-col gap-4 bg-white rounded-2xl p-10">
          <ListLinksWidget />
        </div> */}
      </div>
    </main>
  )
}