<template>
  <div
    v-if="images.length > 0 || hasEmptyLayer"
    class="m-gallery maz-flex"
    :style="[sizeStyle]"
    :class="{ 'maz-rounded': !noRadius }"
  >
    <section class="m-gallery__wrapper maz-flex maz-flex-1">
      <figure
        v-for="(image, i) in imagesShown"
        :key="i"
        class="m-gallery__item !maz-my-0 maz-flex maz-flex-center"
        :class="[`m-gallery__item--${i + 1}`]"
      >
        <img
          v-lazy-img:[lazyImgArgument]="{ src: image.thumbnail, disabled: !lazy }"
          v-zoom-img="{
            src: image.src,
            alt: image.alt,
            disabled: noZoom || shouldHaveRemainingLayer(i),
            blur: blur,
            scale: scale,
          }"
          class="m-gallery__item__image maz-flex-1"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          :alt="image.alt"
          loading="lazy"
        />
        <div
          v-if="shouldHaveRemainingLayer(i)"
          v-zoom-img="{
            src: image.src,
            alt: image.alt,
            disabled: noZoom,
            blur: false,
            scale: scale,
          }"
          class="m-gallery__remaining-layer maz-flex maz-bg-overlay maz-flex-center"
        >
          <span class="maz-text-2xl maz-text-white">+{{ numberImagesRemaining }}</span>
        </div>
      </figure>
      <div
        v-if="hasEmptyLayer && images.length === 0"
        class="maz-flex maz-w-full maz-bg-color-light maz-text-normal maz-flex-center"
        :class="{ 'maz-rounded-xl': !noRadius }"
        :style="[sizeStyle]"
      >
        <NoPhotographyIcon class="maz-h-8 maz-w-8" />
      </div>
    </section>
    <div
      v-for="(image, i) in imagesHidden"
      :key="i"
      v-zoom-img="{ src: image.src, disabled: noZoom }"
      class="m-gallery__hidden"
    ></div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, type PropType, onBeforeMount, defineAsyncComponent } from 'vue'
  import { vZoomImg } from './../modules/directives/v-zoom-img/zoom-img'
  import { vLazyImg } from './../modules/directives/v-lazy-img/lazy-img'
  import type { MazGalleryImage } from './types'
  export type { MazGalleryImage } from './types'

  const NoPhotographyIcon = defineAsyncComponent(() => import('./../icons/no-photography.svg'))

  const lazyImgArgument = 'bg-image'

  const props = defineProps({
    // Array of string or object: `['https://via.placeholder.com/500', 'https://via.placeholder.com/600']` or `[{ slug: 'https://via.placeholder.com/500', alt: 'image descripton' }, { slug: 'https://via.placeholder.com/600', alt: 'image descripton' }]`
    images: {
      type: Array as PropType<MazGalleryImage[]>,
      default: () => [],
    },
    // Images count shown (max: 5)
    imagesShownCount: { type: Number, default: 5 },
    // Remove transparent layer with the remain count (ex: +2)
    noRemaining: { type: Boolean, default: false },
    // Height of gallery
    height: { type: [Number, String], default: 150 },
    // Remove default height
    noHeight: { type: Boolean, default: false },
    // Width of gallery
    width: { type: [Number, String], default: '100%' },
    // Remove default width
    noWidth: { type: Boolean, default: false },
    // Add the default border radius to gallery
    noRadius: { type: Boolean, default: false },
    // Add feature to show the carousel images on click
    noZoom: { type: Boolean, default: false },
    // Layer with photography icon when no images is provided
    hasEmptyLayer: { type: Boolean, default: true },
    // Lazy load image - if false, images are directly loaded
    lazy: { type: Boolean, default: true },
    // Blur animation effect on image hover
    blur: { type: Boolean, default: true },
    // Scale animation effect on image hover
    scale: { type: Boolean, default: true },
  })

  onBeforeMount(() => {
    if (props.imagesShownCount > 5)
      // eslint-disable-next-line no-console
      console.warn('[MazUI](m-gallery) The maximum of "images-shown-count" is 5')
  })

  const sizeStyle = computed(() => {
    const { height, width, noWidth, noHeight } = props
    return {
      ...(noWidth
        ? {}
        : {
            flex: '0 0 ' + typeof width === 'number' ? `${width}px` : width,
            width: typeof width === 'number' ? `${width}px` : width,
          }),
      ...(noHeight
        ? {}
        : {
            height: typeof height === 'number' ? `${height}px` : `${height}`,
            minHeight: typeof height === 'number' ? `${height}px` : `${height}`,
          }),
    }
  })
  const imagesCount = computed(() => {
    return props.imagesShownCount <= 5 ? props.imagesShownCount : 5
  })
  const numberImagesRemaining = computed(() => {
    return (
      props.images.length -
      (props.images.length < imagesCount.value ? props.images.length : imagesCount.value)
    )
  })
  const imagesNormalized = computed(() => {
    return props.images.map((image) =>
      typeof image === 'object'
        ? { ...image, thumbnail: image.thumbnail ?? image.src }
        : { src: image, thumbnail: image, alt: undefined },
    )
  })
  const imagesShown = computed(() => {
    return imagesNormalized.value.slice(0, imagesCount.value)
  })
  const imagesHidden = computed(() => {
    return imagesNormalized.value.slice(imagesCount.value, props.images.length)
  })
  const shouldHaveRemainingLayer = (index: number) => {
    return (
      numberImagesRemaining.value && index + 1 === imagesShown.value.length && !props.noRemaining
    )
  }
</script>

<style lang="postcss" scoped>
  .m-gallery {
    @apply maz-relative maz-overflow-hidden;

    &__hidden {
      @apply maz-hidden;
    }

    &__item {
      @apply maz-absolute maz-top-0 maz-m-0 maz-h-1/2 maz-w-full
        maz-overflow-hidden maz-border-l-2 maz-border-transparent maz-p-0;

      &--1 {
        left: 0;
        height: 100%;

        &:not(:last-child) {
          width: 50%;
        }
      }

      &--2 {
        left: 50%;
        width: 50%;
        height: 50%;

        &:last-child {
          height: 100%;
        }

        &:nth-last-child(4) {
          width: 25%;
        }
      }

      &--3 {
        top: 50%;
        left: 50%;
        width: 25%;

        &:last-child {
          width: 50%;
        }

        &:nth-last-child(3) {
          top: 0;
          left: 75%;
        }
      }

      &--4 {
        @apply maz-border-t-2 maz-border-transparent;

        top: 50%;
        left: 50%;
        width: 25%;

        &:last-child {
          left: 75%;
          width: 25%;
        }
      }

      &--5 {
        @apply maz-border-t-2 maz-border-transparent;

        top: 50%;
        left: 75%;
        width: 25%;
      }

      &:first-child {
        border-left: 0;
      }

      &--3:last-child,
      &--3:nth-last-child(2),
      &--4:last-child,
      &--5 {
        @apply maz-border-t-2 maz-border-transparent;
      }

      &__image {
        height: 100%;
        max-width: 100%;
        width: 100%;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        background-color: hsl(0deg 0% 0% / 50%);
      }
    }

    &__remaining-layer {
      position: absolute;
      inset: 0;

      a span {
        color: hsl(0deg 0% 100%);
        font-size: 2rem;
      }
    }
  }
</style>
