    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            obsidian: {
              950: '#050608',
              900: '#08090C',
              850: '#0D0F14',
              800: '#12151C',
              700: '#1B1F2A'
            },
            gold: {
              300: '#F6E6B8',
              400: '#EBD08B',
              500: '#D4AF37', // Signature Metallic Gold
              600: '#C5A059',
              700: '#A47D2C',
              800: '#755418'
            },
            champagne: '#F4ECE1',
            bronze: '#8C7043'
          },
          fontFamily: {
            serif: ['Cormorant Garamond', 'Georgia', 'serif'],
            cinzel: ['Cinzel', 'serif'],
            sans: ['Inter', 'sans-serif']
          },
          animation: {
            'spin-slow': 'spin 90s linear infinite',
            'spin-reverse-slow': 'spinReverse 120s linear infinite',
            'pulse-subtle': 'pulseSubtle 6s ease-in-out infinite',
            'mandala-glow': 'mandalaGlow 8s ease-in-out infinite',
            'float': 'float 7s ease-in-out infinite'
          },
          keyframes: {
            spinReverse: {
              '0%': { transform: 'rotate(360deg)' },
              '100%': { transform: 'rotate(0deg)' }
            },
            pulseSubtle: {
              '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
              '50%': { opacity: '0.9', transform: 'scale(1.025)' }
            },
            mandalaGlow: {
              '0%, 100%': { filter: 'drop-shadow(0 0 18px rgba(212, 175, 55, 0.25))' },
              '50%': { filter: 'drop-shadow(0 0 35px rgba(212, 175, 55, 0.45))' }
            },
            float: {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-8px)' }
            }
          }
        }
      }
    }
