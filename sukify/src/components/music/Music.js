import styles from "./Music.module.css";
import MusicActions from "../actionButtons/musicActions/MusicActions";
import PlayButton from "../actionButtons/playButton/PlayButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMusic } from "@/store/musicsSlice";

export default function Music({ music }) {
    const dispatch = useDispatch();
    const currentPlaylist = useSelector((state) => state.playlists.currentPlaylist);
    const currentMusic = useSelector((state) => state.musics.currentMusic);
    const isPlaying = useSelector((state) => state.player.isPlaying);
    const [ isHovered, setIsHovered ] = useState(false);
    const [ isMusicPlaying, setIsMusicPlaying ] = useState(false);

    const isMobile = () => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth < 768 ? true : false;
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds.toFixed(0)}`;
    }

    const play = (doCheck) => {
        if (doCheck) {
            isMobile() ? dispatch(setCurrentMusic({ ...music, playlistName: currentPlaylist.name })) : null;
        } else {
            dispatch(setCurrentMusic({ ...music, playlistName: currentPlaylist.name }));
        }
    };

    useEffect(() => {
        if (currentMusic.id === music.id && isPlaying) {
            setIsMusicPlaying(true);
        } else {
            setIsMusicPlaying(false);
        }
    }, [currentMusic, isPlaying]);


    return (
        <div className={styles.music} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className={styles.main} onClick={() => play(true)}>
                { isHovered ? <PlayButton play={() => play(false)} isMusicPlaying={isMusicPlaying} /> : <div className={styles.musicKey}>{music.id}</div> }
                <img src={`https://img.youtube.com/vi/${music.musicID}/maxresdefault.jpg`} alt="music thumbnail" />
                <div className={styles.musicTitle}>{music.musicTitle}</div>
            </div>
            <div className={styles.second}>
                <MusicActions musicID={music.id} />
                <div className={styles.musicDuration}>{formatTime(music.musicDuration)}</div>
            </div>
        </div>
    );
}
