import { h } from 'vue'
import { type Block, BLOCKS } from '@contentful/rich-text-types'; // Can use types but not Enums or Objects
import { ContentfulAsset } from '#components'

export const renderNode = {
  [BLOCKS.EMBEDDED_ASSET]: (node: Block, key: string) => {
    const {
      nodeType,
      data: {
        target
      }
    } = node

    return (
      h(
        'figure',
        { key },
        [
          h(
            ContentfulAsset,
            { ...target }
          ),
          h(
            'figcaption',
            {},
            [
              target?.fields?.description
            ]
          )
        ]
      )
    )
  }
}

export default {
  renderNode
}
