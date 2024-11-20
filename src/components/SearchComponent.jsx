import SearchPanelComponent from "./SearchPanelComponent/SearchPanelComponent";
import SearchCountComponent from "./SearchCountComponent/SearchCountCompoenent";
import SearchResultComponent from "./SearchResultComponent/SearchResultComponent";
import "./SearchCompoenent.css"

const SearchComponent = () => {
    return (
        <>
            <div id="search-panel">
                <SearchCountComponent/>
                <SearchPanelComponent/>
            </div>
            <SearchResultComponent/>
        </>
    );
};

export default SearchComponent;
