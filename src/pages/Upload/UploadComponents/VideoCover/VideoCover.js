import { useEffect, useRef, useState } from 'react';
import VideoSnapshot from 'video-snapshot';
import classNames from 'classnames/bind';
import styles from './VideoCover.module.scss';

const cx = classNames.bind(styles);

const imageNumber = 8;

const timeDelay = 100;

function VideoCover({ source, timeCoverRef, file }) {
    const videoRef = useRef();
    const [sliderValue, setSliderValue] = useState(4);
    const [videoDuration, setVideoDuration] = useState();
    const [thumbImages, setThumbImages] = useState(Array(imageNumber).fill(''));

    useEffect(() => {
        if (!videoDuration || !file) {
            return;
        }

        const videoSnapshot = new VideoSnapshot(file);
        const eachPart = videoDuration / (imageNumber - 1);

        const generateThumb = async () => {
            const imgsArr = [];

            for (let i = 0; i < imageNumber; i++) {
                imgsArr.push(videoSnapshot.takeSnapshot(eachPart * i));
            }

            const previewUrls = await Promise.all(imgsArr);

            previewUrls.forEach((url, index) => {
                setTimeout(
                    () =>
                        setThumbImages((prev) => {
                            const newItems = [...prev];
                            newItems[index] = url;
                            return newItems;
                        }),
                    timeDelay * index,
                );
            });
        };
        generateThumb();
    }, [file, videoDuration]);

    useEffect(() => {
        const currentTime = (videoDuration / 600) * sliderValue;
        if (isFinite(currentTime)) {
            videoRef.current.currentTime = Math.floor(currentTime);
            timeCoverRef.current = currentTime;
        }
    }, [sliderValue, timeCoverRef, videoDuration, videoRef]);

    return (
        <div className={cx('cover')}>
            <div className={cx('title')}>
                <span>Cover</span>
            </div>
            <div className={cx('imagesList')}>
                <div id="images" className={cx('images')}>
                    {thumbImages.map(
                        (src, id) =>
                            src && (
                                <img draggable="false" className={cx('imgGenerate')} key={id} src={src} alt="noImage" />
                            ),
                    )}
                </div>
                <div className={cx('videos')} id="videos" style={{ '--slide-data': sliderValue + 'px' }}>
                    <div className={cx('chosen')}>
                        <video
                            id="videoChosen"
                            src={source}
                            className={cx('videoChosen')}
                            preload="auto"
                            crossOrigin="anonymous"
                            draggable="false"
                            ref={videoRef}
                            onLoadedData={() => {
                                setVideoDuration(videoRef.current.duration);
                            }}
                        ></video>
                    </div>
                </div>
                <input
                    type="range"
                    min="0"
                    max="600"
                    step="1"
                    className={cx('slider')}
                    onChange={(e) => {
                        setSliderValue(e.target.value);
                    }}
                />
            </div>
        </div>
    );
}

export default VideoCover;
