import Image from "next/image";
import arrowLeft from '@/lib/icons/arrow_left.svg';
import arrowRight from '@/lib/icons/arrow_right.svg';
import styles from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIndex, setCurrentMusics } from "@/store/musicsSlice";

export default function Pagination() {
    const dispatch = useDispatch();
    const { musics, currentMusics } = useSelector((state) => state.musics);

    const nextMusics = () => {
        const lastMusicIndex = musics.indexOf(currentMusics[currentMusics.length - 1]);
        if (lastMusicIndex + 1 < musics.length) {
            const nextMusics = musics.slice(lastMusicIndex + 1, lastMusicIndex + 11);
            dispatch(setCurrentMusics(nextMusics));
            dispatch(setCurrentIndex(lastMusicIndex + 1));
        }
    }

    const previousMusics = () => {
        const firstMusicIndex = musics.indexOf(currentMusics[0]);
        if (firstMusicIndex - 10 >= 0) {
            const previousMusics = musics.slice(firstMusicIndex - 10, firstMusicIndex);
            dispatch(setCurrentMusics(previousMusics));
            dispatch(setCurrentIndex(firstMusicIndex - 10));
        }
    }

    return (
        <div className={styles.pagination}>
            <div className={styles.paginationButton} onClick={previousMusics}>
                <Image src={arrowLeft} alt="Arrow left icon" />
            </div>
            <div className={styles.paginationButton} onClick={nextMusics}>
                <Image src={arrowRight} alt="Arrow right icon" />
            </div>
        </div>
    );
}
