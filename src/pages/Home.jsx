import React from 'react';
import  MainBanner  from '../components/Web/MainBanner';
import HomeCourses from '../components/Web/HomeCourses';
import HowMyCourses from '../components/Web/HowMyCourses';
import ReviewsCourses from '../components/Web/ReviewsCourses';

export default function Home() {
    return ( 
        <>
            <MainBanner/>
            <HomeCourses/>
            <HowMyCourses/>
            <ReviewsCourses/>
        </>
     );
}
