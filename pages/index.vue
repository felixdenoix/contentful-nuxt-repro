<template>
  <div class="page">
    <h1>Import shenanigans with Nuxt & Contentful rich-text-types packages</h1>

    <div>
      <h3>Rendered rich-text</h3>
      <p>ok in dev mode but does not work when using SSR. An error is thrown when trying to access the running website.
        <pre>
[nuxt] [request error] [unhandled] [500] Named export 'MARKS' not found. The requested module '@contentful/rich-text-types' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from '@contentful/rich-text-types';
const { MARKS, BLOCKS, INLINES, helpers } = pkg;

  at ModuleJob._instantiate (node:internal/modules/esm/module_job:123:21)
  at async ModuleJob.run (node:internal/modules/esm/module_job:189:5)
  at async Promise.all (index 0)
  at async ESMLoader.import (node:internal/modules/esm/loader:530:24)
  at async ./server/chunks/handlers/renderer.mjs:305:24
  at async ./server/chunks/handlers/renderer.mjs:369:64
  at async ./server/chunks/handlers/renderer.mjs:29:22
  at async Object.handler (./server/node_modules/h3/dist/index.mjs:634:19)
  at async Server.toNodeHandle (./server/node_modules/h3/dist/index.mjs:698:7)
        </pre>
      </p>
      <p>when using the <Nuxt-Link to="https://v3.nuxtjs.org/api/configuration/nuxt-config#transpile">build transpile option</Nuxt-Link> from the `nuxt.config.ts` file, the website will break in dev mode and the rich-text renderer from the `RichText` component will throw an error in the browser console stating that the values (only the objects such as BLOCK but not the typescript types) are undefined as in the example bellow but will work when built and started.
        <pre>❌ RichText.ts:2 Uncaught SyntaxError: The requested module '/_nuxt/node_modules/@contentful/rich-text-types/dist/index.js?v=2aad74db' does not provide an export named 'BLOCKS' (at RichText.ts:2:1)</pre>
      </p>

    </div>
    <RichText
      v-if="richtext"
      :document="richtext.document"
      :node-renderers="renderNode" />

  </div>
</template>

<script lang="ts" setup async>
import { renderNode } from '@/assets/NodeRenderers'
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
