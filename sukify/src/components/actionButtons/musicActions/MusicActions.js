import Image from 'next/image';
import styles from './MusicActions.module.css';
import dots from '@/lib/icons/dots.svg';
import { useRef, useState } from 'react';
import CustomAlert from '@/components/customAlert/CustomAlert';
import { addMusicToPlaylist, deleteMusic, deleteMusicFromPlaylist, getMusics, getPlaylistMusics, updateMusic } from '@/utils/api';
import { setCurrentMusics, setMusics } from '@/store/musicsSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function MusicActions({ musicID }) {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.playlists.playlists);
    const playlistID = useSelector((state) => state.playlists.currentPlaylist.id);
    const musicVideoID = useSelector((state) => state.musics.musics.find((music) => music.id === musicID).musicID);
    const currentIndex = useSelector((state) => state.musics.currentIndex);

    const [ isVisible, setIsVisible ] = useState(false);
    const [ showAlert, setShowAlert ] = useState(false);
    const [ alertData, setAlertData ] = useState({});

    const newMusicNameRef = useRef(null);

    const updateMusics = (res) => {
        dispatch(setMusics(res.data));
        dispatch(setCurrentMusics(res.data.slice(currentIndex, currentIndex + 10)));
    }

    const renameMusic = () => {
        const data = {
            firstAction: () => {
                const newMusicName = newMusicNameRef.current;
                if (newMusicName.value === '' || newMusicName.value.length > 50) {
                   newMusicName.className += ` ${styles.inputAlertInvalid}`;
                    return;
                }
                updateMusic(musicID, newMusicName.value).then(() => {
                    playlistID ? getPlaylistMusics(playlistID, 1000, 0).then((res) => { updateMusics(res); }) : getMusics(1000, 0).then((res) => { updateMusics(res); });
                });
                setShowAlert(false);
            },
            secondAction: () => setShowAlert(false),
            form: (
                <div className={styles.renameAlert}>
                    <p className={styles.textAlert}>What is the new name of the music ?</p>
                    <input type="text" ref={musicNewNameRef} className={styles.inputAlert} />
                </div>
            )
        };
        setAlertData(data);
        setShowAlert(true);
        setIsVisible(false);
    }

    const removeMusicFromPlaylist = () => {
        const data = {
            firstAction: () => {
                deleteMusicFromPlaylist(playlistID, musicID).then(() => {
                    getPlaylistMusics(playlistID, 1000, 0).then((res) => { updateMusics(res); });
                });
                setShowAlert(false);
            },
            secondAction: () => setShowAlert(false),
            form: (
                <div>
                    <p className={styles.textAlert}>Are you sure you want to delete this music from the playlist ?</p>
                </div>
            )
        };
        setAlertData(data);
        setShowAlert(true);
        setIsVisible(false);
    }

    const removeMusic = () => {        
        const data = {
            firstAction: () => {
                deleteMusic(musicVideoID).then(() => {
                    getMusics(1000, 0).then((res) => { updateMusics(res); });
                });
                setShowAlert(false);
            },
            secondAction: () => setShowAlert(false),
            form: (
                <div>
                    <p className={styles.textAlert}>Are you sure you want to delete this music ?</p>
                </div>
            )
        };
        setAlertData(data);
        setShowAlert(true);
        setIsVisible(false);
    }

    const addMusic = () => {
        const data = {
            firstAction: () => {
                addMusicToPlaylist(document.getElementById('playlistChosen').value, musicID);
                setShowAlert(false);
            },
            secondAction: () => setShowAlert(false),
            form: (
                <div>
                    <p className={styles.textAlert}>To which playlist do you want to add this music ?</p>
                    <select id='playlistChosen' className={styles.addToPlaylistAlert}>
                        { playlists.map((playlist) => <option key={playlist.id} value={playlist.id}>{playlist.name}</option>) }
                    </select>
                </div>
            )
        };
        setAlertData(data);
        setShowAlert(true);
        setIsVisible(false);
    }

    return (
        <div className={styles.main} onMouseLeave={() => setIsVisible(!isVisible)}>
            { showAlert && <CustomAlert data={alertData} /> }
            <button className={styles.button} onClick={() => setIsVisible(!isVisible)}><Image src={dots} alt="three dots icon" /></button>
            {
                isVisible &&
                <div className={styles.menu}>
                    <button className={styles.menuAction} onClick={addMusic}>Add</button>
                    <button className={styles.menuAction} onClick={renameMusic}>Edit</button>
                    <button className={styles.menuAction} onClick={playlistID ? removeMusicFromPlaylist : removeMusic}>Delete</button>
                </div>
            }
        </div>
    );
}
