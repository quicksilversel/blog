import { promises as fs } from 'fs'
import path from 'path'

import { buildSearchDocuments } from '@/libs/search/buildSearchData'

async function generateSearchIndex() {
  const documents = await buildSearchDocuments()

  const publicDir = path.join(process.cwd(), 'public')
  const outputPath = path.join(publicDir, 'search-index.json')

  await fs.writeFile(outputPath, JSON.stringify(documents))

  const bytes = Buffer.byteLength(JSON.stringify(documents))
  // eslint-disable-next-line no-console
  console.log(
    `Generated search index: ${documents.length} documents, ${(bytes / 1024).toFixed(1)} KB`,
  )
}

// eslint-disable-next-line no-console
generateSearchIndex().catch(console.error)
