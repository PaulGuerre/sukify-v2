'use client'

import styles from "./MusicList.module.css";
import Music from "../music/Music";
import { useSelector } from "react-redux";
import MusicListHeader from "../musicListHeader/MusicListHeader";
import Loader from "../loader/Loader";
import { useEffect, useState } from "react";
import Image from "next/image";
import sad from '@/lib/icons/sad.svg';
import Pagination from "../pagination/Pagination";

export default function MusicList({ title = 'Musics', isPlaylist = false }) {
    const { musics, currentMusics } = useSelector((state) => state.musics);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [musics]);

    return (
        isLoading ? <Loader /> : <div className={styles.musics}>
            <MusicListHeader title={title} musicCount={musics.length} isPlaylist={isPlaylist} />
            { currentMusics.length ? currentMusics.map((music) => <Music key={music.id} music={music} /> ) : <div className={styles.empty}><Image src={sad} alt="Sad emoji icon" /></div> }
            <Pagination />
        </div>
    );
}
