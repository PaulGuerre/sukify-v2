import styles from "./Music.module.css";
import MusicActions from "../actionButtons/musicActions/MusicActions";
import PlayButton from "../actionButtons/playButton/PlayButton";

export default function Music({ music }) {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds.toFixed(0)}`;
    }

    const isHovered = (id) => id === music.id;

    return (
        <div className={styles.music} onMouseEnter={() => isHovered(music.id)} onMouseLeave={() => isHovered(null)}>
            <div className={styles.main}>
                { isHovered(music.id) ? <PlayButton /> : <div className={styles.musicKey}>{music.id}</div> }
                <img src={`https://img.youtube.com/vi/${music.musicID}/maxresdefault.jpg`} alt="music thumbnail" />
                <div className={styles.musicTitle}>{music.musicTitle}</div>
            </div>
            <div className={styles.second}>
                <MusicActions musicID={music.id} />
                <div className={styles.musicDuration}>{formatTime(music.musicDuration)}</div>
            </div>
        </div>
    );
}
