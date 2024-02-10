'use client'

import { useDispatch, useSelector } from 'react-redux';
import styles from './player.module.css';
import { useEffect, useRef } from 'react';
import { setIsPlaying } from '@/store/playerSlice';
import Image from 'next/image';
import pauseDark from '@/lib/icons/pause_dark.svg';
import playDark from '@/lib/icons/play_dark.svg';

export default function Player() {
    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const currentMusic = useSelector((state) => state.musics.currentMusic);
    const { isPlaying } = useSelector((state) => state.player);

    useEffect(() => {
        if (!currentMusic.musicID) return;
        if (audioRef.current.src !== `http://localhost:7000/getMusic/${currentMusic.musicID}`) {
            dispatch(setIsPlaying(false));
            audioRef.current.src = `http://localhost:7000/getMusic/${currentMusic.musicID}`;
            audioRef.current.load();
            audioRef.current.oncanplay = () => dispatch(setIsPlaying(true));
        } else {
            dispatch(setIsPlaying(!isPlaying));
        }
    }, [currentMusic])

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying])

    return (
        <div className={styles.player}>
            <audio ref={audioRef} />
            <div className={styles.first}>
                { currentMusic.musicID && <img src={`https://img.youtube.com/vi/${currentMusic.musicID}/maxresdefault.jpg`} alt="music thumbnail" />}
                <div className={styles.infos}>
                    <p className={styles.title}>{currentMusic.musicTitle}</p>
                    <p className={styles.playlist}>{currentMusic.playlistName}</p>
                </div>
            </div>
            <div className={styles.second}>
                <Image onClick={() => dispatch(setIsPlaying(!isPlaying))} src={isPlaying ? pauseDark : playDark} alt="play icon" />
            </div>
            <div className={styles.third}>

            </div>
        </div>
    );
}