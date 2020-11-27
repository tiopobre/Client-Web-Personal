import React from 'react';
import LogoReact from '../../../../assets/img/png/logo192.png'
import SocialLink from '../../SocialLinks';
import './MyInfo.scss';
export default function MyInfo() {
    return (
        <div className = "my-info">
            <img src = { LogoReact } alt="Daniel React"/>
            <h4>
                Entra al mundo del desarrollo web, disfruta creando proyectos de todo tipo deja que 
                tu potencial emerja. 
            </h4>
            <SocialLink/>
        </div>
      );
}
 