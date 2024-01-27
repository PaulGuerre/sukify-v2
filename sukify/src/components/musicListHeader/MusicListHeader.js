import styles from './MusicListHeader.module.css';

export default function MusicListHeader({ title, musicCount, isPlaylist = false }) {
    
    return (
        <div className={styles.infos}>
            <p className={styles.title}>{ title }</p>
            <div className={styles.second}>
                { isPlaylist ? <p className={styles.stat}>Playlist</p> : null }
                <p className={styles.stat}>{ musicCount } { musicCount > 1 ? 'musics' : 'music' }</p>
            </div>
        </div>
    )
}
