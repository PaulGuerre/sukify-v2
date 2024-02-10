import Image from 'next/image';
import styles from './PlayButton.module.css';
import playGrey from '@/lib/icons/play_grey.svg';
import playDark from '@/lib/icons/play_dark.svg';
import pauseDark from '@/lib/icons/pause_dark.svg';
import pauseGrey from '@/lib/icons/pause_grey.svg';
import { useEffect, useState } from 'react';

export default function PlayButton({ play, isMusicPlaying }) {
    const [ iconIdHovered, setIconIdHovered ] = useState(false);
    const [ icon, setIcon ] = useState(playDark);

    useEffect(() => {
        if (isMusicPlaying) {
            setIcon(iconIdHovered ? pauseGrey : pauseDark);
        } else {
            setIcon(iconIdHovered ? playGrey : playDark);
        }
    }, [isMusicPlaying, iconIdHovered]);

    return (
        <button className={styles.button} onClick={play} onMouseEnter={() => setIconIdHovered(true)} onMouseLeave={() => setIconIdHovered(false)}><Image src={icon} alt="play icon"/></button>
    );
}
