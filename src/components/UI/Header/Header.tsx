import { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import { Search, X, Menu, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import type { ThemeContext } from '@/pages/_app'

import { SearchModal } from '@/components/Search'

import { Drawer } from '../Drawer'

export const Header = ({ theme, setTheme }: ThemeContext) => {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
  }

  const handleSearchClick = () => {
    setIsSearchOpen(true)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setIsDrawerOpen(false)
  }, [router.pathname])

  const navItems = [
    { href: '/about', label: 'About' },
    { href: '/archive', label: 'Archive' },
    { href: '/snippets', label: 'Snippets' },
  ]

  return (
    <>
      <Container>
        <LeftSection>
          <LogoLink href="/" title="Home">
            <StyledImage src="/icon.png" alt="Logo" />
          </LogoLink>
          <DesktopNav>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                isActive={router.pathname === item.href}
              >
                {item.label}
              </NavLink>
            ))}
          </DesktopNav>
        </LeftSection>
        {mounted && (
          <RightSection>
            <SearchButton
              type="button"
              onClick={handleSearchClick}
              title="Search"
              aria-label="Search"
            >
              <Search />
            </SearchButton>
            <ThemeButton
              type="button"
              onClick={toggleTheme}
              title={
                theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
              aria-label={
                theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
            >
              {theme === 'dark' ? <Moon /> : <Sun />}
            </ThemeButton>
            <MobileMenuButton
              type="button"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              aria-label="Open menu"
            >
              <Menu />
            </MobileMenuButton>
          </RightSection>
        )}
      </Container>
      {mounted && (
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
              <CloseButton
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close menu"
              >
                <X />
              </CloseButton>
            </DrawerHeader>
            <DrawerNav>
              {navItems.map((item) => (
                <DrawerNavLink
                  key={item.href}
                  href={item.href}
                  isActive={router.pathname === item.href}
                >
                  {item.label}
                </DrawerNavLink>
              ))}
            </DrawerNav>
          </DrawerContent>
        </Drawer>
      )}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  )
}

const Container = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 0;
  background: ${({ theme }) => theme.colors.background};

  @media (width <= 768px) {
    padding: 12px 16px;
  }
`

const LeftSection = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;

  @media (width <= 768px) {
    gap: 16px;
  }
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`

const StyledImage = styled.img`
  height: 40px;
  object-fit: contain;

  @media (width <= 768px) {
    height: 32px;
  }
`

const DesktopNav = styled.nav`
  display: flex;
  gap: 24px;
  align-items: center;

  @media (width <= 768px) {
    display: none;
  }
`

const NavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  position: relative;
  font-size: 16px;
  font-weight: 500;
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  user-select: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &::after {
    position: absolute;
    right: 0;
    bottom: -4px;
    left: 0;
    height: 2px;
    content: '';
    background-color: ${({ theme }) => theme.colors.primary};
    transform: scaleX(${({ isActive }) => (isActive ? 1 : 0)});
    transform-origin: center;
    transition: transform 0.2s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`

const RightSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  background: transparent;
  border: none;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted}20;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (width <= 768px) {
    svg {
      width: 20px;
      height: 20px;
    }
  }
`

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted}20;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (width <= 768px) {
    svg {
      width: 20px;
      height: 20px;
    }
  }
`

const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted}20;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  @media (width <= 768px) {
    display: flex;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted}40;
`

const DrawerTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.muted}20;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`

const DrawerNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`

const DrawerNavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.muted}10;
  }

  ${({ isActive, theme }) =>
    isActive &&
    `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 60%;
      background-color: ${theme.colors.primary};
    }
  `}
`
