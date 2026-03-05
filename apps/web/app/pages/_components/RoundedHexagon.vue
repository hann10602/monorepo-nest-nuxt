<script setup lang="ts">
const props = withDefaults(defineProps<{
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    borderWidth?: number
    glowIntensity?: number
}>(), {
    size: 'xl',
    borderWidth: 3,
    glowIntensity: 6
})

const sizeConfig = {
    sm: { class: 'w-48 h-56', viewBox: '0 0 200 230' },
    md: { class: 'w-64 h-72', viewBox: '0 0 200 230' },
    lg: { class: 'w-80 h-96', viewBox: '0 0 200 230' },
    xl: { class: 'w-96 h-[450px]', viewBox: '0 0 200 230' },
    '2xl': { class: 'w-[500px] h-[580px]', viewBox: '0 0 200 230' }
}

const currentSize = sizeConfig[props.size]
</script>

<template>
    <div class="relative flex items-center justify-center" :class="currentSize.class">
        <svg :viewBox="currentSize.viewBox" class="absolute inset-0 w-full h-full">
            <!-- Border with gradient and glow -->
            <defs>
                <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#10b981" />
                    <stop offset="50%" stop-color="#14b8a6" />
                    <stop offset="100%" stop-color="#06b6d4" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur :stdDeviation="glowIntensity" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <!-- Outer hexagon -->
            <path d="M 100 5 
          L 185 52.5 Q 195 57.5 195 70 
          L 195 160 Q 195 172.5 185 177.5 
          L 100 225 Q 95 227.5 90 225 
          L 15 177.5 Q 5 172.5 5 160 
          L 5 70 Q 5 57.5 15 52.5 
          L 90 5 Q 95 2.5 100 5 Z" fill="url(#hexGrad)" filter="url(#glow)" />

            <!-- Inner area -->
            <path :d="`M 100 ${borderWidth + 7} 
          L ${180 - borderWidth} ${57.5 + borderWidth / 2} Q ${188 - borderWidth} ${62 + borderWidth / 2} ${188 - borderWidth} ${72 + borderWidth} 
          L ${188 - borderWidth} ${158 - borderWidth} Q ${188 - borderWidth} ${168 - borderWidth / 2} ${180 - borderWidth} ${172.5 - borderWidth / 2} 
          L 100 ${218 - borderWidth} Q 96 ${220 - borderWidth} 92 ${218 - borderWidth} 
          L ${20 + borderWidth} ${172.5 - borderWidth / 2} Q ${12 + borderWidth} ${168 - borderWidth / 2} ${12 + borderWidth} ${158 - borderWidth} 
          L ${12 + borderWidth} ${72 + borderWidth} Q ${12 + borderWidth} ${62 + borderWidth / 2} ${20 + borderWidth} ${57.5 + borderWidth / 2} 
          L 92 ${borderWidth + 7} Q 96 ${borderWidth + 5} 100 ${borderWidth + 7} Z`" fill="rgba(17, 24, 39, 0.9)" />
        </svg>

        <div class="relative z-10 text-white text-center p-8 md:p-12">
            <slot>
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Content</h2>
                <p class="text-base md:text-lg text-emerald-400">Rounded corners</p>
            </slot>
        </div>
    </div>
</template>