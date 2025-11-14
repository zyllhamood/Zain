import React from 'react';
import {
    Box,
    Flex,
    Image,
    Link,
    Button,
    IconButton,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import logo from '../images/logo.png';

export default function Navbar() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    // Handle navigation - if on home page, use hash, otherwise navigate to home with hash
    const handleNavClick = (e, hash) => {
        e.preventDefault();
        if (isHomePage) {
            // On home page, just scroll to section
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // On other pages, navigate to home with hash
            window.location.href = `/${hash}`;
        }
    };

    return (
        <Flex
            as="header"
            justify="space-between"
            align="center"
            px={{ base: 4, md: 12, lg: 24 }}
            py={{ base: 4, md: 5 }}
            bg="rgba(255, 255, 255, 0.98)"
            backdropFilter="blur(20px)"
            borderBottom="1px"
            borderColor="rgba(35, 31, 32, 0.08)"
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex={1000}
            transition="all 0.3s ease"
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.03)"
        >
            {/* Logo */}
            <Box>
                <RouterLink to="/">
                    <Image
                        src={logo}
                        alt="Zain Logo"
                        h={{ base: '45px', md: '60px' }}
                        objectFit="contain"
                        transition="all 0.3s ease"
                        _hover={{ transform: 'scale(1.05)', filter: 'brightness(1.1)' }}
                        cursor="pointer"
                    />
                </RouterLink>
            </Box>

            {/* Desktop Navigation */}
            <Flex
                gap={{ base: 0, md: 2, lg: 3 }}
                align="center"
                dir="rtl"
                display={{ base: 'none', md: 'flex' }}
            >
                <Link
                    as={isHomePage ? 'a' : RouterLink}
                    href={isHomePage ? '#home' : undefined}
                    to={!isHomePage ? '/' : undefined}
                    onClick={(e) => handleNavClick(e, '#home')}
                    px={6}
                    py={3}
                    fontSize={{ md: 'md', lg: 'lg' }}
                    color="brand.gray"
                    fontWeight="600"
                    position="relative"
                    transition="all 0.3s ease"
                    borderRadius="8px"
                    _hover={{
                        color: 'brand.dark',
                        bg: 'rgba(35, 31, 32, 0.05)',
                        transform: 'translateY(-2px)',
                    }}
                    _active={{
                        transform: 'translateY(0)',
                    }}
                >
                    الرئيسية
                </Link>

                <Link
                    as={isHomePage ? 'a' : RouterLink}
                    href={isHomePage ? '#services' : undefined}
                    to={!isHomePage ? '/' : undefined}
                    onClick={(e) => handleNavClick(e, '#services')}
                    px={6}
                    py={3}
                    fontSize={{ md: 'md', lg: 'lg' }}
                    color="brand.gray"
                    fontWeight="600"
                    position="relative"
                    transition="all 0.3s ease"
                    borderRadius="8px"
                    _hover={{
                        color: 'brand.dark',
                        bg: 'rgba(35, 31, 32, 0.05)',
                        transform: 'translateY(-2px)',
                    }}
                    _active={{
                        transform: 'translateY(0)',
                    }}
                >
                    خدماتي
                </Link>

                <Button
                    as={isHomePage ? 'a' : RouterLink}
                    href={isHomePage ? '#contact' : undefined}
                    to={!isHomePage ? '/' : undefined}
                    onClick={(e) => handleNavClick(e, '#contact')}
                    size={{ md: 'md', lg: 'lg' }}
                    bg="#231F20"
                    color="#ffffff"
                    fontWeight="700"
                    px={8}
                    py={6}
                    borderRadius="8px"
                    transition="all 0.3s ease"
                    position="relative"
                    overflow="hidden"
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(35, 31, 32, 0.2)',
                        _before: {
                            transform: 'translateX(0)',
                        },
                    }}
                    _active={{
                        transform: 'translateY(0)',
                    }}
                    _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        bg: '#414042',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.3s ease',
                        zIndex: -1,
                    }}
                >
                    تواصل معنا
                </Button>
            </Flex>

            {/* Mobile Navigation - Icon Only */}
            <Flex
                gap={2}
                align="center"
                dir="rtl"
                display={{ base: 'flex', md: 'none' }}
            >
                <IconButton
                    as={isHomePage ? 'a' : RouterLink}
                    href={isHomePage ? '#home' : undefined}
                    to={!isHomePage ? '/' : undefined}
                    onClick={(e) => handleNavClick(e, '#home')}
                    aria-label="Home"
                    icon={<Icon icon="mdi:home" width="22" height="22" />}
                    size="md"
                    variant="ghost"
                    color="brand.gray"
                    transition="all 0.3s ease"
                    _hover={{
                        bg: 'rgba(35, 31, 32, 0.08)',
                        color: 'brand.dark',
                        transform: 'translateY(-2px)',
                    }}
                    _active={{
                        transform: 'translateY(0)',
                    }}
                />

                <IconButton
                    as={isHomePage ? 'a' : RouterLink}
                    href={isHomePage ? '#services' : undefined}
                    to={!isHomePage ? '/' : undefined}
                    onClick={(e) => handleNavClick(e, '#services')}
                    aria-label="Services"
                    icon={<Icon icon="mdi:briefcase" width="22" height="22" />}
                    size="md"
                    variant="ghost"
                    color="brand.gray"
                    transition="all 0.3s ease"
                    _hover={{
                        bg: 'rgba(35, 31, 32, 0.08)',
                        color: 'brand.dark',
                        transform: 'translateY(-2px)',
                    }}
                    _active={{
                        transform: 'translateY(0)',
                    }}
                />

                <IconButton
                    as={isHomePage ? 'a' : RouterLink}
                    href={isHomePage ? '#contact' : undefined}
                    to={!isHomePage ? '/' : undefined}
                    onClick={(e) => handleNavClick(e, '#contact')}
                    aria-label="Contact"
                    icon={<Icon icon="mdi:email" width="22" height="22" color="#ffffff" />}
                    size="md"
                    bg="#231F20"
                    color="#ffffff"
                    transition="all 0.3s ease"
                    _hover={{
                        bg: '#414042',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(35, 31, 32, 0.2)',
                    }}
                    _active={{
                        transform: 'translateY(0)',
                    }}
                />
            </Flex>
        </Flex>
    );
}

