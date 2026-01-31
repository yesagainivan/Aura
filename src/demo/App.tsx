import { useState } from 'react';
import { AuraAvatar, AuraCard } from '../react';
import { AvatarStyle } from '../generators/types';

export default function App() {
    const [username, setUsername] = useState('SkyWalker_99');

    const styles: AvatarStyle[] = ['geometric', 'gradient', 'retro'];

    return (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            <h1>Aura Identity Demo</h1>

            <div style={{ marginBottom: '40px' }}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                        padding: '12px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        width: '100%',
                        maxWidth: '400px'
                    }}
                    placeholder="Enter username..."
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

                {/* Avatars Section */}
                <section style={{ background: 'white', padding: '20px', borderRadius: '16px' }}>
                    <h2>Avatars</h2>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        {styles.map(variant => (
                            <div key={variant} style={{ textAlign: 'center' }}>
                                <AuraAvatar
                                    username={username}
                                    size={100}
                                    variant={variant}
                                    className="avatar-hover"
                                />
                                <p style={{ marginTop: '8px', textTransform: 'capitalize', color: '#666' }}>{variant}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Cards Section */}
                <section style={{ background: 'white', padding: '20px', borderRadius: '16px' }}>
                    <h2>Profile Cards</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <AuraCard
                            username={username}
                            bio="Building the future of digital identity."
                            tags={['TypeScript', 'Design', 'Aura']}
                            theme="light"
                            avatarStyle="geometric"
                        />
                        <AuraCard
                            username={username}
                            bio="Night owl coder."
                            tags={['Rust', 'WASM', 'Performance']}
                            theme="dark"
                            avatarStyle="retro"
                        />
                    </div>
                </section>

                {/* Gallery Section */}
                <section style={{ background: 'white', padding: '20px', borderRadius: '16px', gridColumn: '1 / -1' }}>
                    <h2>Random Gallery</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        {['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank', 'Grace', 'Heidi'].map(name => (
                            <div key={name} title={name}>
                                <AuraAvatar username={name} size={60} variant="geometric" />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
