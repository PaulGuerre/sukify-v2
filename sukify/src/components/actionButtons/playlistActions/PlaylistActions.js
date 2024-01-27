import styles from './PlaylistActions.module.css';
import Image from 'next/image';
import edit from '@/lib/icons/edit.svg';
import editGrey from '@/lib/icons/edit_grey.svg';
import trash from '@/lib/icons/trash.svg';
import trashColor from '@/lib/icons/trash_color.svg';
import { useState } from 'react';
import CustomAlert from '@/components/customAlert/CustomAlert';

export default function PlaylistActions() {
    const [ isEditHovered, setIsEditHovered ] = useState(false);
    const [ isTrashHovered, setIsTrashHovered ] = useState(false);
    const [ showAlert, setShowAlert ] = useState(false);
    const [ alertData, setAlertData ] = useState({});

    const renamePlaylist = () => {
        const data = {
            firstAction: () => setShowAlert(false),
            secondAction: () => setShowAlert(false),
            form: (
                <div className={styles.renameAlert}>
                    <p>What is the new name of the playlist ?</p>
                    <input type="text" />
                </div>
            )
        };
        setAlertData(data);
        setShowAlert(true);
    }

    const deletePlaylist = () => {
        const data = {
            firstAction: () => setShowAlert(false),
            secondAction: () => setShowAlert(false),
            form: (
                <div>
                    <p>Are you sure you want to delete this playlist ?</p>
                </div>
            )
        };
        setAlertData(data);
        setShowAlert(true);
    }

    return (
        <div className={styles.main}>
            {
                showAlert && <CustomAlert data={alertData} />
            }
            <Image src={isEditHovered ? editGrey : edit} alt='Edit icon' onClick={renamePlaylist} onMouseEnter={() => setIsEditHovered(true)} onMouseLeave={() => setIsEditHovered(false)} />
            <Image src={isTrashHovered ? trashColor : trash} alt='Trash icon' onClick={deletePlaylist} onMouseEnter={() => setIsTrashHovered(true)} onMouseLeave={() => setIsTrashHovered(false)} />
        </div> 
    )
}
