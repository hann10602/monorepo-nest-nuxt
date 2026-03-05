<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { motion } from 'motion-v';
import z from 'zod';
import { REGEX } from '~/constants/regex';

const contactMeSchema = z.object({
    firstName: z.string().min(1, { message: $t('contact.firstNameError') }),
    lastName: z.string().min(1, { message: $t('contact.lastNameError') }),
    email: z.email({ message: $t('contact.emailError') }),
    phoneNum: z.string().min(10, { message: $t('contact.phoneNumError') }).refine(phoneNum => REGEX.PHONE_NUMBER.test(phoneNum), { message: $t('contact.phoneNumError') }),
    writeAMessage: z.string(),
})

type TContactMeSchema = z.output<typeof contactMeSchema>

const contactMeState = reactive<TContactMeSchema>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNum: '',
    writeAMessage: '',
})

const onSubmit = (e: FormSubmitEvent<TContactMeSchema>) => {
    console.log("data: ", e.data)
}

</script>

<template>
    <div class="lg:mx-auto lg:px-20 w-full h-full flex flex-col justify-center relative
        overflow-hidden py-10">
        <!-- Blurred emerald background elements -->
        <div class="absolute top-50 left-1/2 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl"></div>

        <!-- Content -->
        <div class="relative z-10">
            <motion.h2 :initial="{ opacity: 0, x: -50 }" :while-in-view="{ opacity: 1, x: 0 }"
                :transition="{ duration: 1, ease: 'easeInOut' }" :viewport="{ once: true }"
                class="text-4xl mb-12 bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {{ $t('contact.title') }}
            </motion.h2>
            <div class="flex gap-16">
                <motion.div :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 1, delay: 0.5, ease: 'easeInOut' }" :viewport="{ once: true }"
                    class="space-y-4 w-1/3">
                    <UIcon name="i-lucide-mail" class="w-10 h-10" />
                    <motion.p class="text-xl font-semibold">
                        {{ $t('contact.description') }} <a class="text-emerald-400 underline"
                            href="mailto:jammie.nguyen@gmail.com">jammie.nguyen@gmail.com</a>
                    </motion.p>
                </motion.div>
                <motion.div :initial="{ opacity: 0 }" :while-in-view="{ opacity: 1 }"
                    :transition="{ duration: 1, delay: 0.5, ease: 'easeInOut' }" :viewport="{ once: true }"
                    class="flex-1 bg-emerald-800/30 rounded-2xl p-4">
                    <UForm :schema="contactMeSchema" :state="contactMeState" @submit="onSubmit" class="space-y-8">
                        <div class="flex gap-4">
                            <UFormField :label="$t('contact.firstName')" name="firstName" class="flex-1" :ui="{
                                error: 'absolute -bottom-5 left-0 mt-2 text-red-400 text-xs',
                            }">
                                <template #label>
                                    <p class="text-lg font-semibold text-emerald-300">{{ $t('contact.firstName') }}
                                        <span class="text-red-400 text-sm">*</span>
                                    </p>
                                </template>
                                <UInput v-model="contactMeState.firstName" class="w-full" :ui="{
                                    base: 'h-12',
                                }" />
                            </UFormField>
                            <UFormField :label="$t('contact.lastName')" name="lastName" class="flex-1" :ui="{
                                error: 'absolute -bottom-5 left-0 mt-2 text-red-400 text-xs',
                            }">
                                <template #label>
                                    <p class="text-lg font-semibold text-emerald-300">{{ $t('contact.firstName') }}
                                        <span class="text-red-400 text-sm">*</span>
                                    </p>
                                </template>
                                <UInput v-model="contactMeState.lastName" class="w-full" :ui="{
                                    base: 'h-12',
                                }" />
                            </UFormField>
                        </div>
                        <UFormField name="email" :ui="{
                            error: 'absolute -bottom-5 left-0 mt-2 text-red-400 text-xs',
                        }">
                            <template #label>
                                <p class="text-lg font-semibold text-emerald-300">{{ $t('contact.email') }} <span
                                        class="text-red-400 text-sm">*</span></p>
                            </template>
                            <UInput v-model="contactMeState.email" class="w-full" :ui="{
                                base: 'h-12',
                            }" />
                        </UFormField>
                        <UFormField name="phoneNum" :ui="{
                            error: 'absolute -bottom-5 left-0 mt-2 text-red-400 text-xs',
                        }">
                            <template #label>
                                <p class="text-lg font-semibold text-emerald-300">{{ $t('contact.phoneNum') }} <span
                                        class="text-red-400 text-sm">*</span></p>
                            </template>
                            <UInput v-model="contactMeState.phoneNum" class="w-full" :ui="{
                                base: 'h-12',
                            }" />
                        </UFormField>
                        <UFormField :label="$t('contact.writeAMessage')" name="writeAMessage" :ui="{
                            label: 'text-lg font-semibold text-emerald-300',
                        }">
                            <UTextarea v-model="contactMeState.writeAMessage" class="w-full" :rows="10" />
                        </UFormField>
                    </UForm>
                </motion.div>
            </div>
        </div>
    </div>
</template>