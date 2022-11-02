<template>
  <div class="page">
    <h1>Import shenanigans with Nuxt & Contentful rich-text packages</h1>

    <div>
      <h3>Server Rendered rich-text</h3>
      <RichText
        v-if="richtext"
        :document="richtext.document"/>
    </div>

  </div>
</template>

<script lang="ts" setup async>
import RichText from '~~/components/RichText';
import { useRetrievePageRichText } from '~~/composables/useRetrievePage';

const {
  richtext
} = await useRetrievePageRichText();

</script>

<style lang="stylus">
html, body
  font-family: Arial, sans-serif;
</style>
