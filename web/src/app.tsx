import { Header } from "./components/header";
import { LinkShortnerCard } from "./components/link-shortner-card";
import { ListLinksCard } from "./components/list-links-card";
import { useState } from "react";

export function App() {
  const [loadingCurrentLinks, setLoadingCurrentLinks] = useState(false);
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
          <LinkShortnerCard />
        </div>
        
        {/* Links List Card - larger width */}
        <div className="w-full lg:flex-1 bg-white rounded-2xl p-6 md:p-6 shadow-sm relative overflow-hidden">
          {/* Loading bar positioned at the very top of the card */}
          {loadingCurrentLinks && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 overflow-hidden">
              <div className="h-full bg-blue-base animate-loading-line"></div>
            </div>
          )}
          <ListLinksCard loadingCurrentLinks={loadingCurrentLinks} />
        </div>
      </div>
    </main>
  )
}