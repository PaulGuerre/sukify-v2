'use client'

import { useSelector } from "react-redux";
import styles from "./MusicList.module.css";
import { useState } from "react";
import PlayButton from "../actionButtons/playButton/PlayButton";
import MusicActions from "../actionButtons/musicActions/MusicActions";

export default function MusicList({ title = 'Musics' }) {
    const musics = useSelector((state) => state.musics.musics);
    const [ idHovered, setIdHovered ] = useState(null);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds.toFixed(0)}`;
    }

    return (
        <div className={styles.musics}>
            <div className={styles.infos}>
                <p className={styles.title}>{ title }</p>
                <p className={styles.stat}>{ musics.length} { musics.length > 1 ? 'musics' : 'music' }</p>
            </div>
            {
                musics.length ? musics.map((music) => (
                    <div key={music.id} className={styles.music} onMouseEnter={() => setIdHovered(music.id)} onMouseLeave={() => setIdHovered(null)}>
                        <div className={styles.main}>
                            { idHovered === music.id ? <PlayButton /> : <div className={styles.musicKey}>{music.id}</div> }
                            <img src={`https://img.youtube.com/vi/${music.musicID}/maxresdefault.jpg`} alt="music thumbnail" />
                            <div className={styles.musicTitle}>{music.musicTitle}</div>
                        </div>
                        <div className={styles.second}>
                            <MusicActions />
                            <div className={styles.musicDuration}>{formatTime(music.musicDuration)}</div>
                        </div>
                    </div>
                )) : <p className={styles.empty}>No musics :/</p>
            }
        </div>
    );
}
