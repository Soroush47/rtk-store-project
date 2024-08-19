import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Categories from "../components/Categories";
import Loader from "../components/Loader";
import ProductsCard from "../components/ProductsCard";
import Search from "../components/Search";

import styles from "./ProductsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, filter } from "../features/products/productsSlice";

function ProductsPage() {
    const products = useSelector(store => store.products.products);
    const searchProducts = useSelector(store => store.products.searchProducts);
    const loading = useSelector(store => store.products.loading);
    const error = useSelector(store => store.products.error);
    const queryState = useSelector(store => store.products.query);

    const dispatch = useDispatch();

    //  console.log(products);

    const [query, setQuery] = useState(queryState);

    const [searchParams, setSearchParams] = useSearchParams();

    // useEffect(() => {
    //     window.scroll(0, 0);
    // });

    // useEffect(() => {
    //     dispatch();
    // }, []);

    useEffect(() => {
        // console.log("products page use effect");

        const search = searchParams.get("search");
        const category = searchParams.get("category");

        let newQuery = { ...query };
        // console.log({
        //     search,
        //     qsearch: queryState.search,
        //     category,
        //     qcategory: queryState.category,
        // });
        if (search != queryState.search && category != queryState.category) {
            if (search || category) {
                // reload
                search && (newQuery.search = search);
                category && (newQuery.category = category);
                setQuery(newQuery);
                Object.keys(products).length && dispatch(filter(newQuery));
                console.log("Filter 1");
            } else if (query.search || query.category) {
                // back to products page
                query.search && searchParams.set("search", query.search);
                query.category && searchParams.set("category", query.category);
                setSearchParams(searchParams);
                // dispatch({ type: "FILTER", payload: query }); //////////////
                console.log("Filter 2");
            } else {
                console.log("NoFilter", { products });
                // dispatch({ type: "NOFILTER", payload: Object.values(products) }); //////////////
            }
        }
    }, [products]);

    const filterHandler = ({ name, value }) => {
        if (value !== "") {
            searchParams.set(name, value);
        } else searchParams.delete(name);

        let newQuery = { ...query, [name]: value };

        setQuery(newQuery);
        setSearchParams(searchParams);
        dispatch(filter(newQuery));
    };

    const showProducts =
        !query.search && !query.category ? Object.values(products) : searchProducts;

    // console.log({ products, searchProducts, showProducts });

    return (
        <>
            <Search
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                query={query}
                setQuery={filterHandler}
            />
            <div className={styles.container}>
                <div className={styles.products}>
                    {loading ? (
                        <Loader />
                    ) : (
                        showProducts.map(product => (
                            <ProductsCard key={product.id} data={product} />
                        ))
                    )}
                </div>
                <Categories
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    query={query}
                    setQuery={filterHandler}
                />
            </div>
        </>
    );
}

export default ProductsPage;
