import { generateAvatar } from './avatar';
import { AvatarOptions } from './types';
import { generatePalette } from '../core/colors';
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

  const avOptions = options.avatarOptions || {};
  const palette = avOptions.palette || generatePalette(hash, {
    colorMode: avOptions.colorMode,
    primaryHex: avOptions.primaryColor
  });

  // Use avatar engine
  const avatarSvg = generateAvatar(username, options.avatarOptions);

  // Styles
  const isDark = options.theme === 'dark';
  // Use slightly nicer Zinc/Slate tones to match the new App Theme
  const bg = isDark ? '#18181b' : '#ffffff';
  const fg = isDark ? '#f4f4f5' : '#18181b';
  const secondaryFg = isDark ? '#a1a1aa' : '#71717a';
  const border = isDark ? '#27272a' : '#e4e4e7';

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

  // Helper to add transparency to hex color
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Use Primary for tags
  const tagColor = palette.primary;

  // Smarter contrast logic:
  // If dark mode, use higher opacity for background to make text readable against card bg,
  // OR lighten the text color if the palette color is too dark.
  // For v1 simplicity: we bump background opacity in dark mode to separate from dark card bg.
  const tagAlpha = isDark ? 0.25 : 0.12;
  const tagBg = hexToRgba(tagColor, tagAlpha);

  // In dark mode, pure palette colors can be hard to read. 
  // We can force a tiny bit of brightness or just trust the palette is accessible.
  // Let's use the palette color as is for now but rely on the background boost.
  const tagTextColor = tagColor;

  const tagStyle = `
    font-size: 0.75rem;
    padding: 4px 12px;
    border-radius: 16px;
    background: ${tagBg};
    color: ${tagTextColor};
    font-weight: 600;
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
