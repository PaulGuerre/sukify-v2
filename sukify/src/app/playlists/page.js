import Player from '@/components/player/Player';
import styles from './page.module.css';
import PlaylistList from '@/components/playlistList/PlaylistList';

export default function Playlists() {
  return (
    <div className={styles.playlists}>
      <PlaylistList />
      <Player />
    </div>
  );
}
