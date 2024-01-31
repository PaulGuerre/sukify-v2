import Image from 'next/image'
import styles from './Loader.module.css'
import infiniteSpinner from '@/lib/icons/infinite_spinner.svg'

export default function Loader() {
    return (
        <div className={styles.loader}>
            <Image src={infiniteSpinner} alt="Loading..." />
        </div>
    )
}
