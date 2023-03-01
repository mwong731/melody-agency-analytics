import React, {useMemo, useState} from "react";
import List from "./List"
import { useAppSelector } from "../redux/store";

function Tabs(){
    const isDetailMode = useAppSelector((state)=>state.images.isDetailMode)

    const [tab, setTab] = useState<string>('recently-added');

    const list = useMemo(()=>{
        return <List tab={tab}/>
    }, [tab])

    return (
        <div className={`col--left ${isDetailMode ? "detail-expanded" : ""}`}>
            <div className="container">
                <h1>Photos</h1>
                <section>
                    <div className="tabs">
                        <button 
                            className={tab == 'recently-added' ? "active" : ""} 
                            onClick={()=>setTab('recently-added')}>
                            Recently Added
                        </button>
                        <button 
                            className={tab == 'favorited' ? "active" : ""} 
                            onClick={()=>setTab('favorited')}>
                            Favorited
                        </button>
                    </div>
                </section>

                <section>
                    {list}
                </section>
            </div>
        </div>
    )
}

export default Tabs;