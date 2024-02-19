'use client'

import styles from './page.module.css';
import PlaylistList from '@/components/playlistList/PlaylistList';
import Header from '@/components/header/Header';
import Player from '@/components/player/Player';
import withAuth from '@/components/HOC/withAuth';

function Playlists() {
  return (
    <div className={styles.playlists}>
      <Header />
      <PlaylistList />
      <Player />
    </div>
  );
}

export default withAuth(Playlists);
