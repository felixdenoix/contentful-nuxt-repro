export interface useRetrievePageOptions {
  consolidate?: boolean
}

// Contentful rich-text content mock
export async function useRetrievePageRichText() {
  const {
    data: richtext,
    error,
    pending,
    execute,
    refresh
  } = await useLazyAsyncData(
    `pages_test`,
    () => {
      return $fetch('/api/contentful')
    }
  )
  return {
    richtext,
    error,
    pending,
    execute,
    refresh
  }
}
