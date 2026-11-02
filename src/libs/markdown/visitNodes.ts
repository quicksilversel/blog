import type { Nodes } from 'mdast'

type NodeOfType<T extends Nodes['type']> = Extract<Nodes, { type: T }>

export const visitNodes = <T extends Nodes['type']>(
  node: Nodes,
  type: T,
  visitor: (match: NodeOfType<T>) => void,
): void => {
  if (node.type === type) visitor(node as NodeOfType<T>)
  if ('children' in node) {
    for (const child of node.children) visitNodes(child, type, visitor)
  }
}
