import styled from '@emotion/styled'

import type { Article } from '@/libs/getArticles/types'

import { Card } from '@/components/UI/Card'
import { Grid } from '@/components/UI/Grid'
import { SectionHeader } from '@/components/UI/SectionHeader'

interface RelatedArticlesProps {
  articles: Article[]
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null
  }

  return (
    <Container>
      <SectionHeader
        title="Related Articles"
        titleTag="h2"
        imageUrl="/cat-orange-2.png"
        width={70}
      />

      <Grid>
        {articles.map((article) => (
          <Card
            key={article.slug}
            title={article.title}
            subtitle={article.readingTime}
            description={article.description}
            topics={article.topics}
            link={`/articles/${article.slug}`}
          />
        ))}
      </Grid>
    </Container>
  )
}

const Container = styled.section`
  margin-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.muted};
`
