'use client'

import { useSelector } from "react-redux";
import styles from "./MusicList.module.css";
import MusicActions from "../musicActions/MusicActions";
import { useState } from "react";
import dots from '@/lib/icons/dots.svg';
import Image from "next/image";

export default function MusicList() {
    const musics = useSelector((state) => state.musics.musics);
    const [ idHovered, setIdHovered ] = useState(null);
    const isMobile = window.innerWidth < 768 ? true : false;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds.toFixed(0)}`;
    }

    // TODO : if mobile then on click div music start music else onClick on the icon hovered

    return (
        <div className={styles.musics}>
            {musics.map((music) => (
                <div key={music.id} className={styles.music} onMouseEnter={() => setIdHovered(music.id)} onMouseLeave={() => setIdHovered(null)}>
                    <div className={styles.main}>
                        { idHovered === music.id ? <MusicActions /> : <div className={styles.musicKey}>{music.id}</div> }
                        <img src={`https://img.youtube.com/vi/${music.musicID}/maxresdefault.jpg`} alt="music thumbnail" />
                        <div className={styles.musicTitle}>{music.musicTitle}</div>
                    </div>
                    <div className={styles.second}>
                        <button className={styles.dots}><Image src={dots} /></button>
                        <div className={styles.musicDuration}>{formatTime(music.musicDuration)}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
