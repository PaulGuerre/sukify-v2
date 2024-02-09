'use client'

import { useSelector } from 'react-redux';
import styles from './player.module.css';

export default function Player() {
    const currentMusic = useSelector((state) => state.musics.currentMusic);

    return (
        <div className={styles.player}>
            <div className={styles.first}>
                { currentMusic.musicID && <img src={`https://img.youtube.com/vi/${currentMusic.musicID}/maxresdefault.jpg`} alt="music thumbnail" />}
                <div className={styles.infos}>
                    <p className={styles.title}>{currentMusic.musicTitle}</p>
                    <p className={styles.playlist}>{currentMusic.playlistName}</p>
                </div>
            </div>
            <div className={styles.second}>

            </div>
            <div className={styles.third}>

            </div>
        </div>
    );
}