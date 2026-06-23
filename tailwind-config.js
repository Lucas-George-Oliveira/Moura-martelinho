tailwind.config = {
    theme: {
        extend: {
            colors: {
                gold: {
                    50: '#fefdf0',
                    100: '#fcf6be',
                    200: '#f8ee88',
                    300: '#f1df4f',
                    400: '#e5ca24',
                    500: '#d4af37', // Dourado Metálico
                    600: '#b48c26',
                    700: '#8e661c',
                    800: '#6f4e1a',
                    900: '#5c3f19',
                },
                dark: {
                    900: '#0A0A0A', // Preto Profundo
                    800: '#121212', // Preto Secundário
                    700: '#1A1A1A', // Cinza Premium
                    600: '#262626',
                }
            },
            fontFamily: {
                serif: ['Cinzel', 'Playfair Display', 'serif'],
                sans: ['Montserrat', 'Inter', 'sans-serif'],
            }
        }
    }
}