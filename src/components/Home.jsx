import React from 'react';

import Header from './Header.jsx'
import PartnerPreview from './PartnerPreview.jsx'
import Partners from './Partners.jsx'

import '../css/Home.scss'

const Home = () => {

    return(
        <>
        {/* <Header></Header> */}
        <div className="partnersPadding">
        <Partners/>
        </div>

        </>
    )
}

export default Home;