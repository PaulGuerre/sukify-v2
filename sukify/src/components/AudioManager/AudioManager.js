'use client'

import { setCurrentMusic, setIsPlaying, setMusicTime } from "@/store/playerSlice";
import { getMusic } from "@/utils/api";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AudioManager() {
    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const [ currentMusicID, setCurrentMusicID ] = useState(null);
    const { isPlaying, currentMusic, playingMusics, musicMode, musicVolume, timer } = useSelector((state) => state.player);

    useEffect(() => {
        if (!currentMusic.musicID) return;
        if (currentMusicID !== currentMusic.musicID) {
            dispatch(setIsPlaying(false));
            getMusic(currentMusic.musicID).then((res) => {
                audioRef.current.src = URL.createObjectURL(res.data);
                audioRef.current.load();
                audioRef.current.oncanplay = () => dispatch(setIsPlaying(true));
                setCurrentMusicID(currentMusic.musicID);
            });
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
    
    useEffect(() => {
        audioRef.current.onended = () => {
            if (musicMode === 'repeat') {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            } else if (musicMode === 'shuffle') {
                const randomIndex = Math.floor(Math.random() * playingMusics.length);
                dispatch(setCurrentMusic({ ...playingMusics[randomIndex], playlistID: currentMusic.playlistID, playlistName: currentMusic.playlistName }));
            } else {
                const currentIndex = playingMusics.findIndex((music) => music.musicID === currentMusic.musicID);
                const nextIndex = (currentIndex + 1) % playingMusics.length;
                dispatch(setCurrentMusic({ ...playingMusics[nextIndex], playlistID: currentMusic.playlistID, playlistName: currentMusic.playlistName }));
            }
        }
    }, [playingMusics, currentMusic, musicMode]);

    useEffect(() => {
        audioRef.current.onpause = () => dispatch(setIsPlaying(false));
        audioRef.current.onplay = () => dispatch(setIsPlaying(true));
        audioRef.current.ontimeupdate = () => dispatch(setMusicTime({
            currentTime: audioRef.current.currentTime,
            duration: audioRef.current.duration,
            timePercentage: (audioRef.current.currentTime / audioRef.current.duration) * 100
        }));
    }, []);

    useEffect(() => {
        audioRef.current.currentTime = (timer / 100) * audioRef.current.duration || 0;
    }, [timer]);

    useEffect(() => {
        audioRef.current.volume = musicVolume;
    }, [musicVolume]);  

    return ( <audio ref={audioRef} /> )
}
