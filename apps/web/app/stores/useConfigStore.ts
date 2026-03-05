import { defineStore } from "pinia";

export const useConfigStore = defineStore('config', () => {
    const isDarkMode = useDark({
        selector: 'html',
        attribute: 'class',
        valueDark: 'dark',
        valueLight: 'light',
        listenToStorageChanges: true,
    })

    const isMobile = useMediaQuery('(max-width: 768px)')
    const isTablet = useMediaQuery('(max-width: 1024px)')
    const isDesktop = useMediaQuery('(min-width: 1025px)')

    const currentTheme = computed(() => isDarkMode.value ? 'dark' : 'light')

    return {
        isDarkMode,
        currentTheme,
        isMobile,
        isTablet,
        isDesktop,
    }
})

