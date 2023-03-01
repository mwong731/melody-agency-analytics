import React, {useEffect, useState} from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import useGetFileSize from "../hooks/useGetFileSize";
import { favoriteImage, deleteImage, leaveDetailMode } from "../redux/imagesSlice";

function Detail(){
    const dispatch = useAppDispatch();
    
    const chosenImageId = useAppSelector((state)=>state.images.chosenImageId);
    const image = useAppSelector((state)=>{
        return chosenImageId !== "" ? state.images.list.find((image)=>image.id === chosenImageId): null;
    });
    const isDetailMode = useAppSelector((state)=>state.images.isDetailMode)

    const [fileSize, setFileSize] = useState<string>("")

    const handleDelete = () =>{
        if(image) dispatch(deleteImage(image.id))
    }

    const handleFavorite = () =>{
        if(image) dispatch(favoriteImage(image.id))
    }

    const handleClickBack = () =>{
        dispatch(leaveDetailMode())
    }

    useEffect(()=>{
        if(fileSize === "" && image){
            setFileSize(useGetFileSize(image.sizeInBytes))
        }
    },[image])

    
    return (
        <div className={`col--right bg--white ${isDetailMode ? "detail-expanded" : ""}`}>
            <div className="container">
                {image ? 
                <div className="detail">
                    <div className="detail__back" onClick={handleClickBack}><i className="fa-solid fa-chevron-left"></i>Back</div>
                    <img className="detail__image" src={image.url}/>
                    <section className="detail__title">
                        <div>
                            <h2>{image.filename}</h2>
                            <p className="text--muted">{fileSize}</p>
                        </div>
                        <button className="detail__favorite" onClick={handleFavorite} data-testid="favorite-button">
                            {image.favorited === true ?
                                <i className="fa-solid fa-heart" data-testid="favorite-true"></i>:
                                <i className="fa-regular fa-heart" data-testid="favorite-false"></i>
                            }
                        </button>
                        
                    </section>
                    <section>
                        <p className="detail__information">Information</p>
                        <div className="detail__row">
                            <p className="text--muted">Uploaded by</p>
                            <p>{image.uploadedBy}</p>
                        </div>
                        <div className="detail__row">
                            <p className="text--muted">Created</p>
                            <p>{new Date(image.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                        </div>
                        <div className="detail__row">
                            <p className="text--muted">Last Modified</p>
                            <p>{new Date(image.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                        </div>
                        <div className="detail__row">
                            <p className="text--muted">Dimensions</p>
                            <p>{image.dimensions.width} × {image.dimensions.height}</p>
                        </div>
                        <div className="detail__row">
                            <p className="text--muted">Resolution</p>
                            <p>{image.resolution.width} × {image.resolution.height}</p>
                        </div>

                    </section>
                    <section>
                        <p className="detail__description">Description</p>
                        <p className="text--muted detail__text">{image.description ? image.description : <span className="text--muted">No description.</span>}</p>

                        <button className="button--outline" onClick={handleDelete} data-testid="delete-button">Delete</button>
                    </section>
                    <div className="detail__back" onClick={handleClickBack}><i className="fa-solid fa-chevron-left"></i>Back</div>
                </div>
                : 
                null}
       
            </div>
        </div>
    )
}

export default Detail;