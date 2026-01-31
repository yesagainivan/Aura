export interface Palette {
    name: string;
    colors: string[];
    background: string;
}

export const palettes: Palette[] = [
    { name: 'Sunset', colors: ['#FF9E80', '#FF6D00', '#FFD180'], background: '#FFF3E0' },
    { name: 'Ocean', colors: ['#80D8FF', '#00B0FF', '#0091EA'], background: '#E1F5FE' },
    { name: 'Forest', colors: ['#A5D6A7', '#66BB6A', '#2E7D32'], background: '#E8F5E9' },
    { name: 'Berry', colors: ['#F48FB1', '#EC407A', '#AD1457'], background: '#FCE4EC' },
    { name: 'Lavender', colors: ['#CE93D8', '#AB47BC', '#7B1FA2'], background: '#F3E5F5' },
    { name: 'Mint', colors: ['#80CBC4', '#26A69A', '#00695C'], background: '#E0F2F1' },
    { name: 'Gold', colors: ['#FFE082', '#FFCA28', '#FF8F00'], background: '#FFF8E1' },
    { name: 'Slate', colors: ['#90A4AE', '#546E7A', '#37474F'], background: '#ECEFF1' },
    { name: 'Coral', colors: ['#FFAB91', '#FF7043', '#D84315'], background: '#FBE9E7' },
    { name: 'Midnight', colors: ['#9FA8DA', '#5C6BC0', '#283593'], background: '#E8EAF6' },
    { name: 'Coffee', colors: ['#BCAAA4', '#8D6E63', '#4E342E'], background: '#EFEBE9' },
    { name: 'Lime', colors: ['#E6EE9C', '#D4E157', '#9E9D24'], background: '#F9FBE7' },
    { name: 'Cherry', colors: ['#EF9A9A', '#EF5350', '#C62828'], background: '#FFEBEE' },
    { name: 'Sky', colors: ['#81D4FA', '#29B6F6', '#0277BD'], background: '#E1F5FE' },
    { name: 'Teal', colors: ['#80CBC4', '#4DB6AC', '#00695C'], background: '#E0F2F1' },
    { name: 'Plum', colors: ['#B39DDB', '#7E57C2', '#4527A0'], background: '#EDE7F6' },
    { name: 'Rose', colors: ['#FFCCBC', '#FF8A65', '#D84315'], background: '#FBE9E7' },
    { name: 'Cyan', colors: ['#84FFFF', '#18FFFF', '#00E5FF'], background: '#E0F7FA' },
    { name: 'Amber', colors: ['#FFE57F', '#FFD740', '#FFC400'], background: '#FFF8E1' },
    { name: 'Indigo', colors: ['#C5CAE9', '#7986CB', '#3949AB'], background: '#E8EAF6' },
];

export function getPalette(hash: number): Palette {
    // Use a safer modulo operation to handle potentially negative numbers if hash logic changes
    const index = Math.abs(hash) % palettes.length;
    return palettes[index];
}
