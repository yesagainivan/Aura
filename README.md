# Aura 

> **The Generative Identity Engine for Modern Apps.**

**Aura** is a zero-dependency, TypeScript-first library that turns unique identifiers (usernames, emails, UUIDs) into beautiful, consistent, and unique visual identities. 

It goes beyond simple random colors—it uses a **Bauhaus-inspired** composition engine and **Harmonic Color Math** to ensure every generated avatar looks professionally designed.

![Aura Banner](https://placeholder.com)

## ✨ Features

- **🎨 4 Professional Styles**
  - **Geometric**: Bauhaus-inspired grids, asymmetry, and quarter-arcs. (Default)
  - **Gradient**: Soft, ethreal mesh gradients for a modern SaaS look.
  - **Retro**: 5x5 Github-style identicons but with a cohesive color strategy.
  - **Brutalist**: Neo-brutalist aesthetics with thick borders, hard shadows, and raw primitives.

- **🌈 Harmonic Color Engine**
  - Uses **HSL-based** generation (Analogous & Triadic harmonies).
  - **Dark Mode Ready**: 25% chance of "Premium Dark" palettes, or force-enable via options.
  - **Brand Safe**: Inject your Primary Brand Color, and the engine recalculates the entire palette to match harmoniously.

- **⚛️ Framework Agnostic Core**
  - Core generators return pure SVG strings.
  - Includes a first-class **React** adapter (`<AuraAvatar />`, `<AuraCard />`).
  - Zero runtime dependencies for the core.

## 📦 Installation

```bash
npm install @yesagainivan/aura
```

## 🚀 Usage

### React Component

```tsx
import { AuraAvatar, AuraCard } from '@yesagainivan/aura';

// Simple Avatar
<AuraAvatar 
  username="CosmicCoder" 
  size={120} 
  variant="geometric" 
/>

// Full Profile Card
<AuraCard 
  username="CosmicCoder" 
  bio="Building digital dreams." 
  tags={['Design', 'Code']} 
  theme="dark"
  avatarStyle="brutalist"
/>
```

### Customization

Aura allows you to override the generative engine to match your app's branding while keeping the generative variety.

```tsx
<AuraAvatar 
  username="User123" 
  // Force a Dark Mode palette
  colorMode="dark" 
  // Inject your brand color (the rest of the palette will adapt!)
  primaryColor="#FF0055" 
/>
```

## 🛠️ API

`generateAvatar(input: string, options?: AvatarOptions): string`

Returns an SVG string.

```ts
import { generateAvatar } from '@yesagainivan/aura';

const svg = generateAvatar('user-id-123', {
  variant: 'brutalist',
  size: 256
});
```

## 📜 License

MIT © 2026 Ivan Owono
