import styles from './PlaylistActions.module.css';
import Image from 'next/image';
import edit from '@/lib/icons/edit.svg';
import editGrey from '@/lib/icons/edit_grey.svg';
import trash from '@/lib/icons/trash.svg';
import trashColor from '@/lib/icons/trash_color.svg';
import { useRef, useState } from 'react';
import CustomAlert from '@/components/customAlert/CustomAlert';
import { getPlaylists, updatePlaylist, deletePlaylist } from '@/utils/api';
import { setPlaylists } from '@/store/playlistsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setCurrentMusic, setIsPlaying } from '@/store/playerSlice';
import { setLog } from '@/store/apiSlice';

export default function PlaylistActions() {
    const router = useRouter();
    const dispatch = useDispatch();

    const playlistID = useSelector((state) => state.playlists.currentPlaylist.id);
    const { currentMusic, isPlaying } = useSelector((state) => state.player);

    const [ isEditHovered, setIsEditHovered ] = useState(false);
    const [ isTrashHovered, setIsTrashHovered ] = useState(false);
    const [ showAlert, setShowAlert ] = useState(false);
    const [ alertData, setAlertData ] = useState({});

    const playlistNewNameRef = useRef(null);

    const renamePlaylist = () => {
        const data = {
            firstAction: () => {
                const playlistNewName = playlistNewNameRef.current;
                if (playlistNewName.value === '' || playlistNewName.value.length > 20) {
                    playlistNewName.className += ` ${styles.inputAlertInvalid}`;
                    return;
                }
                updatePlaylist(playlistID, playlistNewName.value).then((res) => {
                    dispatch(setLog({ message: res.data, status: res.status }));
                    if (res.status !== 200) return;
                    getPlaylists().then((res) => { dispatch(setPlaylists(res.data)); });
                    if (currentMusic.playlistID === playlistID) {
                        dispatch(setCurrentMusic({ ...currentMusic, playlistName: playlistNewName.value }));
                        dispatch(setIsPlaying(!isPlaying));
                    }
                });
                setShowAlert(false);
            },
            secondAction: () => setShowAlert(false),
            form: (
                <div className={styles.renameAlert}>
                    <p className={styles.textAlert}>What is the new name of the playlist ?</p>
                    <input type="text" ref={playlistNewNameRef} className={styles.inputAlert} />
                </div>
            )
        };
        setAlertData(data);
        setShowAlert(true);
    }

    const removePlaylist = () => {
        const data = {
            firstAction: () => {
                deletePlaylist(playlistID).then((res) => {
                    dispatch(setLog({ message: res.data, status: res.status }));
                    if (res.status !== 200) return;
                    getPlaylists().then((res) => { 
                        dispatch(setPlaylists(res.data));
                        router.push('/playlists');
                    });
                });                
                setShowAlert(false);
            },
            secondAction: () => setShowAlert(false),
            form: (
                <div>
                    <p className={styles.textAlert}>Are you sure you want to delete this playlist ?</p>
                </div>
            )
        };
        setAlertData(data);
        setShowAlert(true);
    }

    return (
        <div className={styles.main}>
            { showAlert && <CustomAlert data={alertData} showAlert={showAlert} /> }
            <Image src={isEditHovered ? editGrey : edit} alt='Edit icon' onClick={renamePlaylist} onMouseEnter={() => setIsEditHovered(true)} onMouseLeave={() => setIsEditHovered(false)} />
            <Image src={isTrashHovered ? trashColor : trash} alt='Trash icon' onClick={removePlaylist} onMouseEnter={() => setIsTrashHovered(true)} onMouseLeave={() => setIsTrashHovered(false)} />
        </div> 
    )
}
