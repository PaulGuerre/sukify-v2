import Image from 'next/image';
import styles from './AddPlaylist.module.css';
import plusWhite from '@/lib/icons/plus.svg';
import { useRef, useState } from 'react';
import CustomAlert from '@/components/customAlert/CustomAlert';
import { createPlaylist, getPlaylists } from '@/utils/api';
import { useDispatch } from 'react-redux';
import { setPlaylists } from '@/store/playlistsSlice';

export default function AddPlaylist() {
    const dispatch = useDispatch();

    const [ showAlert, setShowAlert ] = useState(false);
    const [ alertData, setAlertData ] = useState({});

    const playlistNameRef = useRef(null);

    const addPlaylist = () => {
        const data = {
            firstAction: () => {
                const playlistName = playlistNameRef.current;
                if (playlistName.value === '' || playlistName.value.length > 20) {
                    playlistName.className += ` ${styles.inputAlertInvalid}`;
                    return;
                }
                createPlaylist(playlistName.value).then(() => {
                    getPlaylists().then((res) => { dispatch(setPlaylists(res.data)); });
                });
                setShowAlert(false);
            },
            secondAction: () => setShowAlert(false),
            form: (
                <div className={styles.addAlert}>
                    <p className={styles.textAlert}>What is the name of the playlist ?</p>
                    <input type="text" ref={playlistNameRef} className={styles.inputAlert} />
                </div>
            )
        };
        setAlertData(data);
        setShowAlert(true);
    }

    return (
        <>
            { showAlert && <CustomAlert data={alertData} showAlert={showAlert} /> }
            <div className={`${styles.main} ${styles[`cover-${Math.floor(Math.random() * 4) + 1}`]}`} onClick={addPlaylist}>
                <Image src={plusWhite} alt="Plus icon" />
            </div>
        </>
    );
}
