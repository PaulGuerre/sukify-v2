import styles from './MusicMode.module.css';
import shuffle from '@/lib/icons/shuffle.svg';
import repeat from '@/lib/icons/repeat.svg';
import shuffleGrey from '@/lib/icons/shuffle_grey.svg';
import repeatGrey from '@/lib/icons/repeat_grey.svg';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setMusicMode } from '@/store/playerSlice';

export default function MusicMode() {
    const dispatch = useDispatch();
    const [ currentMusicMode, setCurrentMusicMode ] = useState('');

    useEffect(() => {
        dispatch(setMusicMode(currentMusicMode));
    }, [currentMusicMode]);

    const handleMusicMode = (mode) => {
        currentMusicMode === mode ? setCurrentMusicMode('') : setCurrentMusicMode(mode);
    };

    return (
        <div className={styles.musicMode}>
            <Image onClick={() => handleMusicMode('shuffle')} src={currentMusicMode === 'shuffle' ? shuffle : shuffleGrey} alt="shuffle" />
            <Image onClick={() => handleMusicMode('repeat')} src={currentMusicMode === 'repeat' ? repeat : repeatGrey} alt="repeat" />
        </div>
    );
}
