import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { loadSiteData, SiteData } from "@/utils/dataLoader";

const SiteDataContext = createContext<SiteData | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData | null>(null);

  useEffect(() => {
    loadSiteData().then(setData);
  }, []);

  return (
    <SiteDataContext.Provider value={data}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData(): SiteData | null {
  return useContext(SiteDataContext);
}
