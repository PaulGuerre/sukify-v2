'use client'

import styles from './page.module.css'
import MusicList from '@/components/musicList/MusicList'
import { getPlaylistMusics } from "@/utils/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMusics, setMusics } from '@/store/musicsSlice';
import { setCurrentPlaylist } from '@/store/playlistsSlice';
import Loader from '@/components/loader/Loader';

export default function Playlist({ params }) {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists.playlists);
  const [ isLoading, setIsLoading ] = useState(true);
  
  const playlistName = playlists.find((playlist) => playlist.id === +params.id)?.name;

  useEffect(() => {
    setIsLoading(false);
    getPlaylistMusics(params.id, 10000, 0).then((res) => {
      dispatch(setMusics(res.data));
      dispatch(setCurrentMusics(res.data.slice(0, 10)));
    });
  }, []);

  useEffect(() => {
    dispatch(setCurrentPlaylist({ id: params.id, name: playlistName }));
  }, [playlistName]);

  return (
   isLoading ? <Loader /> : <div className={styles.playlist}><MusicList title={playlistName} isPlaylist={true} /></div>
  )
}
