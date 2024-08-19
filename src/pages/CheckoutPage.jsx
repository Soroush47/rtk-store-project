import styles from "./CheckoutPage.module.css";
import { FaMinus as Minus, FaPlus as Plus } from "react-icons/fa";
import { RiDeleteBin5Line as Delete } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits as Quantity } from "react-icons/md";
import { IoCheckmarkCircle as Check } from "react-icons/io5";
import { TbChecklist } from "react-icons/tb";

import images from "../constants/images";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change, checkout } from "../features/checkout/checkoutSlice";

function CheckoutPage() {

    const totalCost = useSelector(store => store.checkout.totalCost);
    const totalItems = useSelector(store => store.checkout.totalItems);
    const chosenProducts = useSelector(store => store.checkout.chosenProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scroll(0, 0);
    });

    const getTitle = title => {
        title = title.split(" ");
        return [title[0], title[1], title[2]].join(" ");
    };

    const dispatchHandler = (id, count) => {
        dispatch({
            type: "CHANGE",
            payload: {
                id,
                count,
            },
        });
    };

    return (
        <>
            {!!Object.keys(chosenProducts).length ? (
                <div className={styles.container}>
                    <div className={styles.details}>
                        <p>
                            <span>
                                <TbChecklist className={styles.icon} />
                                Total :
                            </span>
                            {totalCost} $
                        </p>
                        <p>
                            <span>
                                <Quantity className={styles.icon} />
                                Quantity :
                            </span>
                            {totalItems}
                        </p>
                        <p>
                            <span>
                                <Check className={styles.icon} />
                                Status :
                            </span>
                            pending...
                        </p>
                        <button onClick={() => dispatch(checkout())}>Checkout</button>
                    </div>
                    <div className={styles.products}>
                        {Object.values(chosenProducts).map(product => (
                            <div className={styles.product} key={product.id}>
                                <img src={images[product.id - 1]} alt="no image" />
                                <div className={styles.title}>
                                    <div className={styles.count}>
                                        <p>{product.title} </p>
                                        <div className={styles.buttons}>
                                            {product.count === 1 ? (
                                                <Delete
                                                    className={styles.delete}
                                                    onClick={() =>
                                                        dispatch(
                                                            change({
                                                                product,
                                                                number: -1,
                                                            })
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <Minus
                                                    className={styles.button}
                                                    onClick={() =>
                                                        dispatch(
                                                            change({
                                                                product,
                                                                number: -1,
                                                            })
                                                        )
                                                    }
                                                />
                                            )}
                                            {product.count}
                                            <Plus
                                                className={styles.button}
                                                onClick={() =>
                                                    dispatch(
                                                        change({
                                                            product,
                                                            number: +1,
                                                        })
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <span>Price: {product.price}$</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.empty}>
                    <span>Your basket is empty!</span>{" "}
                </div>
            )}
        </>
    );
}

export default CheckoutPage;
