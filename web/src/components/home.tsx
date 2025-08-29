import { useEffect } from "react";
import { Header } from "./header";
import { LinkShortnerCard } from "./link-shortner-card";
import { ListLinksCard } from "./list-links-card";
import { useLinks } from "../store/links-store";

export function Home() {
  const { fetchLinks, isLoading } = useLinks();

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return (
    <main className="min-h-dvh bg-gray-100 flex flex-col p-4 md:p-8">
      <div className="w-full max-w-5xl mx-auto mb-6">
        <Header />
      </div>
      
      <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:w-[380px] bg-white rounded-2xl p-6 md:p-6 shadow-sm">
          <LinkShortnerCard />
        </div>
        
        <div className="w-full lg:flex-1 bg-white rounded-2xl p-6 md:p-6 shadow-sm relative overflow-hidden">
          {isLoading && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 overflow-hidden">
              <div className="h-full bg-blue-base animate-loading-line"></div>
            </div>
          )}
          <ListLinksCard />
        </div>
      </div>
    </main>
  )
}