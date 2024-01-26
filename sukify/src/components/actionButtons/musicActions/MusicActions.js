'use client'

import Image from 'next/image';
import styles from './MusicActions.module.css';
import dots from '@/lib/icons/dots.svg';
import { useState } from 'react';

export default function MusicActions() {
    const [ isVisible, setIsVisible ] = useState(false);

    return (
        <div className={styles.test} onMouseLeave={() => setIsVisible(!isVisible)}>
            <button className={styles.button} onClick={() => setIsVisible(!isVisible)}><Image src={dots} alt="three dots icon" /></button>
            {
                isVisible &&
                <div className={styles.menu}>
                    <button className={styles.menuAction}>Add</button>
                    <button className={styles.menuAction}>Edit</button>
                    <button className={styles.menuAction}>Delete</button>
                </div>
            }
        </div>
    );
}
