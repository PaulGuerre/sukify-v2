'use client'

import styles from './page.module.css'
import MusicList from '@/components/MusicList'
import { getPlaylist } from "@/utils/api";
import { useState, useEffect } from "react";

export default function Playlist({ params }) {
  const [musics, setMusics] = useState([]);

  useEffect(() => {
      getPlaylist(params.id, 10, 0).then((res) => {
          setMusics(res.data);
      });
  }, []);

  return (
    <>
      <p>This is the playlist route : { params.id}</p>
      { musics.length > 0 && <MusicList musics={musics} /> }
    </>
  )
}
