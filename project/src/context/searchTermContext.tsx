import * as React from "react";

export interface SearchTermInfo {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const SearchTermContext = React.createContext<SearchTermInfo>({
  searchTerm: '',
  setSearchTerm: () => {}
});
