import { useCallback, useEffect, useRef, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import type { Article } from '@/libs/getArticles/types'

interface SearchResult extends Article {
  type: 'article' | 'snippet'
}

export function useSearch(isOpen: boolean, onClose: () => void) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const searchArticles = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`,
      )
      const data = await response.json()
      setResults(data.results || [])
      setSelectedIndex(0)
    } catch (error) {
      console.warn('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (query) {
      setLoading(true)
    }

    const debounceTimer = setTimeout(() => {
      searchArticles(query)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query, searchArticles])

  const scrollPositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (isOpen) {
      scrollPositionRef.current = {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop,
      }

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth

      document.body.style.overflow = 'hidden'
      document.body.style.position = 'relative'

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 100)
    } else {
      // Restore body scroll
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.paddingRight = ''

      requestAnimationFrame(() => {
        window.scrollTo(
          scrollPositionRef.current.x,
          scrollPositionRef.current.y,
        )
      })

      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev,
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
          break
        case 'Enter':
          if (results[selectedIndex]) {
            e.preventDefault()
            const result = results[selectedIndex]
            const isProjectArticle = 'project' in result
            const path =
              result.type === 'snippet'
                ? `/snippets/${result.category}/${result.fileName.replace('.mdx', '')}`
                : isProjectArticle
                  ? `/projects/${result.slug}`
                  : `/articles/${result.slug}`
            router.push(path)
            onClose()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose, router])

  // Close modal on route change
  useEffect(() => {
    if (isOpen) {
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return {
    query,
    setQuery,
    results,
    loading,
    selectedIndex,
    inputRef,
  }
}
