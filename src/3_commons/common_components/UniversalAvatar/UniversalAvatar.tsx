import React from 'react';
import privateClass from "./UniversalAvatar.module.css"

type UniversalAvatarImg = {
    avatarImg: string
}
const UniversalAvatar:React.FC<UniversalAvatarImg> = ({avatarImg}) => {
    return (
        <span className={privateClass.span}><img src={avatarImg} alt="avatar"/></span>
    );
};

export default UniversalAvatar;