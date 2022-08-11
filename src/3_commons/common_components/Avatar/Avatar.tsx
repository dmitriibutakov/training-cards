import React from 'react';
import privateClass from "./Avatar.module.css"

type UniversalAvatarPropsType = {
    avatarImg: string
}
const Avatar: React.FC<UniversalAvatarPropsType> = ({avatarImg}) => {
    return (
        <span className={privateClass.span}><img src={avatarImg} alt="avatar"/></span>
    );
};

export default Avatar;