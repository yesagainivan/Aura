import React from 'react';
import { generateAvatar } from '../generators/avatar';
import { AvatarOptions } from '../generators/types';

export interface AuraAvatarProps extends AvatarOptions {
    /** The value to generate the avatar from (username, email, etc.) */
    username: string;
    className?: string;
    style?: React.CSSProperties; // React style prop
}

export const AuraAvatar: React.FC<AuraAvatarProps> = ({
    username,
    className,
    style,
    ...options
}) => {
    const svg = generateAvatar(username, options);

    return (
        <div
            className={className}
            style={{ display: 'inline-block', lineHeight: 0, ...style }}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
};
