import { useState } from "react";

const Image = (props: any) => {

    const [size, setSize] = useState({
        width: 0,
        height: 0,
    })
    const loadHandler = (e: any) => {
        setSize({
            width: e.target.naturalWidth,
            height: e.target.naturalHeight,
        })
    }

    return (
        <div className={props.className} style={props.style}>
            <img 
                onLoad={loadHandler} 
                src={`data:image/jpeg;base64,${props.data}`} 
                style={{
                    width: size.width > size.height ? "100%" : "unset",
                    height: size.width > size.height ? "unset" : "100%",
                }}
            />
        </div>
    )
}

export default Image;