<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { motion } from 'motion-v'
import { z } from 'zod'
import OtherLoginOptions from './_components/OtherLoginOptions.vue'

definePageMeta({
    layout: 'auth',
})

const loginSchema = z.object({
    username: z.string().min(6, { message: 'Username must be at least 6 characters' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    rememberMe: z.boolean(),
})

type TLoginSchema = z.output<typeof loginSchema>

const loginState = reactive<TLoginSchema>({
    username: '',
    password: '',
    rememberMe: false,
})

const showPassword = ref<boolean>(false)

const onSubmit = (e: FormSubmitEvent<TLoginSchema>) => {
    console.log("data: ", e.data)
}
</script>

<template>
    <div class="w-full flex items-center justify-center">
        <ClientOnly>
            <motion.div :initial="{ opacity: 0, y: 100 }" :animate="{ opacity: [0, 0.5, 1], y: [100, -20, 0] }"
                :transition="{ duration: 1, times: [0, 0.6, 1], ease: 'easeInOut' }"
                class="flex flex-col items-center justify-center md:border-2 md:border-emerald-300 md:max-w-[500px] w-full h-screen md:h-auto md:rounded-2xl p-8 dark:bg-gray-800">
                <h1
                    class="bg-linear-to-r from-emerald-500 to-cyan-500 via-emerald-300 bg-clip-text text-transparent text-5xl md:text-4xl font-bold">
                    Portfolio</h1>
                <h2 class="text-2xl mt-6 font-semibold">{{ $t('auth.signIn') }}</h2>
                <p class="mt-2 font-medium text-gray-400">{{ $t('auth.accessYourAccount') }}</p>
                <UForm class="w-full" :schema="loginSchema" :state="loginState" @submit="onSubmit">
                    <UFormField class="mt-6" :label="$t('auth.username')" name="username"
                        placeholder="Enter your username" :ui="{
                            error: 'absolute -bottom-5 left-0 mt-2 text-red-400 text-xs',
                        }">
                        <UInput class="w-full" v-model="loginState.username" :ui="{
                            base: 'h-12 focus:bg-emerald-800/50',
                        }" />
                    </UFormField>

                    <UFormField class="mt-8" :label="$t('auth.password')" name="password"
                        placeholder="Enter your password" :ui="{
                            error: 'absolute -bottom-5 left-0 mt-2 text-red-400 text-xs',
                        }">
                        <UInput class="w-full" :type="showPassword ? 'text' : 'password'" v-model="loginState.password"
                            :ui="{
                                base: 'h-12 focus:bg-emerald-800/50',
                            }">
                            <template #trailing>
                                <UButton color="neutral" variant="link" size="sm"
                                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                    :aria-pressed="showPassword" @click="showPassword = !showPassword" />
                            </template>
                        </UInput>
                    </UFormField>

                    <div class="flex items-center justify-between text-sm text-gray-400 mt-10">
                        <UCheckbox :model="loginState.rememberMe">
                            <template #label>
                                <p class="text-sm text-gray-400 font-normal cursor-pointer">{{ $t('auth.rememberMe') }}
                                </p>
                            </template>
                        </UCheckbox>
                        <motion.p :while-hover="{ scale: 1.05 }">
                            <NuxtLink to="/forgot-password" class="text-sm text-gray-400 font-normal">{{
                                $t('auth.forgotPassword') }} ?
                            </NuxtLink>
                        </motion.p>
                    </div>

                    <UButton type="submit"
                        class="w-full cursor-pointer font-bold mt-8 bg-linear-to-r from-emerald-500 to-cyan-500 via-emerald-300 h-16 flex items-center justify-center">
                        {{ $t('auth.signIn').toUpperCase() }}</UButton>
                </UForm>

                <div class="w-full flex items-center justify-center gap-2 mt-16 mb-4">
                    <div class="flex-1 bg-gray-500 h-0.5"></div>
                    <div class="text-center text-gray-400 font-medium">OR</div>
                    <div class="flex-1 bg-gray-500 h-0.5"></div>
                </div>

                <OtherLoginOptions />
            </motion.div>
        </ClientOnly>
    </div>
</template>