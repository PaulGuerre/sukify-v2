'use client'

import styles from './page.module.css';
import MusicList from '@/components/MusicList';
import { getMusics } from "@/utils/api";
import { useState, useEffect } from "react";

export default function Musics() {
  const [musics, setMusics] = useState([]);

  useEffect(() => {
      getMusics(10, 0).then((res) => {
          setMusics(res.data);
      });
  }, []);

  return (
    <>
      <p>This is the musics route</p>
      { musics.length > 0 && <MusicList musics={musics} /> }
    </>
  );
}
