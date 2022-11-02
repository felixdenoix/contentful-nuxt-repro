import { h } from 'vue'
import { MARKS, BLOCKS, INLINES, helpers, Node, Block, Inline, Document } from '@contentful/rich-text-types'
import { Next, NodeRenderer, RenderMark, RenderNode } from '@contentful/rich-text-html-renderer'
import { NuxtLink } from '#components'

export default defineComponent({
  props: {
    nodeRenderers: {
      type: Object
    },
    markRenderers: {
      type: Object
    },
    document: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    if (!props.document) {
      console.warn('No document given to RichText renderer')
      return null
    }

    const defaultInline = (type: string, node: Node, key: string) => {
      return h(
        'span',
        {
          key,
          style: {
            margin: '0px 5px',
            padding: '0 .25rem 0 .75rem',
            border: '1px solid #d3dce0',
            fontFamily: 'monospace'
          }
        },
        `inline: ${type}, sys.id: ${node.data.target.sys.id}`
      )
    }

    const defaultMarkRenderers = {
      [MARKS.BOLD]: (children: string, key: string) => h('strong', { key }, children),
      [MARKS.ITALIC]: (children: string, key: string) => h('em', { key }, children),
      [MARKS.UNDERLINE]: (children: string, key: string) => h('u', { key }, children),
      [MARKS.CODE]: (children: string, key: string) => h('code', { key }, children)
    }

    const defaultNodeRenderers = {
      [BLOCKS.PARAGRAPH]: (node: Block, key: string, next: Next) => (
        h('p', { key }, next(node.content, key, next))
      ),
      [BLOCKS.HEADING_1]: (node: Block, key: string, next: Next) => (
        h('h1', { key }, next(node.content, key, next))
      ),
      [BLOCKS.HEADING_2]: (node: Block, key: string, next: Next) => (
        h('h2', { key }, next(node.content, key, next))
      ),
      [BLOCKS.HEADING_3]: (node: Block, key: string, next: Next) => (
        h('h3', { key }, next(node.content, key, next))
      ),
      [BLOCKS.HEADING_4]: (node: Block, key: string, next: Next) => (
        h('h4', { key }, next(node.content, key, next))
      ),
      [BLOCKS.HEADING_5]: (node: Block, key: string, next: Next) => (
        h('h5', { key }, next(node.content, key, next))
      ),
      [BLOCKS.HEADING_6]: (node: Block, key: string, next: Next) => (
        h('h6', { key }, next(node.content, key, next))
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node: Block, key: string, next: Next) => {
        return (
          h('div', { key }, [
            'embed',
            next(node.content, key, next)
          ])
        )
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: Block, key: string, next: Next) => {
        const {
          nodeType,
          data: {
            target
          }
        } = node as Entry<any>

        return (
          h(
            'div',
            null,
            'asset'
          )
        )
      },
      [BLOCKS.UL_LIST]: (node: Block, key: string, next: Next) => (
        h('ul', { key }, next(node.content, key, next))
      ),
      [BLOCKS.OL_LIST]: (node: Block, key: string, next: Next) => (
        h('ol', { key }, next(node.content, key, next))
      ),
      [BLOCKS.LIST_ITEM]: (node: Block, key: string, next: Next) => (
        h('li', { key }, next(node.content, key, next))
      ),
      [BLOCKS.QUOTE]: (node: Block, key: string, next: Next) => (
        h('blockquote',
          { key },
          next(node.content, key, next))
      ),
      [BLOCKS.TABLE]: (node: Block, key: string, next: Next) => (
        h('table', { key }, [
          h('thead'),
          h('tbody', {}, next(node.content, key, next))
        ])
      ),
      [BLOCKS.TABLE_ROW]: (node: Block, key: string, next: Next) => (
        h('tr', { key }, next(node.content, key, next))
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (node: Block, key: string, next: Next) => (
        h('th', { key }, next(node.content, key, next))
      ),
      [BLOCKS.TABLE_CELL]: (node: Block, key: string, next: Next) => (
        h('td', { key }, next(node.content, key, next))
      ),
      [BLOCKS.HR]: (_node: any, key: string) => h('hr', { key }),
      [INLINES.ASSET_HYPERLINK]: (node: Inline, key: string) =>
        defaultInline(INLINES.ASSET_HYPERLINK, node, key),
      [INLINES.ENTRY_HYPERLINK]: (node: Inline, key: string) =>
        defaultInline(INLINES.ENTRY_HYPERLINK, node, key),
      [INLINES.EMBEDDED_ENTRY]: (node: Inline, key: string) =>
        defaultInline(INLINES.EMBEDDED_ENTRY, node, key),
      [INLINES.HYPERLINK]: (node: Inline, key: string, next: Next) => {
        return h(
          NuxtLink,
          {
            key,
            to: node.data.uri,
            class: 'link',
            target: '_blank'
          },
          () => [next(node.content, key, next)]
        )
      },
      text: ({ marks, value }, key, markRenderer) => {
        if (value === '') {
          return
        }
        if (!marks.length) {
          return value
        }

        const marksReversed = [...marks].reverse()
        return marksReversed.reduce((aggregate, mark, i) => (
          markRenderer[mark.type]([aggregate], `${key}-${i}`, h)
        ), value)
      }
    }

    const renderNodeList = (nodes: Node[], key: string, renderer: any) => {
      return nodes.map((node, i) => renderNode(node, `${key}-${i}`, renderer))
    }

    const renderNode = (node: Node, key: string, renderer: NodeRenderer) => {
      const nodeRenderer = renderer.node

      if (helpers.isText(node)) {
        // We're at final tip of node branch, can render text.
        const markerRender = renderer.mark

        return nodeRenderer.text(node, key, markerRender)
      } else {
        const nextNode = (nodes: Node[]) => renderNodeList(nodes, key, renderer)
        if (!nodeRenderer) {
          return h('div', { key }, `${key} ;lost nodeRenderer`)
        }
        if (!node.nodeType || !nodeRenderer[node.nodeType]) {
          // TODO: Figure what to return when passed an unrecognized node.
          return h('div', { key }, '(Unrecognized node type) ' + (node.nodeType || 'empty'))
        }
        return nodeRenderer[node.nodeType](node, key, nextNode)
      }
    }

    const renderer: { node: RenderNode, mark: RenderMark } = {
      node: {
        ...defaultNodeRenderers,
        ...props.nodeRenderers
      },
      mark: {
        ...defaultMarkRenderers,
        ...props.markRenderers
      }
    }

    return () => h(
      'div',
      { class: 'rich-text' },
      renderNodeList(
        props.document.content,
        'RichText-',
        renderer
      )
    )
  }
})
