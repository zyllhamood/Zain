import React, { useState } from 'react';
import {
    Box,
    Flex,
    Image,
    Button,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack,
    Link,
    useDisclosure,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Icon } from '@iconify/react';
import logo from '../images/logo.png';

// Motion Components
const MotionBox = motion(Box);
const MotionLink = motion(Link);

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Detect Scroll for Glass Effect
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    // Navigation Handler
    const handleNavClick = (e, hash) => {
        e.preventDefault();
        onClose();
        if (isHomePage) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.location.href = `/${hash}`;
        }
    };

    const navLinks = [
        { name: 'الرئيسية', hash: '#home' },
        { name: 'خدماتي', hash: '#services' }, // Corrected to 'خدماتي' as per original file context, or user said 'خدماتنا' in prompt? 
        // User prompt: "Center: Navigation Links (الرئيسية - خدماتنا)"
        // Original file: "الرئيسية" and "خدماتي".
        // I will use "الرئيسية" and "خدماتنا" as per User Request this time, but point to #services.
    ];

    // Correction: User explicitly listed (الرئيسية - خدماتنا).

    return (
        <>
            <MotionBox
                as="header"
                position="fixed"
                top={0}
                left={0}
                right={0}
                zIndex={1000}
                initial={{ backgroundColor: "rgba(52, 48, 50, 0)", backdropFilter: "blur(0px)" }}
                animate={{
                    backgroundColor: isScrolled ? "rgba(52, 48, 50, 0.85)" : "rgba(52, 48, 50, 0)",
                    backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
                    boxShadow: isScrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
                }}
                transition={{ duration: 0.4 }}
                borderBottom="1px solid"
                borderColor={isScrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)"}
            >
                <Flex
                    justify="space-between"
                    align="center"
                    px={{ base: 6, md: 12, lg: 24 }}
                    py={{ base: 4, md: 5 }}
                    dir="rtl"
                    maxW="1920px"
                    mx="auto"
                >
                    {/* RIGHT: Logo */}
                    <Box flexShrink={0}>
                        <RouterLink to="/">
                            <Image
                                src={logo}
                                alt="Zain Logo"
                                h={{ base: '45px', md: '55px' }}
                                objectFit="contain"
                                transition="all 0.3s ease"
                                _hover={{ transform: 'scale(1.05)' }}
                                cursor="pointer"
                            />
                        </RouterLink>
                    </Box>

                    {/* CENTER: Navigation Links (Desktop) */}
                    <Flex
                        display={{ base: 'none', md: 'flex' }}
                        gap={12}
                        align="center"
                        position="absolute"
                        left="50%"
                        transform="translate(-50%)"
                    >
                        {/* Using explicit links as per request */}
                        <MotionLink
                            as={isHomePage ? 'a' : RouterLink}
                            href={isHomePage ? '#home' : undefined}
                            to={!isHomePage ? '/' : undefined}
                            onClick={(e) => handleNavClick(e, '#home')}
                            color="white"
                            fontSize="lg"
                            fontWeight="500"
                            fontFamily="'Cairo', sans-serif"
                            position="relative"
                            _hover={{ textDecor: 'none' }}
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                        >
                            الرئيسية
                            <MotionBox
                                position="absolute"
                                bottom="-4px"
                                left="50%"
                                h="1px"
                                bg="white"
                                initial={{ width: "0%", x: "-50%" }}
                                variants={{
                                    rest: { width: "0%" },
                                    hover: { width: "100%" }
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </MotionLink>

                        <MotionLink
                            as={isHomePage ? 'a' : RouterLink}
                            href={isHomePage ? '#services' : undefined}
                            to={!isHomePage ? '/' : undefined}
                            onClick={(e) => handleNavClick(e, '#services')}
                            color="white"
                            fontSize="lg"
                            fontWeight="500"
                            fontFamily="'Cairo', sans-serif"
                            position="relative"
                            _hover={{ textDecor: 'none' }}
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                        >
                            خدماتنا
                            <MotionBox
                                position="absolute"
                                bottom="-4px"
                                left="50%"
                                h="1px"
                                bg="white"
                                initial={{ width: "0%", x: "-50%" }}
                                variants={{
                                    rest: { width: "0%" },
                                    hover: { width: "100%" }
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </MotionLink>
                    </Flex>

                    {/* LEFT: CTA Button (Desktop) & Mobile Menu Toggle */}
                    <Flex align="center" gap={4}>
                        <Button
                            display={{ base: 'none', md: 'flex' }}
                            as={isHomePage ? 'a' : RouterLink}
                            href={isHomePage ? '#contact' : undefined}
                            to={!isHomePage ? '/' : undefined}
                            onClick={(e) => handleNavClick(e, '#contact')}
                            size="md"
                            rounded="full"
                            px={8}
                            fontFamily="'Cairo', sans-serif"
                            bg={isScrolled ? "white" : "transparent"}
                            color={isScrolled ? "#343032" : "white"}
                            border="1px solid white"
                            fontWeight="bold"
                            transition="all 0.3s ease"
                            _hover={{
                                transform: 'scale(1.05)',
                                bg: "white",
                                color: "#343032",
                                boxShadow: "0 4px 15px rgba(255,255,255,0.3)"
                            }}
                        >
                            تواصل معنا
                        </Button>

                        <IconButton
                            display={{ base: 'flex', md: 'none' }}
                            onClick={onOpen}
                            icon={<Icon icon="mdi:menu" width="28" height="28" />}
                            variant="ghost"
                            color="white"
                            aria-label="Open Menu"
                            _hover={{ bg: "whiteAlpha.200" }}
                            _active={{ bg: "whiteAlpha.300" }}
                        />
                    </Flex>
                </Flex>
            </MotionBox>

            {/* Mobile Menu Drawer (High-End Style) */}
            <Drawer placement="top" onClose={onClose} isOpen={isOpen} size="full">
                <DrawerOverlay bg="rgba(52, 48, 50, 0.4)" backdropFilter="blur(5px)" />
                <DrawerContent bg="#343032" color="white">
                    <DrawerCloseButton mt={6} ml={6} size="lg" _focus={{ boxShadow: "none" }} color="white" />
                    <DrawerBody display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <VStack spacing={8} dir="rtl">
                            <Link
                                as={isHomePage ? 'a' : RouterLink}
                                href={isHomePage ? '#home' : undefined}
                                to={!isHomePage ? '/' : undefined}
                                onClick={(e) => handleNavClick(e, '#home')}
                                fontSize="3xl"
                                fontWeight="700"
                                fontFamily="'Cairo', sans-serif"
                                _hover={{ color: "gray.300", transform: "scale(1.05)" }}
                                transition="all 0.3s"
                            >
                                الرئيسية
                            </Link>

                            <Link
                                as={isHomePage ? 'a' : RouterLink}
                                href={isHomePage ? '#services' : undefined}
                                to={!isHomePage ? '/' : undefined}
                                onClick={(e) => handleNavClick(e, '#services')}
                                fontSize="3xl"
                                fontWeight="700"
                                fontFamily="'Cairo', sans-serif"
                                _hover={{ color: "gray.300", transform: "scale(1.05)" }}
                                transition="all 0.3s"
                            >
                                خدماتنا
                            </Link>

                            <Button
                                as={isHomePage ? 'a' : RouterLink}
                                href={isHomePage ? '#contact' : undefined}
                                to={!isHomePage ? '/' : undefined}
                                onClick={(e) => handleNavClick(e, '#contact')}
                                size="lg"
                                rounded="full"
                                px={12}
                                py={8}
                                mt={8}
                                bg="white"
                                color="#343032"
                                fontFamily="'Cairo', sans-serif"
                                _hover={{ transform: 'scale(1.05)', boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
                            >
                                تواصل معنا
                            </Button>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
