import React from 'react';

type IconProps = { size?: number; className?: string };

export const RefreshIcon: React.FC<IconProps> = ({ size = 20, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 21h5v-5" />
    </svg>
);

export const SunIcon: React.FC<IconProps> = ({ size = 20, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ size = 20, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

export const DiceIcon: React.FC<IconProps> = ({ size = 20, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="8" x2="16" y2="8" />
        <line x1="8" y1="8" x2="8" y2="8" />
        <line x1="8" y1="16" x2="8" y2="16" />
        <line x1="16" y1="16" x2="16" y2="16" />
        <line x1="12" y1="12" x2="12" y2="12" />
    </svg>
);

// Style Icons

export const GeometricIcon: React.FC<IconProps> = ({ size = 20, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="7" r="4" />
        <rect x="12" y="12" width="8" height="8" />
        <path d="M5 21l6-8 6 8H5z" />
    </svg>
);

export const GradientIcon: React.FC<IconProps> = ({ size = 20, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M2 12h20" strokeOpacity="0.5" />
        <path d="M12 2v20" strokeOpacity="0.5" />
        <circle cx="12" cy="12" r="6" strokeOpacity="0.8" />
    </svg>
);

export const RetroIcon: React.FC<IconProps> = ({ size = 20, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="4" height="4" />
        <rect x="14" y="2" width="4" height="4" />
        <rect x="2" y="14" width="4" height="4" />
        <rect x="8" y="8" width="4" height="4" />
        <rect x="14" y="14" width="4" height="4" />
        {/* Adjusted bottom bar to be part of the grid feeling */}
        <rect x="2" y="20" width="16" height="2" fill="currentColor" stroke="none" />
    </svg>
);

export const BrutalistIcon: React.FC<IconProps> = ({ size = 20, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="14" height="14" fill="none" />
        <path d="M4 8v14h14" strokeWidth="3" />
        <rect x="8" y="4" width="14" height="14" strokeWidth="2" />
    </svg>
);
