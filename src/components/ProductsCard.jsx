import { Link } from "react-router-dom";

import { TbListDetails as Details, TbShoppingCartPlus as Shopping } from "react-icons/tb";
import { FaMinus as Minus, FaPlus as Plus } from "react-icons/fa";
import { RiDeleteBin5Line as Delete } from "react-icons/ri";
import { IoMdPricetag as Price } from "react-icons/io";

import images from "../constants/images";
import styles from "./ProductsCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../features/checkout/checkoutSlice";

function ProductsCard({ data: product }) {
    const chosenProducts = useSelector(store => store.checkout.chosenProducts);

    const dispatch = useDispatch();

    // console.log(product);

    return (
        <div className={styles.container}>
            <img src={images[product.id - 1]} alt="no image" />
            <h3>{product.title}</h3>
            <span className={styles.price}>
                <Price className={styles.priceTag} />
                {product.price} $
            </span>
            <div className={styles.functions}>
                <Link to={product.id.toString()}>
                    <Details className={styles.details} />
                </Link>
                {chosenProducts[product.id] ? (
                    <div className={styles.buttons}>
                        {chosenProducts[product.id].count === 1 ? (
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
                        <span>{chosenProducts[product.id].count}</span>
                        <Plus
                            className={styles.button}
                            onClick={() =>
                                dispatch(
                                    change({
                                        product,
                                        number: 1,
                                    })
                                )
                            }
                        />
                    </div>
                ) : (
                    <Shopping
                        className={styles.shopping}
                        onClick={() =>
                            dispatch(
                                change({
                                    product,
                                    number: 1,
                                })
                            )
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default ProductsCard;
