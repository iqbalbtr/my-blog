export const useTheme = defineStore('theme', {
    state: () => ({
        mode: 'default',
    }),
    actions: {
        switchTheme(theme: 'dark' | 'light' | 'default') {
            this.mode = theme;
            localStorage.setItem('theme-mode', theme);
        },
        init() {
            const savedTheme = localStorage.getItem('theme-mode');
            if (savedTheme) {
                this.mode = savedTheme;
            }
        }
    },
    getters: {
        currentMode: (state) => state.mode
    },
})
