import React, { useState } from 'react';
import { AuraAvatar, AuraCard } from '../react';
import { AvatarStyle } from '../generators/types';


export default function App() {
    // Editor State
    const [username, setUsername] = useState('SkyWalker_99');
    const [bio, setBio] = useState('Building the future of digital identity.');
    const [tags, setTags] = useState('TypeScript, Aura, Design');
    const [variant, setVariant] = useState<AvatarStyle>('geometric');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // View State
    const [viewMode, setViewMode] = useState<'card' | 'avatar'>('card');

    const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);

    const handleRandom = () => {
        const randomUsers = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank', 'Grace', 'Heidi'];
        const r = randomUsers[Math.floor(Math.random() * randomUsers.length)];
        const num = Math.floor(Math.random() * 1000);
        setUsername(`${r}_${num}`);
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 1fr) 2fr',
            height: '100vh',
            fontFamily: 'system-ui, sans-serif',
            background: '#f8fafc'
        }}>

            {/* Sidebar Controls */}
            <aside style={{
                padding: '32px',
                borderRight: '1px solid #e2e8f0',
                background: 'white',
                overflowY: 'auto'
            }}>
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 8px 0' }}>Aura</h1>
                    <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Identity-as-a-Component</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    <section>
                        <label style={labelStyle}>Identity</label>
                        <input
                            style={inputStyle}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <button onClick={handleRandom} style={secondaryButtonStyle}>Randomize Name</button>
                    </section>

                    <section>
                        <label style={labelStyle}>Style</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {(['geometric', 'gradient', 'retro'] as const).map(s => (
                                <button
                                    key={s}
                                    onClick={() => setVariant(s)}
                                    style={{
                                        ...chipStyle,
                                        background: variant === s ? '#0f172a' : '#f1f5f9',
                                        color: variant === s ? 'white' : '#475569',
                                        borderColor: variant === s ? '#0f172a' : 'transparent'
                                    }}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section>
                        <label style={labelStyle}>Profile Details</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <textarea
                                style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                placeholder="Bio"
                            />
                            <input
                                style={inputStyle}
                                value={tags}
                                onChange={e => setTags(e.target.value)}
                                placeholder="Tags (comma separated)"
                            />
                        </div>
                    </section>

                    <section>
                        <label style={labelStyle}>Card Theme</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={() => setTheme('light')}
                                style={{ ...chipStyle, background: theme === 'light' ? '#e2e8f0' : 'white', border: '1px solid #cbd5e1' }}
                            >Light</button>
                            <button
                                onClick={() => setTheme('dark')}
                                style={{ ...chipStyle, background: theme === 'dark' ? '#1e293b' : 'white', color: theme === 'dark' ? 'white' : 'black', border: '1px solid #cbd5e1' }}
                            >Dark</button>
                        </div>
                    </section>

                </div>
            </aside>

            {/* Main Preview Area */}
            <main style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '40px',
                gap: '40px',
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%',
                boxSizing: 'border-box'
            }}>

                {/* Toggle Mode */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <div style={{ background: '#e2e8f0', padding: '4px', borderRadius: '8px', display: 'flex' }}>
                        <button
                            onClick={() => setViewMode('card')}
                            style={{ ...toggleStyle, background: viewMode === 'card' ? 'white' : 'transparent', boxShadow: viewMode === 'card' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none' }}
                        >Profile Card</button>
                        <button
                            onClick={() => setViewMode('avatar')}
                            style={{ ...toggleStyle, background: viewMode === 'avatar' ? 'white' : 'transparent', boxShadow: viewMode === 'avatar' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none' }}
                        >Avatar Only</button>
                    </div>
                </div>

                {/* Hero Preview */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '400px'
                }}>
                    {viewMode === 'card' ? (
                        <div style={{ transform: 'scale(1.2)' }}>
                            <AuraCard
                                username={username}
                                bio={bio}
                                tags={tagList}
                                theme={theme}
                                avatarStyle={variant}
                            />
                        </div>
                    ) : (
                        <div style={{
                            padding: '40px',
                            background: 'white',
                            borderRadius: '24px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '20px'
                        }}>
                            <AuraAvatar username={username} variant={variant} size={160} />
                            <code style={{ fontSize: '12px', color: '#64748b' }}>{`size={160} variant="${variant}"`}</code>
                        </div>
                    )}
                </div>

                {/* Random Gallery */}
                <section>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>Inspiration Gallery</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '12px' }}>
                        {Array.from({ length: 12 }).map((_, i) => {
                            // Creating a deterministic pseudo-random seed for the gallery based on the current username as a salt could be cool, 
                            // or just static list. Let's make it static but large.
                            const name = `Visiter_${i * 137}`;
                            return (
                                <button
                                    key={i}
                                    onClick={() => setUsername(name)}
                                    title={`Load ${name}`}
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
                                        cursor: 'pointer',
                                        padding: 4,
                                        borderRadius: '8px',
                                        transition: 'transform 0.1s'
                                    }}
                                    className="gallery-item"
                                >
                                    <AuraAvatar username={name} size={60} variant={variant} />
                                </button>
                            );
                        })}
                    </div>
                </section>

            </main>
        </div>
    );
}

// Minimal Styles
const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#64748b',
    marginBottom: '8px'
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit'
};

const secondaryButtonStyle: React.CSSProperties = {
    marginTop: '8px',
    fontSize: '12px',
    color: '#475569',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline'
};

const chipStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px 12px',
    fontSize: '13px',
    borderRadius: '6px',
    border: '1px solid transparent',
    cursor: 'pointer',
    fontWeight: 500,
    textTransform: 'capitalize',
    transition: 'all 0.2s'
};

const toggleStyle: React.CSSProperties = {
    padding: '8px 24px',
    fontSize: '14px',
    fontWeight: 500,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#0f172a',
    transition: 'all 0.2s'
};

