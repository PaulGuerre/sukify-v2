'use client'

import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import styles from './player.module.css';
import { setIsPlaying, setPlayingMusics } from '@/store/playerSlice';
import Image from 'next/image';
import pause from '@/lib/icons/pause.svg';
import play from '@/lib/icons/play.svg';
import previous from '@/lib/icons/previous.svg';
import next from '@/lib/icons/next.svg';
import AudioManager from '../AudioManager/AudioManager';
import { setCurrentMusic } from '@/store/playerSlice';

export default function Player() {
    const dispatch = useDispatch();
    
    const currentPlaylist = useSelector((state) => state.playlists.currentPlaylist);
    const musics = useSelector((state) => state.musics.musics);
    const { playingMusics, currentMusic, isPlaying } = useSelector((state) => state.player);

    const [ musicTime, setMusicTime ] = useState(0);
    const [ volume, setVolume ] = useState(0.5);
    const [ timer, setTimer ] = useState(0);

    const handleTimeUpdate = (newMusicTime) => {
        setMusicTime(newMusicTime);
    };

    const changeMusic = useCallback((offset) => {
        const currentIndex = playingMusics.findIndex((music) => music.musicID === currentMusic.musicID);
        const newIndex = (currentIndex + offset + playingMusics.length) % playingMusics.length;
        dispatch(setCurrentMusic({ ...currentMusic, ...playingMusics[newIndex] }));
    }, [dispatch, playingMusics, currentMusic]);

    const playNext = () => changeMusic(1);
    const playPrevious = () => changeMusic(-1);

    const handlePlay = () => {
        if (!currentMusic.musicID) {
            dispatch(setPlayingMusics(musics));
            dispatch(setCurrentMusic({ ...musics[0], playlistID: currentPlaylist.id, playlistName: currentPlaylist.name }));
        } else {
            dispatch(setIsPlaying(!isPlaying));
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds.toFixed(0)}`;
    }

    return (
        <div className={styles.player}>
            <AudioManager handleTimeUpdate={handleTimeUpdate} volume={volume} timer={timer} />
            <div className={styles.first}>
                { currentMusic.musicID && <img src={`https://img.youtube.com/vi/${currentMusic.musicID}/maxresdefault.jpg`} alt="music thumbnail" />}
                <div className={styles.infos}>
                    <p className={styles.title}>{currentMusic.musicTitle}</p>
                    <p className={styles.playlist}>{currentMusic.playlistName}</p>
                </div>
            </div>
            <div className={styles.second}>
                <div className={styles.controls}>
                    <Image onClick={playPrevious} src={previous} alt="previous icon" />
                    <Image onClick={handlePlay} src={isPlaying ? pause : play} alt="play icon" />
                    <Image onClick={playNext} src={next} alt="next icon" />
                </div>
                <div className={styles.time}>
                    <p>{ musicTime.currentTime ? formatTime(musicTime.currentTime) : '' }</p>
                    <input type="range" min="0" max="100" step="0.01" value={musicTime.timePercentage || 0} onChange={(e) => setTimer(e.target.value)} />
                    <p>{ musicTime.duration ? formatTime(musicTime.duration) : '' }</p>
                </div>
            </div>
            <div className={styles.third}>
                <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(e.target.value)} />
            </div>
        </div>
    );
}