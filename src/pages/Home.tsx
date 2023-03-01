import React from "react";
import Tabs from '../components/Tabs';
import Detail from '../components/Detail';

function Home(){
    return (
        <main className="row">
            <Tabs/>
            <Detail/>
        </main>
    )
}

export default Home;