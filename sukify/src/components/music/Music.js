import styles from "./Music.module.css";
import MusicActions from "../actionButtons/musicActions/MusicActions";
import PlayButton from "../actionButtons/playButton/PlayButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMusic } from "@/store/playerSlice";
import { setPlayingMusics } from "@/store/playerSlice";

export default function Music({ music }) {
    const dispatch = useDispatch();

    const currentPlaylist = useSelector((state) => state.playlists.currentPlaylist);
    const musics = useSelector((state) => state.musics.musics);
    const { currentMusic, isPlaying } = useSelector((state) => state.player);
    
    const [ isHovered, setIsHovered ] = useState(false);
    const [ isMusicPlaying, setIsMusicPlaying ] = useState(false);

    const isMobile = typeof window === 'undefined' ? false : window.innerWidth < 768 ? true : false;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds.toFixed(0)}`;
    }

    const play = (doCheck) => {
        if (doCheck) {
            if (isMobile) {
                dispatch(setCurrentMusic({ ...music, playlistID: currentPlaylist.id, playlistName: currentPlaylist.name }))
                dispatch(setPlayingMusics(musics));
            }
        } else {
            dispatch(setCurrentMusic({ ...music, playlistID: currentPlaylist.id, playlistName: currentPlaylist.name }));
            dispatch(setPlayingMusics(musics));
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
