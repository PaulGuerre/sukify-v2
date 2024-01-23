'use client'

import Image from 'next/image';
import styles from './MusicActions.module.css';
import playColor from '@/lib/icons/play_color.svg';
import playDark from '@/lib/icons/play_dark.svg';
import editColor from '@/lib/icons/edit_color.svg';
import edit from '@/lib/icons/edit.svg';
import trashColor from '@/lib/icons/trash_color.svg';
import trash from '@/lib/icons/trash.svg';
import { useEffect, useState } from 'react';

export default function MusicActions() {
    const [ iconIdHovered, setIconIdHovered ] = useState([playDark, edit, trash]);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIconIdHovered([playColor, editColor, trashColor]);
        }
    }, []);

    const replaceIcon = (iconId, icon) => {
        if (window.innerWidth < 768 || iconIdHovered[iconId] === icon) return;
    
        const newIconsHovered = [...iconIdHovered];
        newIconsHovered[iconId] = icon;
        setIconIdHovered(newIconsHovered);
    }    

    return (
        <button className={styles.button} onMouseEnter={() => replaceIcon(0, playColor)} onMouseLeave={() => replaceIcon(0, playDark)}><Image src={iconIdHovered[0]} alt="play icon"/></button>

        // <div className={styles.actions}>
        //     <button className={styles.button} onMouseEnter={() => replaceIcon(0, playColor)} onMouseLeave={() => replaceIcon(0, playDark)}><Image src={iconIdHovered[0]} alt="play icon"/></button>
        //     <button className={styles.button} onMouseEnter={() => replaceIcon(1, editColor)} onMouseLeave={() => replaceIcon(1, edit)}><Image src={iconIdHovered[1]} alt="edit icon" /></button>
        //     <button className={styles.button} onMouseEnter={() => replaceIcon(2, trashColor)} onMouseLeave={() => replaceIcon(2, trash)}><Image src={iconIdHovered[2]} alt="delete icon" /></button>
        // </div>
    );
}
