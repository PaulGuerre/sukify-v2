import Image from 'next/image';
import styles from './AddMusic.module.css';
import plusDark from '@/lib/icons/plus_dark.svg';
import plusGrey from '@/lib/icons/plus_grey.svg';
import { useState } from 'react';
import CustomAlert from '@/components/customAlert/CustomAlert';
import { downloadMusic, getMusics } from '@/utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentMusics, setMusics } from '@/store/musicsSlice';
import Loader from '@/components/loader/Loader';

export default function AddMusic() {
    const dispatch = useDispatch();
    const [ isHovered, setIsHovered ] = useState(false);
    const [ showAlert, setShowAlert ] = useState(false);
    const [ alertData, setAlertData ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);
    const currentIndex = useSelector((state) => state.musics.currentIndex);

    const addMusic = () => {
        const data = {
            firstAction: () => {
                setIsLoading(true);
                downloadMusic(document.getElementById('musicName').value).then(() => {
                    setIsLoading(false);
                    getMusics(1000, 0).then((res) => { 
                        dispatch(setMusics(res.data)); 
                        dispatch(setCurrentMusics(res.data.slice(currentIndex, currentIndex + 10)));
                    });
                });
                setShowAlert(false);
            },
            secondAction: () => setShowAlert(false),
            form: (
                <div className={styles.addAlert}>
                    <p className={styles.textAlert}>Which music do you want to add ?</p>
                    <input type="text" id='musicName' />
                </div>
            )
        };
        setAlertData(data);
        setShowAlert(true);
    }

    return (
        isLoading ? <Loader /> : <div className={styles.main}>
            { showAlert && <CustomAlert data={alertData} showAlert={showAlert} /> }
            <Image src={isHovered ? plusGrey : plusDark} alt='Plus icon' onClick={addMusic} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} />
        </div>
    )
}