import { Link } from "react-router-dom";

import styles from "./Layout.module.css";
import { FaBasketShopping as Basket } from "react-icons/fa6";
import { useSelector } from "react-redux";

function Layout({ children }) {
    const totalItems = useSelector(store => store.checkout.totalItems);

    return (
        <div className={styles.container}>
            <div>
                <header className={styles.header}>
                    <Link to="/products" className={styles.shop}>
                        OnlineShop
                    </Link>
                    <div className={styles.myLink}>
                        <a href="https://github.com/Soroush47" className={styles.a}>
                            My Github
                        </a>
                        | React.js Project
                        <Link to="/checkout" className={styles.basketButton}>
                            {!!totalItems && <span>{totalItems}</span>}
                            <Basket className={styles.basket} />
                        </Link>
                    </div>
                </header>
                <div className={styles.body}>{children}</div>
            </div>
            <footer className={styles.footer}>
                <p>
                    Developed by <span>Soroush Ghasemi</span>
                </p>
            </footer>
        </div>
    );
}

export default Layout;
