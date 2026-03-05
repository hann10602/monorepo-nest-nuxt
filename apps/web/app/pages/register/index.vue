<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { motion } from 'motion-v'
import { z } from 'zod'
import { REGEX } from '~/constants/regex'

definePageMeta({
    layout: 'auth',
})

const { isMobile } = storeToRefs(useConfigStore())

const requirements = [
    { regex: REGEX.AT_LEAST_CHARACTERS(8), text: 'At least 8 characters' },
    { regex: REGEX.AT_LEAST_1_NUMBER, text: 'At least 1 number' },
    { regex: REGEX.AT_LEAST_1_LOWERCASE_LETTER, text: 'At least 1 lowercase letter' },
    { regex: REGEX.AT_LEAST_1_UPPERCASE_LETTER, text: 'At least 1 uppercase letter' }
]

const registerSchema = z.object({
    username: z.string().min(6, { message: 'Username must be at least 6 characters' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }).refine(password => requirements.some(req => req.regex.test(password)), { message: 'Password must meet the requirements' }),
    confirmPassword: z.string(),
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        })
    }
})

type TCheckStrength = {
    met: boolean;
    text: string;
}

type TRegisterSChema = z.output<typeof registerSchema>

const registerState = reactive<TRegisterSChema>({
    username: '',
    password: '',
    confirmPassword: '',
})

const showPassword = ref<boolean>(false)
const showConfirmPassword = ref<boolean>(false)

const checkStrength = (password: string): TCheckStrength[] => requirements.map(req => ({ met: req.regex.test(password), text: req.text }))

const strength = computed<TCheckStrength[]>(() => checkStrength(registerState.password))
const score = computed<number>(() => strength.value.filter(req => req.met).length)

const onSubmit = (e: FormSubmitEvent<TRegisterSChema>) => {
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
                <h2 class="text-2xl mt-6 font-semibold">{{ $t('auth.signUp') }}</h2>
                <p class="mt-2 font-medium text-gray-400">{{ $t('auth.createYourAccount') }}</p>
                <UForm class="w-full" :schema="registerSchema" :state="registerState" @submit="onSubmit">
                    <UFormField class="mt-6" :label="$t('auth.username')" name="username"
                        placeholder="Enter your username" :ui="{
                            error: 'absolute -bottom-5 left-0 mt-2 text-red-400 text-xs',
                        }">
                        <UInput class="w-full" v-model="registerState.username" :ui="{
                            base: 'h-12 focus:bg-emerald-800/50',
                        }" />
                    </UFormField>

                    <UFormField class="mt-8" :label="$t('auth.password')" name="password"
                        placeholder="Enter your password" :ui="{
                            error: 'hidden',
                        }">
                        <UInput class="w-full" :type="showPassword ? 'text' : 'password'"
                            v-model="registerState.password" :ui="{
                                base: 'h-12 focus:bg-emerald-800/50',
                            }">
                            <template #trailing>
                                <UButton color="neutral" variant="link" size="sm"
                                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                    :aria-pressed="showPassword" @click="showPassword = !showPassword" />
                            </template>
                        </UInput>
                    </UFormField>

                    <UProgress color="success" indicator="qweqwe" :model-value="score" :max="4" size="sm"
                        class="mt-2" />

                    <ul class="mt-2 space-y-1">
                        <li v-for="item in strength" :key="item.text" class="flex items-center gap-2">
                            <UIcon :name="item.met ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
                                :class="item.met ? 'text-green-500' : 'text-gray-500'" />
                            <p class="text-sm font-normal" :class="item.met ? 'text-green-500' : 'text-gray-500'">
                                {{ item.text
                                }}</p>
                        </li>
                    </ul>

                    <UFormField class="mt-8" :label="$t('auth.confirmPassword')" name="confirmPassword"
                        placeholder="Enter your confirm password" :ui="{
                            error: 'absolute -bottom-5 left-0 mt-2 text-red-400 text-xs',
                        }">
                        <UInput class="w-full" :type="showConfirmPassword ? 'text' : 'password'"
                            v-model="registerState.confirmPassword" :ui="{
                                base: 'h-12 focus:bg-emerald-800/50',
                            }">
                            <template #trailing>
                                <UButton color="neutral" variant="link" size="sm"
                                    :icon="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                    :aria-pressed="showConfirmPassword"
                                    @click="showConfirmPassword = !showConfirmPassword" />
                            </template>
                        </UInput>
                    </UFormField>

                    <UButton type="submit"
                        class="w-full cursor-pointer font-bold mt-8 bg-linear-to-r from-emerald-500 to-cyan-500 via-emerald-300 h-16 flex items-center justify-center">
                        {{ $t('auth.signUp').toUpperCase() }}</UButton>
                </UForm>

                <template v-if="isMobile">
                    <NuxtLink to="/login" class="w-full">
                        <UButton variant="soft"
                            class="w-full cursor-pointer font-bold bg-linear-to-r text-black from-cyan-500 to-blue-500 via-cyan-300 h-16 flex items-center justify-center mt-10">
                            {{ $t('auth.signIn').toUpperCase() }}
                        </UButton>
                    </NuxtLink>
                </template>
                <template v-else>
                    <p class="mt-6 text-sm text-gray-400 font-normal">
                        {{ $t('auth.alreadyHaveAnAccount') }}
                        <NuxtLink to="/login"
                            class="text-sm text-emerald-400 font-normal hover:underline transition-all duration-300 hover:text-emerald-300">
                            {{
                                $t('auth.signIn') }}
                        </NuxtLink>
                    </p>
                </template>
            </motion.div>
        </ClientOnly>
    </div>
</template>