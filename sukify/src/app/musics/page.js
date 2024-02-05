'use client'

import styles from './page.module.css';
import MusicList from '@/components/musicList/MusicList';
import { getMusics } from "@/utils/api";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setCurrentMusics, setMusics } from '@/store/musicsSlice';
import { setCurrentPlaylist } from '@/store/playlistsSlice';
import Player from '@/components/player/Player';

export default function Musics() {
  const dispatch = useDispatch();

  useEffect(() => {
      getMusics(1000, 0).then((res) => {
          dispatch(setMusics(res.data));
          dispatch(setCurrentMusics(res.data.slice(0, 10)));
      });
      dispatch(setCurrentPlaylist({ id: null, name: 'Musics' }));
  }, []);

  return (
    <div className={styles.musics}>
      <MusicList />
      <Player />
    </div>
  );
}
