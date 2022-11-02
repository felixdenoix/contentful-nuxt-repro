<template>
  <picture>
    <source
      type="image/webp"
      :srcset="`${fields.file.url}?w=400&fm=webp 500w,
        ${fields.file.url}?w=700&fm=webp 768w,
        ${fields.file.url}?w=1000&fm=webp 1024w,
        ${fields.file.url}?fm=webp 1440w`"
      sizes="
        (max-width: 500px) 400px,
        (max-width: 500px and -webkit-min-device-pixel-ratio:2) 400px,
        (max-width: 500px and min-resolution: 192dpi) 400px,
        (max-width: 500px and min-resolution: 2dppx) 400px,
        (max-width: 768px) 700px,
        (max-width: 768px and -webkit-min-device-pixel-ratio:2) 700px,
        (max-width: 768px and min-resolution: 192dpi) 700px,
        (max-width: 768px and min-resolution: 2dppx) 700px,
        (max-width: 1024px) 1024px,
        (max-width: 1024px and -webkit-min-device-pixel-ratio:2) 1024px,
        (max-width: 1024px and min-resolution: 192dpi) 1024px,
        (max-width: 1024px and min-resolution: 2dppx) 1024px,
        1440px
      ">
    <source
      :type="fields.file.contentType"
      :srcset="`${fields.file.url}?w=400 500w,
        ${fields.file.url}?w=700 768w,
        ${fields.file.url}?w=1000 1024w,
        ${fields.file.url} 1440w'`"
      sizes="
        (max-width: 500px) 400px,
        (max-width: 500px and -webkit-min-device-pixel-ratio: 2) 400px,
        (max-width: 500px and min-resolution: 192dpi) 400px,
        (max-width: 500px and min-resolution: 2dppx) 400px,
        (max-width: 768px) 700px,
        (max-width: 768px and -webkit-min-device-pixel-ratio: 2) 700px,
        (max-width: 768px and min-resolution: 192dpi) 700px,
        (max-width: 768px and min-resolution: 2dppx) 700px,
        (max-width: 1024px) 1024px,
        (max-width: 1024px and -webkit-min-device-pixel-ratio: 2) 1024px,
        (max-width: 1024px and min-resolution: 192dpi) 1024px,
        (max-width: 1024px and min-resolution: 2dppx) 1024px,
        1440px
      ">
    <img
      :src="fields.file.url"
      :height="fields.file && fields.file.details.image.height"
      :width="fields.file && fields.file.details.image.width"
      :style="style"
      :alt="fields.title">
  </picture>
</template>

<script setup lang="ts">
import * as types from '@/assets/types'
// const props = defineProps<types.Asset>() // Not possible to pass interface directly
const props = defineProps<{
  metadata: any,
  fields: any,
  sys: types.Sys
  style?: string,
}>()

const {
  fields,
  style
} = props

</script>

<style lang="stylus" scoped>

img
  height: auto;
  width: 100%;


</style>
