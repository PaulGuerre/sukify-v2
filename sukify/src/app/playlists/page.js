import styles from './page.module.css';
import PlaylistList from '@/components/PlaylistList';
import Header from '@/components/header/Header';

export default function Playlists() {
  return (
    <div className={styles.playlists}>
      <Header />
      <PlaylistList />
    </div>
  );
}
