import { generateAvatar } from './avatar';
import { AvatarOptions } from './types';
import { getPalette } from '../core/colors';
import { getHash } from '../core/hash';

export interface ProfileData {
    username: string;
    bio?: string;
    tags?: string[];
}

export interface CardOptions {
    avatarOptions?: AvatarOptions;
    theme?: 'light' | 'dark';
}

export function generateProfileCard(profile: ProfileData, options: CardOptions = {}): string {
    const { username, bio, tags = [] } = profile;
    const hash = getHash(username);
    const palette = options.avatarOptions?.palette || getPalette(hash);

    // Use avatar engine
    const avatarSvg = generateAvatar(username, options.avatarOptions);

    // Styles
    const isDark = options.theme === 'dark';
    const bg = isDark ? '#1a1a1a' : '#ffffff';
    const fg = isDark ? '#ffffff' : '#1a1a1a';
    const secondaryFg = isDark ? '#a0a0a0' : '#666666';
    const border = isDark ? '#333' : '#e0e0e0';

    const cardStyle = `
    font-family: system-ui, -apple-system, sans-serif;
    background: ${bg};
    color: ${fg};
    border: 1px solid ${border};
    border-radius: 12px;
    padding: 24px;
    max-width: 320px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  `.replace(/\s+/g, ' ').trim();

    const avatarWrapperStyle = `
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 16px;
    background: ${palette.background};
  `.replace(/\s+/g, ' ').trim();

    const nameStyle = `
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 8px 0;
  `.replace(/\s+/g, ' ').trim();

    const bioStyle = `
    font-size: 0.875rem;
    color: ${secondaryFg};
    margin: 0 0 16px 0;
    line-height: 1.5;
  `.replace(/\s+/g, ' ').trim();

    const tagsStyle = `
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  `.replace(/\s+/g, ' ').trim();

    const tagStyle = `
    font-size: 0.75rem;
    padding: 4px 12px;
    border-radius: 16px;
    background: ${palette.background};
    color: ${palette.colors[palette.colors.length - 1]};
    font-weight: 500;
  `.replace(/\s+/g, ' ').trim();

    const tagsHtml = tags.map(tag =>
        `<span style="${tagStyle}">${tag}</span>`
    ).join('');

    return `
    <div style="${cardStyle}">
      <div style="${avatarWrapperStyle}">
        ${avatarSvg}
      </div>
      <h3 style="${nameStyle}">${username}</h3>
      ${bio ? `<p style="${bioStyle}">${bio}</p>` : ''}
      <div style="${tagsStyle}">
        ${tagsHtml}
      </div>
    </div>
  `;
}
