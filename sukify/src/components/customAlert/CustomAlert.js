import styles from './CustomAlert.module.css';

export default function CustomAlert({ data }) {
    return (
        <div className={styles.alert}>
            <div className={styles.main}>
                { data.form }
                <div className={styles.actions}>
                    <button className={styles.action} onClick={data.firstAction}>Yes</button>
                    <button className={styles.action} onClick={data.secondAction}>No</button>
                </div>
            </div>
        </div>
    )
}