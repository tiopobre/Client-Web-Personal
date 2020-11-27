import React from 'react';
import './SocialLinks.scss';
import { LinkedinFilled, TwitterOutlined, FacebookFilled, YoutubeFilled } from '@ant-design/icons';

export default function SocialLinks () {

    return( 
        <div className = 'social-links'>
            <a 
                href="https://www.youtube.com"
                className = "youtube"
                target = "_blank"  
                rel="noopener noreferrer"  
            >
                <YoutubeFilled style={{ fontSize: '16px', color: "#fff" }} />
            </a>

            <a 
                href="https://www.youtube.com"
                className = "facebook"
                target = "_blank" 
                rel="noopener noreferrer"    
            >
                <FacebookFilled style={{ fontSize: '16px', color: "#fff" }} />
            </a>

            <a 
                href="https://www.youtube.com"
                className = "twitter"
                target = "_blank"   
                rel="noopener noreferrer"  
            >
                <TwitterOutlined style={{ fontSize: '16px', color: "#fff" }} />
            </a>

            <a 
                href="https://www.youtube.com"
                className = "linkedin"
                target = "_blank" 
                rel="noopener noreferrer"    
            >
                <LinkedinFilled style={{ fontSize: '16px', color: "#fff" }} />
            </a>
        </div>
     );
}