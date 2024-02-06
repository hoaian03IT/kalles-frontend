import styles from "~/styles/Loading.module.scss";

export const Loading = () => {
    return (
        <div className={styles.wrapper}>
            <span className={styles.loader}></span>
        </div>
    );
};
