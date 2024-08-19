import { useState } from "react";

import { IoIosSearch as SearchIcon } from "react-icons/io";

import styles from "./Search.module.css";

function Search({ searchParams, query, setQuery }) {
    const [search, setSearch] = useState(
        () => searchParams.get("search") || query.search || ""
    );

    const searchHandler = text => {
        query.search !== text && setQuery({ name: "search", value: text });
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Search..."
                value={search.replace("  ", " ")}
                onChange={e => setSearch(e.target.value.trimStart())}
                onKeyUp={e => {
                    e.key === "Enter" && searchHandler(search);
                }}
            />
            <SearchIcon
                className={styles.search}
                onClick={() => {
                    searchHandler(search);
                }}
            />
        </div>
    );
}

export default Search;
