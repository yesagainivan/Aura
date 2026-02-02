import React, { useState } from 'react';
import { AuraAvatar, AuraCard } from '../react';
import { AvatarStyle } from '../generators/types';
import { SunIcon, MoonIcon, RefreshIcon, DiceIcon, GeometricIcon, GradientIcon, RetroIcon, BrutalistIcon, EleganceIcon } from './icons';
import { getTheme, ThemeMode } from './theme';

// Expanded Name Lists for diversity (15x15 = 225 combinations)
const ADJECTIVES = [
    'Swift', 'Cosmic', 'Happy', 'Neon', 'Brave',
    'Calm', 'Wild', 'Silent', 'Rapid', 'Grand',
    'Pixel', 'Solar', 'Lunar', 'Hyper', 'Noble',
    'Attentive', 'Quick', 'Bald', 'Bold', 'Gentle',
];
const NOUNS = [
    'Panda', 'Coder', 'Star', 'Wolf', 'Eagle',
    'Orbit', 'Flux', 'Echo', 'Tiger', 'Nova',
    'Rider', 'Falcon', 'Hawk', 'Lion', 'Bear',
    'People', 'Person', 'Human', 'Bot', 'AI',
];

const getRandomName = () => {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    return `${adj}${noun}`;
};

export default function App() {
    // App State
    const [mode, setMode] = useState<ThemeMode>('light');
    const t = getTheme(mode);
    const isDark = mode === 'dark';

    // Editor State
    const [username, setUsername] = useState('NobleOrbit');
    const [bio, setBio] = useState('Building digital auras. Try NeonHawk');
    const [tags, setTags] = useState('Design, Aura, React');
    const [variant, setVariant] = useState<AvatarStyle>('geometric');
    const [cardTheme, setCardTheme] = useState<'light' | 'dark'>('light');

    // Customization State
    const [userColorMode, setUserColorMode] = useState<'auto' | 'light' | 'dark'>('auto');
    const [userPrimaryColor, setUserPrimaryColor] = useState<string>(''); // Empty = auto

    // Preset Colors
    const PRESET_COLORS = [
        { name: 'Auto', value: '' },
        { name: 'Crimson', value: '#DC143C' },
        { name: 'Azure', value: '#007FFF' },
        { name: 'Emerald', value: '#50C878' },
        { name: 'Gold', value: '#FFD700' },
        { name: 'Purple', value: '#800080' },
        { name: 'Teal', value: '#008080' },
        { name: 'Orange', value: '#FFA500' },
        { name: 'Pink', value: '#FFC0CB' },
    ];

    // View State
    const [viewMode, setViewMode] = useState<'card' | 'avatar'>('card');
    const [gallerySeed, setGallerySeed] = useState(0);

    const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);

    const toggleMode = () => setMode(m => m === 'light' ? 'dark' : 'light');

    return (
        <React.Fragment>
            <style dangerouslySetInnerHTML={{
                __html: `
            .app-container {
                display: grid;
                grid-template-columns: minmax(320px, 360px) 1fr;
                height: 100vh;
                font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif;
                background: ${t.bg};
                color: ${t.text};
                transition: background 0.3s, color 0.3s;
            }
            .sidebar {
                padding: 32px;
                border-right: 1px solid ${t.border};
                background: ${t.panelBg};
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 32px;
            }
            .main-preview {
                display: flex;
                flex-direction: column;
                padding: 40px;
                gap: 40px;
                max-width: 1200px;
                margin: 0 auto;
                width: 100%;
                box-sizing: border-box;
                overflow-y: auto;
            }
            @media (max-width: 800px) {
                .app-container {
                    grid-template-columns: 1fr;
                    grid-template-rows: auto auto; /* Preview then Controls? or Controls then Preview? */
                    height: auto;
                    min-height: 100vh;
                }
                .sidebar {
                    order: 2;
                    border-right: none;
                    border-top: 1px solid ${t.border};
                    height: auto;
                    padding: 24px;
                }
                .main-preview {
                    order: 1;
                    padding: 24px;
                    min-height: 400px;
                }
            }
        `}} />
            <div className="app-container">

                {/* Sidebar Controls */}
                <aside className="sidebar">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 4px 0', letterSpacing: '-0.03em' }}>Aura</h1>
                            <p style={{ color: t.secondaryText, fontSize: '14px', margin: 0, fontWeight: 500 }}>Identity Engine</p>
                        </div>
                        <button
                            onClick={toggleMode}
                            style={{
                                background: 'transparent',
                                border: `1px solid ${t.border}`,
                                borderRadius: '8px',
                                padding: '8px',
                                color: t.text,
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s'
                            }}
                            title="Toggle Theme"
                        >
                            {isDark ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        <section>
                            <label style={{ ...labelStyle, color: t.secondaryText }}>Identity</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    style={{ ...inputStyle, background: t.bg, color: t.text, borderColor: t.border }}
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder="Username"
                                />
                                <button
                                    onClick={() => setUsername(getRandomName())}
                                    style={{ ...iconButtonStyle, borderColor: t.border, color: t.text }}
                                    title="Random Name"
                                >
                                    <DiceIcon />
                                </button>
                            </div>
                        </section>

                        <section>
                            <label style={{ ...labelStyle, color: t.secondaryText }}>Style</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                {[
                                    { id: 'geometric', icon: GeometricIcon, label: 'Geometric' },
                                    { id: 'gradient', icon: GradientIcon, label: 'Gradient' },
                                    { id: 'retro', icon: RetroIcon, label: 'Retro' },
                                    { id: 'brutalist', icon: BrutalistIcon, label: 'Brutalist' },
                                    { id: 'elegance', icon: EleganceIcon, label: 'Elegance' }
                                ].map(({ id, icon: Icon, label }) => (
                                    <button
                                        key={id}
                                        onClick={() => setVariant(id as AvatarStyle)}
                                        style={{
                                            ...chipStyle,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                            background: variant === id ? t.accent : t.bg,
                                            color: variant === id ? t.accentText : t.secondaryText,
                                            border: `1px solid ${variant === id ? t.accent : t.border}`,
                                            opacity: variant === id ? 1 : 0.7,
                                            padding: '12px',
                                        }}
                                    >
                                        <Icon size={16} />
                                        <span>{label}</span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section>
                            <label style={{ ...labelStyle, color: t.secondaryText }}>Metadata</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <textarea
                                    style={{ ...inputStyle, minHeight: '80px', resize: 'vertical', background: t.bg, color: t.text, borderColor: t.border }}
                                    value={bio}
                                    onChange={e => setBio(e.target.value)}
                                    placeholder="Bio"
                                />
                                <input
                                    style={{ ...inputStyle, background: t.bg, color: t.text, borderColor: t.border }}
                                    value={tags}
                                    onChange={e => setTags(e.target.value)}
                                    placeholder="Tags (comma separated)"
                                />
                            </div>
                        </section>

                        <section>
                            <label style={{ ...labelStyle, color: t.secondaryText }}>Customization</label>

                            {/* Palette Mode */}
                            <div style={{ marginBottom: '12px' }}>
                                <div style={{ fontSize: '11px', fontWeight: 600, color: t.secondaryText, marginBottom: '6px' }}>PALETTE MODE</div>
                                <div style={{ display: 'flex', gap: '4px', background: t.bg, padding: 4, borderRadius: 10, border: `1px solid ${t.border}` }}>
                                    {(['auto', 'light', 'dark'] as const).map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => setUserColorMode(m)}
                                            style={{
                                                ...chipStyle,
                                                background: userColorMode === m ? t.accent : 'transparent',
                                                color: userColorMode === m ? t.accentText : t.secondaryText,
                                                boxShadow: userColorMode === m ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                                            }}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Brand Color */}
                            <div>
                                <div style={{ fontSize: '11px', fontWeight: 600, color: t.secondaryText, marginBottom: '6px' }}>BRAND COLOR</div>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {PRESET_COLORS.map(c => (
                                        <button
                                            key={c.name}
                                            onClick={() => setUserPrimaryColor(c.value)}
                                            title={c.name}
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                border: userPrimaryColor === c.value ? `2px solid ${t.text}` : `1px solid ${t.border}`,
                                                background: c.value || `conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)`,
                                                cursor: 'pointer',
                                                position: 'relative',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section>
                            <label style={{ ...labelStyle, color: t.secondaryText }}>Preview Mode</label>
                            <div style={{ display: 'flex', gap: '4px', background: t.bg, padding: 4, borderRadius: 10, border: `1px solid ${t.border}` }}>
                                <button
                                    onClick={() => setCardTheme('light')}
                                    style={{
                                        ...chipStyle,
                                        background: cardTheme === 'light' ? t.accent : 'transparent',
                                        color: cardTheme === 'light' ? t.accentText : t.secondaryText,
                                    }}
                                >Light Card</button>
                                <button
                                    onClick={() => setCardTheme('dark')}
                                    style={{
                                        ...chipStyle,
                                        background: cardTheme === 'dark' ? t.accent : 'transparent',
                                        color: cardTheme === 'dark' ? t.accentText : t.secondaryText,
                                    }}
                                >Dark Card</button>
                            </div>
                        </section>

                    </div>
                </aside>

                {/* Main Preview Area */}
                <main className="main-preview">

                    {/* Toggle Mode */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ background: t.panelBg, padding: '4px', borderRadius: '12px', display: 'flex', border: `1px solid ${t.border}` }}>
                            <button
                                onClick={() => setViewMode('card')}
                                style={{
                                    ...toggleStyle,
                                    background: viewMode === 'card' ? t.bg : 'transparent',
                                    color: viewMode === 'card' ? t.text : t.secondaryText,
                                    boxShadow: viewMode === 'card' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
                                }}
                            >Profile Card</button>
                            <button
                                onClick={() => setViewMode('avatar')}
                                style={{
                                    ...toggleStyle,
                                    background: viewMode === 'avatar' ? t.bg : 'transparent',
                                    color: viewMode === 'avatar' ? t.text : t.secondaryText,
                                    boxShadow: viewMode === 'avatar' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
                                }}
                            >Avatar Only</button>
                        </div>
                    </div>

                    {/* Hero Preview */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '400px',
                    }}>
                        {viewMode === 'card' ? (
                            <div style={{ transform: 'scale(1.25)', transition: 'transform 0.2s' }}>
                                <AuraCard
                                    username={username}
                                    bio={bio}
                                    tags={tagList}
                                    theme={cardTheme}
                                    avatarStyle={variant}
                                    avatarOptions={{
                                        colorMode: userColorMode === 'auto' ? undefined : userColorMode,
                                        primaryColor: userPrimaryColor || undefined
                                    }}
                                />
                            </div>
                        ) : (
                            <div style={{
                                padding: '60px',
                                background: t.panelBg,
                                borderRadius: '32px',
                                border: `1px solid ${t.border}`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '24px'
                            }}>
                                <div style={{
                                    boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '50%',
                                    lineHeight: 0
                                }}>
                                    <AuraAvatar
                                        username={username}
                                        variant={variant}
                                        size={180}
                                        colorMode={userColorMode === 'auto' ? undefined : userColorMode}
                                        primaryColor={userPrimaryColor || undefined}
                                    />
                                </div>
                                <code style={{ fontSize: '12px', color: t.secondaryText, fontFamily: 'monospace' }}>
                                    {`<AuraAvatar username="${username}" variant="${variant}" />`}
                                </code>
                            </div>
                        )}
                    </div>

                    {/* Gallery */}
                    <section>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: '600', margin: 0, color: t.text, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Inspiration</h3>
                            <button
                                onClick={() => setGallerySeed(s => s + 1)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    background: 'transparent', border: 'none', color: t.secondaryText, cursor: 'pointer',
                                    fontSize: '13px', fontWeight: 500,
                                    transition: 'color 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = t.text}
                                onMouseLeave={e => e.currentTarget.style.color = t.secondaryText}
                            >
                                <RefreshIcon size={14} /> Shuffle
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))', gap: '12px' }}>
                            {Array.from({ length: 14 }).map((_, i) => {
                                // Improved random shuffling
                                const nameSeed = gallerySeed * 100 + (gallerySeed * 13) + i * 7;
                                const name = `${ADJECTIVES[nameSeed % ADJECTIVES.length]}${NOUNS[(nameSeed + i) % NOUNS.length]}`;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setUsername(name)}
                                        title={`Load ${name}`}
                                        style={{
                                            border: 'none',
                                            background: 'transparent',
                                            cursor: 'pointer',
                                            padding: 0,
                                            borderRadius: '8px', // Slight rounded corners for the square
                                            overflow: 'hidden',
                                            width: '100%',
                                            aspectRatio: '1/1',
                                            transition: 'transform 0.1s, opacity 0.2s',
                                            display: 'block',
                                            outline: 'none'
                                        }}
                                        className="gallery-item"
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <div style={{ width: '100%', height: '100%' }}>
                                            <style>{`
                                            .gallery-item svg { width: 100% !important; height: 100% !important; }
                                        `}</style>
                                            <AuraAvatar username={name} size={128} variant={variant} style={{ width: '100%', height: '100%' }} />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                </main>
            </div>
        </React.Fragment>
    );
}

// Helpers
const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px'
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit'
};

const iconButtonStyle: React.CSSProperties = {
    padding: '10px',
    borderRadius: '8px',
    background: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
};

const chipStyle: React.CSSProperties = {
    flex: 1,
    padding: '6px 12px',
    fontSize: '13px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    textTransform: 'capitalize',
    transition: 'all 0.2s'
};

const toggleStyle: React.CSSProperties = {
    padding: '6px 20px',
    fontSize: '13px',
    fontWeight: 600,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s'
};
