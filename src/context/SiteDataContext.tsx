import { createContext, useContext, ReactNode } from "react";
import { siteData, SiteData } from "@/utils/dataLoader";

const SiteDataContext = createContext<SiteData | null>(siteData);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  return (
    <SiteDataContext.Provider value={siteData}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData(): SiteData | null {
  return useContext(SiteDataContext);
}
