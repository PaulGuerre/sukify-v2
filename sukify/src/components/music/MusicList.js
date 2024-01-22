'use client'

import { useSelector } from "react-redux";
import styles from "./MusicList.module.css";
import MusicActions from "../musicActions/MusicActions";

export default function MusicList() {
    const musics = useSelector((state) => state.musics.musics);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds.toFixed(0)}`;
    }

    return (
        <div className={styles.musics}>
            {musics.map((music) => (
                <div key={music.id} className={styles.music}>
                    <div className={styles.main}>
                        <img src={`https://img.youtube.com/vi/${music.musicID}/maxresdefault.jpg`} alt="music thumbnail" />
                        <div className={styles.musicTitle}>{music.musicTitle}</div>
                        <MusicActions />
                    </div>
                    <div className={styles.musicDuration}>{formatTime(music.musicDuration)}</div>
                </div>
            ))}
        </div>
    );
}
