'use client'

import { useSelector } from "react-redux";
import styles from "./PlaylistList.module.css";
import Playlist from "../playlist/Playlist";
import Loader from "../loader/Loader";
import { useEffect, useState } from "react";
import Image from "next/image";
import sad from '@/lib/icons/sad.svg';
import AddPlaylist from "../actionButtons/addPlaylist/AddPlaylist";

export default function PlaylistList() {
  const playlists = useSelector((state) => state.playlists.playlists);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [playlists.length]);

  return (
    isLoading ? <Loader /> : <div className={styles.playlists}>
      { playlists.length ? (<>{ playlists.map((playlist) => <Playlist key={playlist.id} playlist={playlist} /> )} <AddPlaylist /></>) : <div className={styles.empty}><Image src={sad} alt="Sad emoji icon" /></div> }
    </div>
  );
}
