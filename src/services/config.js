import axios from "axios";

const api = axios.create({ baseURL: "https://fakestoreapi.com" });

api.interceptors.response.use(
    res => {
        if (res.config.url === "/products") {
            const getTitle = title => title.split(" ").slice(0, 3).join(" ");
            let products = {};
            res.data.map(product => {
                products[product.id] = {
                    ...product,
                    title: getTitle(product.title),
                    image: `/src/assets/${product.id}.jpg`,
                    count: 0,
                };
            });
            return products;
        } else return res.data;
    },
    error => {
        Promise.reject(error);
    }
);

export default api;
