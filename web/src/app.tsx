import { Header } from "./components/header";
import { LinkShortnerWidget } from "./components/link-shortner";
import { ListLinksWidget } from "./components/list-links";

export function App() {
  return (
    <main className="min-h-dvh bg-gray-100 flex flex-col p-4 md:p-8">
      {/* Header container with max width matching the cards below */}
      <div className="w-full max-w-5xl mx-auto mb-6">
        <Header />
      </div>
      
      {/* Cards container with responsive layout */}
      <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
        {/* Link Shortener Card - smaller width */}
        <div className="w-full lg:w-[380px] bg-white rounded-2xl p-6 md:p-6 shadow-sm">
          <LinkShortnerWidget />
        </div>
        
        {/* Links List Card - larger width */}
        <div className="w-full lg:flex-1 bg-white rounded-2xl p-6 md:p-6 shadow-sm">
          <ListLinksWidget />
        </div>
      </div>
    </main>
  )
}