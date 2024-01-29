import styles from './MusicListHeader.module.css';
import PlaylistActions from '../actionButtons/playlistActions/PlaylistActions';

export default function MusicListHeader({ title, musicCount, playlistID }) {
    
    return (
        <div className={styles.infos}>
            <p className={styles.title}>{ title }</p>
            <div className={styles.second}>
                { playlistID ? <PlaylistActions playlistID={playlistID} /> : null }
                <p className={styles.stat}>{ musicCount } { musicCount > 1 ? 'musics' : 'music' }</p>
            </div>
        </div>
    )
}
