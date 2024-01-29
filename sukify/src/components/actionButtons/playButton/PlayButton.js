import Image from 'next/image';
import styles from './PlayButton.module.css';
import playGrey from '@/lib/icons/play_grey.svg';
import playDark from '@/lib/icons/play_dark.svg';
import { useState } from 'react';

export default function PlayButton() {
    const [ iconIdHovered, setIconIdHovered ] = useState(false);  

    return (
        <button className={styles.button} onMouseEnter={() => setIconIdHovered(true)} onMouseLeave={() => setIconIdHovered(false)}><Image src={iconIdHovered ? playGrey : playDark} alt="play icon"/></button>
    );
}
