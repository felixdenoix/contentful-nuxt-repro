import { h } from 'vue'
import {BLOCKS, MARKS, helpers} from '@contentful/rich-text-types' // working when building website but not in dev mode
// import Types, {helpers} from '@contentful/rich-text-types' // works but only when building site
import { NodeRenderer } from '@contentful/rich-text-html-renderer'

export default defineComponent({
  props: {
    nodeRenderers: {
      type: Object,
      default: () => ({})
    },
    markRenderers: {
      type: Object,
      default: () => ({})
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

    const defaultMarkRenderers = {
      [MARKS.BOLD]: (children: string, key: string) => h('strong', { key }, children),
    }

    const defaultNodeRenderers = {
      [BLOCKS.PARAGRAPH]: (node: Block, key: string, next: any) => (
        h('p', { key }, next(node.content, key, next))
      ),
      [BLOCKS.HEADING_1]: (node: Block, key: string, next: any) => (
        h('h1', { key }, next(node.content, key, next))
      ),
      text: ({ marks, value}, key, markRenderer) => {
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
          return h('div', { key }, '(Unrecognized node type) ' + (node.nodeType || 'empty'))
        }
        return nodeRenderer[node.nodeType](node, key, nextNode)
      }
    }

    const renderer = {
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
