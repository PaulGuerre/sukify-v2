'use client'

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import PlaylistList from '@/components/playlistList/PlaylistList';
import Loader from '@/components/loader/Loader';

export default function Playlists() {
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    isLoading ? <Loader /> : <div className={styles.playlists}><PlaylistList /></div>
  );
}
