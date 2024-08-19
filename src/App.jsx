import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./features/products/productsSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    });

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Navigate to="/products" replace />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Layout>
    );
}

export default App;
