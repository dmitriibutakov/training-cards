import React from 'react';
import privateClass from "./UniversalAvatar.module.css"

type UniversalAvatarPropsType = {
    avatarImg: string
}
const UniversalAvatar: React.FC<UniversalAvatarPropsType> = ({avatarImg}) => {
    return (
        <span className={privateClass.span}><img src={avatarImg} alt="avatar"/></span>
    );
};

export default UniversalAvatar;