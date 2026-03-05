<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import TechStackItem from './TechStackItem.vue'
import { motion } from 'motion-v'

export interface ITechStack {
    logo: string
    alt: string
    name: string
    yearOfExperience: number
}

const props = defineProps<{
    items: ITechStack[]
    autoRotate?: boolean
    rotateInterval?: number
}>()

const { isMobile } = storeToRefs(useConfigStore())
const currentIndex = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const hoveredItem = ref<ITechStack | undefined>(undefined)
let autoRotateTimer: NodeJS.Timeout | null = null

// Calculate position and scale for each item
const getItemStyle = (index: number) => {
    const totalItems = props.items.length
    const relativeIndex = (index - currentIndex.value + totalItems) % totalItems

    // Position items in a circle
    // Center item: relativeIndex = 0
    // Items wrap around: -2, -1, 0, 1, 2
    let position = relativeIndex
    if (position > totalItems / 2) {
        position = position - totalItems
    }

    // Calculate horizontal position (elliptical path)
    const angle = (position / totalItems) * Math.PI * 2
    const radiusX = 400 // Horizontal radius
    const radiusY = 100 // Vertical radius for 3D effect

    const x = Math.sin(angle) * radiusX
    const z = Math.cos(angle) * radiusY - radiusY

    // Scale: center item is larger (1.2), side items are smaller (0.6-0.8)
    const scale = Math.max(0.5, 1.2 - Math.abs(position) * 0.3)

    // Opacity: center is fully visible, sides fade
    const opacity = Math.max(0.3, 1 - Math.abs(position) * 0.3)

    // Z-index: center item should be on top
    const zIndex = Math.round(100 - Math.abs(position) * 10)

    return {
        transform: `translate3d(${x}px, 0, ${z}px) scale(${scale})`,
        opacity: opacity,
        zIndex: zIndex,
        pointerEvents: (Math.abs(position) > 2 ? 'none' : 'auto') as 'none' | 'auto'
    }
}

// Navigate to next item
const next = () => {
    currentIndex.value = (currentIndex.value + 1) % props.items.length
}

// Navigate to previous item
const prev = () => {
    currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length
}

// Go to specific item
const goTo = (index: number) => {
    currentIndex.value = index
}

// Auto-rotate functionality
const startAutoRotate = () => {
    if (props.autoRotate && !autoRotateTimer) {
        autoRotateTimer = setInterval(() => {
            if (!isDragging.value) {
                next()
            }
        }, props.rotateInterval || 3000)
    }
}

const stopAutoRotate = () => {
    if (autoRotateTimer) {
        clearInterval(autoRotateTimer)
        autoRotateTimer = null
    }
}

// Mouse/Touch drag handlers
const handleDragStart = (e: MouseEvent | TouchEvent) => {
    isDragging.value = true
    startX.value = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX
    stopAutoRotate()
}

const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.value) return

    const currentX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX
    const diff = currentX - startX.value

    // Swipe threshold
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            prev()
        } else {
            next()
        }
        isDragging.value = false
    }
}

const handleDragEnd = () => {
    isDragging.value = false
    if (props.autoRotate) {
        startAutoRotate()
    }
}

const handleMouseLeave = () => {
    hoveredItem.value = undefined
    startAutoRotate()

}

const handleMouseEnter = () => {
    if (props.items[currentIndex.value]) {
        hoveredItem.value = props.items[currentIndex.value]
    }
    stopAutoRotate()
}

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
        prev()
    } else if (e.key === 'ArrowRight') {
        next()
    }
}

onMounted(() => {
    if (props.autoRotate) {
        startAutoRotate()
    }
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    stopAutoRotate()
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <motion.div :viewport="{ once: true }" :initial="{ opacity: 0, y: 50 }" :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 1, delay: 2 }" class="flex flex-col items-center justify-center">
        <div class="relative w-full h-full flex items-center justify-center overflow-hidden">
            <!-- Carousel container with 3D perspective -->
            <div class="relative w-full h-[500px] flex items-center justify-center" style="perspective: 1200px;"
                @mousedown="handleDragStart" @mousemove="handleDragMove" @mouseup="handleDragEnd"
                @touchstart="handleDragStart" @touchmove="handleDragMove" @touchend="handleDragEnd"
                @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <!-- Carousel items -->
                <div class="relative w-full h-full flex items-center justify-center"
                    style="transform-style: preserve-3d;">
                    <TransitionGroup name="carousel">
                        <div v-for="(item, index) in items" :key="item.name"
                            class="absolute transition-all duration-700 ease-out cursor-pointer"
                            :style="getItemStyle(index)" @click="goTo(index)">
                            <TechStackItem :logo="item.logo" :alt="item.alt" :name="item.name"
                                :yearOfExperience="item.yearOfExperience" />
                        </div>
                    </TransitionGroup>
                </div>
            </div>

            <!-- Navigation buttons -->
            <template v-if="!isMobile">
                <button @click="prev"
                    class="absolute left-8 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
                    aria-label="Previous">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button @click="next"
                    class="absolute right-8 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
                    aria-label="Next">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </template>

            <!-- Dots indicator -->
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                <button v-for="(item, index) in items" :key="`dot-${index}`" @click="goTo(index)"
                    class="w-3 h-3 rounded-full transition-all duration-300"
                    :class="currentIndex === index ? 'bg-emerald-500 w-8' : 'bg-white/50 hover:bg-white/70'"
                    :aria-label="`Go to ${item.name}`" />
            </div>
        </div>
    </motion.div>
</template>

<style scoped>
.carousel-enter-active,
.carousel-leave-active {
    transition: all 0.7s ease;
}

.carousel-enter-from {
    opacity: 0;
    transform: scale(0.5);
}

.carousel-leave-to {
    opacity: 0;
    transform: scale(0.5);
}
</style>
