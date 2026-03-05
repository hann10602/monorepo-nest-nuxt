export const useAuthStore = defineStore('auth', () => {
    const jwtToken = ref<string | null>(null)

    if(localStorage.getItem('jwtToken')) {
        jwtToken.value = localStorage.getItem('jwtToken')
    }

    watch(jwtToken, (newJwtToken) => {
        if(newJwtToken) {
            localStorage.setItem('jwtToken', newJwtToken)
        }
    }, {deep: true})

    return {
        jwtToken,
    }
})