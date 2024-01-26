'use client'

import styles from './page.module.css'
import MusicList from '@/components/music/MusicList'
import Header from '@/components/header/Header';
import { getPlaylistMusics, getPlaylist } from "@/utils/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setMusics } from '@/store/musicsSlice';

export default function Playlist({ params }) {
  const dispatch = useDispatch();
  const [ playlist, setPlaylist ] = useState(null);

  useEffect(() => {
    getPlaylist(params.id).then((res) => {
      setPlaylist(res.data);
    });
    getPlaylistMusics(params.id, 10, 0).then((res) => {
      dispatch(setMusics(res.data));
    });
  }, []);

  return (
    <div className={styles.playlist}>
      <Header />
        <MusicList title={playlist?.name} />
    </div>
  )
}
