'use client'

import styles from './page.module.css'
import MusicList from '@/components/musicList/MusicList'
import Header from '@/components/header/Header';
import { getPlaylistMusics, getPlaylist } from "@/utils/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setMusics } from '@/store/musicsSlice';
import { setCurrentPlaylist } from '@/store/playlistsSlice';

export default function Playlist({ params }) {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists.playlists);
  const playlistName = playlists.find((playlist) => playlist.id === +params.id)?.name;

  useEffect(() => {
    getPlaylistMusics(params.id, 10, 0).then((res) => {
      dispatch(setMusics(res.data));
    });
    dispatch(setCurrentPlaylist({ id: params.id, name: playlistName }));
  }, []);

  return (
    <div className={styles.playlist}>
      <Header />
      <MusicList title={playlistName} isPlaylist={true} />
    </div>
  )
}
