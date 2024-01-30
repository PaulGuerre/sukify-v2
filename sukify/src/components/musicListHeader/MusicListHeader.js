import styles from './MusicListHeader.module.css';
import PlaylistActions from '../actionButtons/playlistActions/PlaylistActions';

export default function MusicListHeader({ title, musicCount, isPlaylist = false }) {
    
    return (
        <div className={styles.infos}>
            <p className={styles.title}>{ title }</p>
            <div className={styles.second}>
                { isPlaylist ? <PlaylistActions /> : null }
                <p className={styles.stat}>{ musicCount } { musicCount > 1 ? 'musics' : 'music' }</p>
            </div>
        </div>
    )
}
