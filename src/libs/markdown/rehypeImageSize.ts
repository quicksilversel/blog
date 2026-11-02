import path from 'path'

import { imageSizeFromFile } from 'image-size/fromFile'

import type { Element, Nodes, Root } from 'hast'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

const collectImages = (node: Nodes, found: Element[]): void => {
  if (node.type === 'element' && node.tagName === 'img') found.push(node)
  if ('children' in node) {
    for (const child of node.children) collectImages(child, found)
  }
}

export const rehypeImageSize = () => async (tree: Root) => {
  const images: Element[] = []
  collectImages(tree, images)

  await Promise.all(
    images.map(async (image) => {
      const src = image.properties.src
      if (typeof src !== 'string' || !src.startsWith('/')) return

      try {
        const { width, height } = await imageSizeFromFile(
          path.join(PUBLIC_DIR, src),
        )
        if (!width || !height) return

        image.properties.width = width
        image.properties.height = height
      } catch {}
    }),
  )
}
