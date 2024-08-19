import { RotatingLines } from "react-loader-spinner";

import styles from "./Loader.module.css";

function Loader() {
    return (
        <div className={styles.loader}>
            <RotatingLines
                width="70px"
                height="70px"
                strokeWidth="2"
                strokeColor="#000000"
                wrapperClass={styles.spinner}
            />
        </div>
    );
}

export default Loader;
