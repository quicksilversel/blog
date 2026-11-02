import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import {
  rehypeImageSize,
  remarkCallouts,
  remarkCodeMeta,
} from '@/libs/markdown'

import { mdxComponents } from './mdxComponents'

type Props = {
  content: string
}

export const MdxRenderer = ({ content }: Props) => {
  return (
    <MDXRemote
      source={content}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkCallouts, remarkCodeMeta],
          rehypePlugins: [rehypeSlug, rehypeImageSize],
        },
      }}
    />
  )
}
