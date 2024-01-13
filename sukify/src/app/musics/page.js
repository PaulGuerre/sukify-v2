'use client'

import Header from '@/components/header/Header';
import styles from './page.module.css';
import MusicList from '@/components/music/MusicList';
import { getMusics } from "@/utils/api";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setMusics } from '@/store/musicsSlice';

export default function Musics() {
  const dispatch = useDispatch();

  useEffect(() => {
      getMusics(10, 0).then((res) => {
          dispatch(setMusics(res.data));
      });
  }, []);

  return (
    <div className={styles.musics}>
      <Header />
      <MusicList />
    </div>
  );
}
