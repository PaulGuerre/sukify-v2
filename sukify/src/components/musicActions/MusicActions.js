import Image from 'next/image';
import styles from './MusicActions.module.css';
import playColor from '@/lib/icons/play_color.svg';
import editColor from '@/lib/icons/edit_color.svg';
import trashColor from '@/lib/icons/trash_color.svg';

export default function MusicActions() {
    return (
        <div className={styles.actions}>
            <button className={styles.button}><Image src={playColor} alt="play icon"/></button>
            <button className={styles.button}><Image src={editColor} alt="edit icon" /></button>
            <button className={styles.button}><Image src={trashColor} alt="delete icon" /></button>
        </div>
    );
}
