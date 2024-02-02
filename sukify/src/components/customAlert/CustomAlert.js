import styles from './CustomAlert.module.css';

export default function CustomAlert({ data }) {
    return (
        <div className={styles.alert}>
            <div className={styles.main}>
                { data.form }
                <div className={styles.actions}>
                    <button className={styles.action} onClick={data.firstAction}>Validate</button>
                    <button className={styles.action} onClick={data.secondAction}>Cancel</button>
                </div>
            </div>
        </div>
    )
}