import React, {useContext,useReducer} from 'react';
import { searchReducer } from './SearchReducer';

const SearchStateContext = React.createContext();
const SearchDispatchContext = React.createContext();

function SearchProvider({ children }) {
  const [searchState, searchDispatch] = useReducer(searchReducer, {});
  return (
      <SearchStateContext.Provider value={searchState}>
         <SearchDispatchContext.Provider value={searchDispatch}>
            {children}
         </SearchDispatchContext.Provider>
      </SearchStateContext.Provider>
  );
}

function useSearchState() {
    const context = useContext(SearchStateContext);   
    if (context === undefined) {
      throw new Error('useSearchState must be used within a Provider');
    }
    return context;
}

function useSearchDispatch() {
  const context = useContext(SearchDispatchContext);
  if (context === undefined) {
    throw new Error('useSearchDispatch must be used within a Provider');
  }
  return context;
}

export { SearchProvider,useSearchState,useSearchDispatch };