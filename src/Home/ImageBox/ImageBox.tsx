import React, { useEffect, useRef, useState } from 'react'
import Image from './Image';
import styles from "./ImageBox.module.scss"

function ImageBox({
    image,
    setImage,
}: {
    image: any
    setImage: React.Dispatch<React.SetStateAction<any>>
}) {

    const [zoom, setZoom] = useState(250)
    const [key, setKey] = useState("");
    const [imageContainerWidth, setImageContainerWidth] = useState(0)
    const imageContainer = useRef<any>(null);


    const zoomHandler = (e: any) => {
        if (key.toUpperCase() === "Z") {
            if (e.deltaY < 0) {
                (imageContainerWidth * 0.77 >= zoom) && setZoom(zoom + 40)
            } else {
                (zoom > 50) && setZoom(zoom - 40)
            }
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", e => setKey(e.key))
        window.addEventListener("keyup", () => setKey(""))
        window.addEventListener("resize", () => imageContainer.current && setImageContainerWidth(imageContainer.current.scrollWidth))
        imageContainer.current && setImageContainerWidth(imageContainer.current.scrollWidth)
    } , [])

    return (
        <div ref={imageContainer} className={styles.imageContainer}>
            <div 
                className={`${styles.imageBox} ${key.toUpperCase() === "Z" ? styles.imageBoxBorderOn : styles.imageBoxBorderOff}`} 
                onWheelCapture={zoomHandler} style={{overflowY: key.toUpperCase() === "Z" ? "hidden" : "scroll"}}
            >
                {image && image.images.map((item: any, index: any) => 
                    <Image key={index} {...item} className={styles.image} style={{width: `${zoom}px`}}/>
                )}
            </div>
        </div>
    )
}

export default ImageBox;