'use client'

import styles from "./MusicList.module.css";
import Music from "../music/Music";
import { useSelector } from "react-redux";
import MusicListHeader from "../musicListHeader/MusicListHeader";

export default function MusicList({ title = 'Musics', isPlaylist = false }) {
    const musics = useSelector((state) => state.musics.musics);

    return (
        <div className={styles.musics}>
            <MusicListHeader title={title} musicCount={musics.length} isPlaylist={isPlaylist} />
            { musics.length ? musics.map((music) => <Music key={music.id} music={music} /> ) : <p className={styles.empty}>No musics :/</p> }
        </div>
    );
}
