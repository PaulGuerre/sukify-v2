'use client'

import styles from './page.module.css';
import PlaylistList from '@/components/playlistList/PlaylistList';
import Header from '@/components/header/Header';
import Player from '@/components/player/Player';

export default function Playlists() {
  return (
    <div className={styles.playlists}>
      <Header />
      <PlaylistList />
      <Player />
    </div>
  );
}
