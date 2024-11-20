import * as React from "react";
import {useEffect, useState} from "react";
import dataService from "../../services/DataService";
import "./SearchCountComponent.css";

const SearchCountComponent: React.FC = () => {
    const [searchResultCount, setSearchResultCount] = useState<number | null>(null);

    useEffect(() => {
        const subscribeToSearchSubject = () => {
            return dataService.searchSubject$.subscribe((searchResults) => {
                setSearchResultCount(searchResults.length);
            });
        };

        const subscription = subscribeToSearchSubject();

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    return (
        <div id="search-count-panel">
            <h2>Search</h2>
            <h5>Search Result: {searchResultCount}</h5>
        </div>
    );
}

export default SearchCountComponent;
