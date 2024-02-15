import { setCurrentMusic, setIsPlaying } from "@/store/playerSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AudioManager({ handleTimeUpdate, volume, timer }) {
    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const { isPlaying, currentMusic, playingMusics, musicMode } = useSelector((state) => state.player);

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
        audioRef.current.ontimeupdate = () => handleTimeUpdate({
            timePercentage: (audioRef.current.currentTime / audioRef.current.duration) * 100, 
            currentTime: audioRef.current.currentTime, 
            duration: audioRef.current.duration
        });
    }, []);

    useEffect(() => {
        audioRef.current.currentTime = (timer / 100) * audioRef.current.duration || 0;
    }, [timer]);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);  

    return ( <audio ref={audioRef} /> )
}
