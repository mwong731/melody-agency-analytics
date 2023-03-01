import React, {useState, useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { imageObject, chooseImage } from "../redux/imagesSlice";
import useGetFileSize from "../hooks/useGetFileSize";

interface Props{
    data: imageObject
}

function Image({data}:Props){
    const dispatch = useAppDispatch();

    const chosenImageId = useAppSelector((state)=>state.images.chosenImageId);

    const [fileSize, setFileSize] = useState<string>("")

    //Update chosen image id in redux
    const handleImageClick = () =>{
        dispatch(chooseImage(data.id))
    }

    useEffect(()=>{
        setFileSize(useGetFileSize(data.sizeInBytes))
    },[])

    return (
        <div className="image-block" data-testid="image-block">
            <div className={`image-block__wrapper ${chosenImageId === data.id ? "image-block__wrapper--active" : ""}`} >
               <img onClick={handleImageClick} src={data.url} /> 
            </div>
            
            <p className="image-block__title">{data.filename}</p>
            <p className="text--muted">{fileSize}</p>
        </div>
    )
}

export default Image;