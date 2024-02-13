import { setCurrentMusic, setIsPlaying } from "@/store/playerSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AudioManager({ handleTimeUpdate }) {
    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const playingMusics = useSelector((state) => state.player.playingMusics);
    const currentMusic = useSelector((state) => state.player.currentMusic);
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
    
    useEffect(() => {
        audioRef.current.onended = () => {
            const currentIndex = playingMusics.findIndex((music) => music.musicID === currentMusic.musicID);
            const nextIndex = (currentIndex + 1) % playingMusics.length;
            dispatch(setCurrentMusic({ ...playingMusics[nextIndex], playlistID: currentMusic.playlistID, playlistName: currentMusic.playlistName }));
        }
    }, [playingMusics, currentMusic]);

    useEffect(() => {
        audioRef.current.ontimeupdate = () => handleTimeUpdate({
            timePercentage: (audioRef.current.currentTime / audioRef.current.duration) * 100, 
            currentTime: audioRef.current.currentTime, 
            duration: audioRef.current.duration
        });
    }, [handleTimeUpdate]);

    return ( <audio ref={audioRef} /> )
}
