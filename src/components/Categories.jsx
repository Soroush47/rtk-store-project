import { FaListUl } from "react-icons/fa";

import styles from "./Categories.module.css";
import { useSelector } from "react-redux";

function Categories({ query: {category}, setQuery }) {
    

    const categories = useSelector(store => store.products.categories)

    const searchHandler = cat => {
        category !== cat && setQuery({ name: "category", value: cat });
    };

    return (
        <div className={styles.container}>
            <h3>
                <FaListUl className={styles.listIcon} /> Categories
            </h3>
            {categories.map((cat, index) => {
                return (
                    <p
                        key={index}
                        onClick={() => searchHandler(cat)}
                        className={
                            category === cat ? styles.selected : styles.hover
                        }
                    >
                        {cat === ""
                            ? "All"
                            : cat // toUpperCaseFirstLetter
                                  .split(" ")
                                  .map(
                                      word => word.charAt(0).toUpperCase() + word.slice(1)
                                  )
                                  .join(" ")}
                    </p>
                );
            })}
        </div>
    );
}

export default Categories;
