import styles from './MusicMode.module.css';
import shuffle from '@/lib/icons/shuffle.svg';
import repeat from '@/lib/icons/repeat.svg';
import shuffleGrey from '@/lib/icons/shuffle_grey.svg';
import repeatGrey from '@/lib/icons/repeat_grey.svg';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setMusicMode } from '@/store/playerSlice';

export default function MusicMode() {
    const dispatch = useDispatch();
    const musicMode = useSelector((state) => state.player.musicMode);

    const handleMusicMode = (mode) => {
        dispatch(setMusicMode(mode === musicMode ? '' : mode));
    };

    return (
        <div className={styles.musicMode}>
            <Image onClick={() => handleMusicMode('shuffle')} src={musicMode === 'shuffle' ? shuffle : shuffleGrey} alt="shuffle" />
            <Image onClick={() => handleMusicMode('repeat')} src={musicMode === 'repeat' ? repeat : repeatGrey} alt="repeat" />
        </div>
    );
}
