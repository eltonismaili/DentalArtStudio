import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
    const [expanded, setExpanded] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => setExpanded(false), [location.pathname])

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/services', label: 'Services' },
        { path: '/before-after', label: 'Before & After' },
        { path: '/contact', label: 'Contact' },
    ]

    const isHome = location.pathname === '/'
    const navbarBackground = scrolled || !isHome ? 'rgba(10,31,68,0.95)' : 'transparent'
    const textColor = scrolled || !isHome ? '#fff' : '#fff'
    const fontFamily = "'Poppins', sans-serif"

    return (
        <Navbar
            expand='lg'
            expanded={expanded}
            fixed='top'
            style={{
                background: navbarBackground,
                backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
                boxShadow: scrolled ? '0 8px 20px rgba(0,0,0,0.12)' : 'none',
                transition: 'all 0.4s ease',
                zIndex: 1100,
                padding: '0.6rem 1rem',
            }}
        >
            <Container>
                <Navbar.Brand as={Link} to='/' onClick={() => setExpanded(false)}>
                    <img
                        src='/images/LOGOOO.png'
                        alt='Dental Art Studio'
                        style={{
                            height: scrolled ? 50 : 60,
                            transition: 'height 0.4s ease',
                            objectFit: 'contain',
                        }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls='navbar-nav'
                    onClick={() => setExpanded(!expanded)}
                    style={{ border: 'none', color: textColor }}
                >
                    {expanded ? <X size={24} /> : <Menu size={24} />}
                </Navbar.Toggle>

                <Navbar.Collapse id='navbar-nav'>
                    <Nav className='ms-auto align-items-center gap-4'>
                        {navLinks.map((link) => (
                            <Nav.Link
                                as={Link}
                                to={link.path}
                                key={link.path}
                                onClick={() => setExpanded(false)}
                                style={{
                                    color: location.pathname === link.path ? '#00c4ff' : textColor,
                                    fontWeight: 400, // më elegant
                                    fontFamily: fontFamily,
                                    fontSize: '1rem',
                                    padding: '0.35rem 0.7rem',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,196,255,0.12)')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                            >
                                {link.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>

            <style>
                {`
                .navbar .nav-link:hover {
                    color: #00c4ff !important;
                }
                @media (max-width: 992px) {
                    .navbar-collapse {
                        background: rgba(10,31,68,0.95);
                        padding: 1rem;
                        border-radius: 12px;
                        margin-top: 8px;
                    }
                    .nav-link {
                        color: #fff !important;
                        text-align: center;
                        padding: 0.6rem 0;
                        font-size: 1.05rem;
                    }
                }
            `}
            </style>
        </Navbar>
    )
}
