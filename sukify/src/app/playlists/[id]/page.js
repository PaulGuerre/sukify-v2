'use client'

import styles from './page.module.css'
import MusicList from '@/components/music/MusicList'
import Header from '@/components/header/Header';
import { getPlaylist } from "@/utils/api";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';

export default function Playlist({ params }) {
  const dispatch = useDispatch();

  useEffect(() => {
      getPlaylist(params.id, 10, 0).then((res) => {
          dispatch(setMusics(res.data));
      });
  }, []);

  return (
    <div className={styles.Playlist}>
      <Header />
      <MusicList />
    </div>
  )
}
