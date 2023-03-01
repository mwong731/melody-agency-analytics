import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { fetchImages } from "../redux/imagesSlice";
import Image from "./Image"

interface Props {
    tab: string
};

function List({tab}:Props){
    const dispatch = useAppDispatch();

    const initialized = useAppSelector((state)=>state.images.initialized);
    const error = useAppSelector((state)=>state.images.error);
    const images = useAppSelector((state)=>{
        return tab === "favorited" ? state.images.list.filter((image)=>image.favorited === true): state.images.list
    });

    useEffect(()=>{
        if(initialized === false){
            dispatch(fetchImages())
        }
    },[])

    return (
        <section>
            {initialized ? 
                <div className="row">{ images.length > 0 ?
                    images.map((data)=><Image key={data.id} data={data}/>)
                    :<p className="text--muted">Empty album. Please reload.</p>}
                </div>: 
                <p className="loading">{error === "" ? <i className="fas fa-spinner fa-spin" data-testid="loading-wheel"></i> :  error }</p>
            }
        </section>
    )
}

export default List;