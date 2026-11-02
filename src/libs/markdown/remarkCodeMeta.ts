import type { Root } from 'mdast'

import { visitNodes } from './visitNodes'

export const remarkCodeMeta = () => (tree: Root) => {
  visitNodes(tree, 'code', (node) => {
    if (!node.meta) return

    node.data = {
      ...node.data,
      hProperties: {
        ...node.data?.hProperties,
        'data-meta': node.meta,
      },
    }
  })
}
