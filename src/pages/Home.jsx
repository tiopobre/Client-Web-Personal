import React from 'react';
import  MainBanner  from '../components/Web/MainBanner';
import HomeCourses from '../components/Web/HomeCourses';
import HowMyCourses from '../components/Web/HowMyCourses';
import ReviewsCourses from '../components/Web/ReviewsCourses';
import { Helmet } from 'react-helmet';

export default function Home() {
    return ( 
        <>
            <Helmet>
                <title> Daniel Serrano </title>
                <meta 
                    name= "description"
                    content = "Home | Web sobre Programación"
                    data-react-helmet = "true"
                />
            </Helmet>
            <MainBanner/>
            <HomeCourses/>
            <HowMyCourses/>
            <ReviewsCourses/>
        </>
     );
}
