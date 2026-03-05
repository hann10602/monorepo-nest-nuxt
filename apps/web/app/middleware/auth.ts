export default defineNuxtRouteMiddleware((to, from) => {
    const { jwtToken } = storeToRefs(useAuthStore())

    if(jwtToken.value) {
        return navigateTo('/')
    }
})