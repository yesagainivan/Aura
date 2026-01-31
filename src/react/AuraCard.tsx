import React from 'react';
import { generateProfileCard, ProfileData, CardOptions } from '../generators/card';
import { AvatarStyle } from '../generators/types';

export interface AuraCardProps {
    username: string;
    bio?: string;
    tags?: string[];
    theme?: 'light' | 'dark';
    className?: string;
    // Make card options flatter if desired, or pass as object
    avatarSize?: number;
    avatarStyle?: AvatarStyle; // Renamed type usage here too for clarity
}

export const AuraCard: React.FC<AuraCardProps> = ({
    username,
    bio,
    tags,
    theme,
    className,
    avatarSize,
    avatarStyle
}) => {
    const html = React.useMemo(() => {
        const profile: ProfileData = { username, bio, tags };
        const options: CardOptions = {
            theme,
            avatarOptions: {
                size: avatarSize,
                variant: avatarStyle // Use variant
            }
        };
        return generateProfileCard(profile, options);
    }, [username, bio, tags, theme, avatarSize, avatarStyle]);

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};
