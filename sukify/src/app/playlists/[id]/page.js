'use client'

import styles from './page.module.css'
import MusicList from '@/components/music/MusicList'
import Header from '@/components/header/Header';
import { getPlaylistMusics, getPlaylist } from "@/utils/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setMusics } from '@/store/musicsSlice';
import { setCurrentPlaylist } from '@/store/playlistsSlice';

export default function Playlist({ params }) {
  const dispatch = useDispatch();
  const currentPlaylist = useSelector((state) => state.playlists.currentPlaylist);

  useEffect(() => {
    getPlaylist(params.id).then((res) => {
      dispatch(setCurrentPlaylist(res.data));
    });
    getPlaylistMusics(params.id, 10, 0).then((res) => {
      dispatch(setMusics(res.data));
    });
  }, []);

  return (
    <div className={styles.playlist}>
      <Header />
      <div className={styles.main}>
        <div className={styles.infos}>
          <p className={styles.title}>{currentPlaylist.name}</p>
          <p className={styles.stat}>{currentPlaylist.MusicCount} musics</p>
        </div>
        <MusicList />
      </div>
    </div>
  )
}
