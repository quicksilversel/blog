type OGImageProps = {
  title: string
  date?: string | null
  topics?: string[]
  iconUrl: string
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function OGImage({ title, date, topics = [], iconUrl }: OGImageProps) {
  const titleFontSize = title.length > 50 ? '48px' : '64px'

  return (
    <div style={styles.container}>
      <div style={styles.topicsContainer}>
        {topics.map((topic) => (
          <div key={topic} style={styles.topicBadge}>
            {topic}
          </div>
        ))}
      </div>
      <div style={styles.titleSection}>
        <h1 style={{ ...styles.title, fontSize: titleFontSize }}>{title}</h1>
        {date && <p style={styles.date}>{formatDate(date)}</p>}
      </div>
      <div style={styles.footer}>
        <div style={styles.branding}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={iconUrl} alt="" width={48} height={48} />
          <span style={styles.brandName}>Zoe.log()</span>
        </div>
        <div style={styles.url}>zoelog.vercel.app</div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: '100%',
    width: '100%',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    justifyContent: 'space-between' as const,
    padding: '60px 80px',
    background:
      'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
    fontFamily: 'system-ui, sans-serif',
  },
  topicsContainer: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '12px',
  },
  topicBadge: {
    padding: '8px 20px',
    background: 'rgba(236, 72, 153, 0.2)',
    borderRadius: '20px',
    color: '#ec4899',
    fontSize: '22px',
    fontWeight: 600,
  },
  titleSection: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '20px',
  },
  title: {
    fontWeight: 700,
    color: '#ffffff',
    lineHeight: 1.2,
    margin: 0,
    maxWidth: '900px',
  },
  date: {
    fontSize: '28px',
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0,
  },
  footer: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  branding: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '16px',
  },
  brandName: {
    fontSize: '32px',
    fontWeight: 600,
    color: '#ffffff',
  },
  url: {
    fontSize: '24px',
    color: 'rgba(255, 255, 255, 0.4)',
  },
}
