import React, { useState } from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Button,
    Grid,
    SimpleGrid,
    VStack,
    HStack,
    Icon,
    Link,
    GridItem,
    useBreakpointValue,
} from '@chakra-ui/react';
import { motion, AnimatePresence, animate, useInView } from 'framer-motion';
import { Icon as Iconify } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';

// Assets
import logo from '../images/logo.png';
import me from '../images/me.png';
import logo_name from '../images/name.png';
import logos from '../images/logos.png';

// Motion Components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionImage = motion(Image);

// --- Counter Component ---
const Counter = ({ from, to }) => {
    const nodeRef = React.useRef();
    const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

    React.useEffect(() => {
        const node = nodeRef.current;
        if (isInView) {
            const controls = animate(from, to, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate(value) {
                    node.textContent = Math.floor(value) + "+";
                }
            });
            return () => controls.stop();
        }
    }, [from, to, isInView]);

    return (
        <Text
            ref={nodeRef}
            fontSize={{ base: "5xl", md: "7xl" }}
            fontWeight="900"
            color="white"
            lineHeight="1"
            fontFamily="'Cairo', sans-serif"
        >
            0+
        </Text>
    );
};

// --- Services Component (New Design) ---
const ServicesSection = () => {
    const [hovered, setHovered] = useState(null); // 'photo' | 'video' | null
    const isMobile = useBreakpointValue({ base: true, lg: false });

    // Animation Variants
    const panelVariants = {
        idle: { flex: 1 },
        hover: { flex: 2.5 },
        shrunk: { flex: 0.6 },
    };

    // Helper to determine state
    const getVariant = (id) => {
        if (isMobile) return "idle"; // No expansion on mobile
        if (hovered === id) return "hover";
        if (hovered && hovered !== id) return "shrunk";
        return "idle";
    };

    return (
        <Box bg="#343032" w="full" overflow="hidden">
            <Flex
                direction={{ base: 'column', lg: 'row' }}
                h={{ base: "auto", lg: "90vh" }}
                minH={{ base: "auto", lg: "700px" }}
            >
                {/* --- Panel A: Photography (#343032) --- */}
                <MotionFlex
                    layout
                    variants={panelVariants}
                    animate={getVariant('photo')}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    bg="#343032"
                    color="white"
                    direction="column"
                    justify="center"
                    align="center"
                    position="relative"
                    onMouseEnter={() => setHovered('photo')}
                    onMouseLeave={() => setHovered(null)}
                    py={{ base: 20, lg: 0 }}
                    px={{ base: 6, lg: 10 }}
                    borderRight={{ lg: "1px solid rgba(255,255,255,0.1)" }}
                >
                    {/* Content Container */}
                    <VStack spacing={6} maxW="500px" textAlign="center" zIndex={2}>
                        <MotionBox
                            animate={{ scale: hovered === 'photo' ? 1.2 : 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Icon as={Iconify} icon="mdi:camera-iris" width="120px" height="120px" color={hovered === 'photo' ? "white" : "rgba(255,255,255,0.2)"} transition="0.5s" />
                        </MotionBox>

                        <MotionBox animate={{ y: hovered === 'photo' ? -20 : 0 }}>
                            <Heading
                                fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                                fontWeight="900"
                                lineHeight="1.4"
                                fontFamily={'Cairo'}
                            >
                                التصوير <br /> الفوتوغرافي
                            </Heading>
                        </MotionBox>

                        {/* Revealed Content */}
                        <AnimatePresence>
                            {(hovered === 'photo' || isMobile) && (
                                <MotionBox
                                    initial={{ opacity: 0, y: 20, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: 10, height: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    overflow="hidden"
                                >
                                    <VStack spacing={4} pt={4} align="center">
                                        <Text color="gray.400" fontSize="lg" maxW="400px">
                                            تصوير بورتريه، منتجات، أطعمة، ومناسبات بأحدث التقنيات والإضاءة السينمائية.
                                        </Text>

                                        <Button
                                            as={RouterLink}
                                            to="/all-photos"
                                            variant="outline"
                                            color="white"
                                            borderColor="white"
                                            _hover={{ bg: "white", color: "#343032" }}
                                            size="lg"
                                            px={12}
                                            borderRadius="0"
                                        >
                                            استكشف المعرض
                                        </Button>
                                    </VStack>
                                </MotionBox>
                            )}
                        </AnimatePresence>
                    </VStack>

                    {/* Background Deco */}
                    <Box
                        position="absolute" top="0" left="0" w="full" h="full"
                        bgGradient="linear(to-b, transparent 0%, rgba(52,48,50,0.8) 100%)"
                        pointerEvents="none"
                    />
                </MotionFlex>

                {/* --- Panel B: Video (White for High Contrast) --- */}
                <MotionFlex
                    layout
                    variants={panelVariants}
                    animate={getVariant('video')}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    bg="#FFFFFF"
                    color="#343032"
                    direction="column"
                    justify="center"
                    align="center"
                    position="relative"
                    onMouseEnter={() => setHovered('video')}
                    onMouseLeave={() => setHovered(null)}
                    py={{ base: 20, lg: 0 }}
                    px={{ base: 6, lg: 10 }}
                >
                    <VStack spacing={6} maxW="500px" textAlign="center" zIndex={2}>
                        <MotionBox
                            animate={{ scale: hovered === 'video' ? 1.2 : 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Icon as={Iconify} icon="mdi:video-vintage" width="120px" height="120px" color={hovered === 'video' ? "#343032" : "rgba(52, 48, 50, 0.2)"} transition="0.5s" />
                        </MotionBox>

                        <MotionBox animate={{ y: hovered === 'video' ? -20 : 0 }}>
                            <Heading
                                fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                                fontWeight="900"
                                lineHeight="1"
                                fontFamily={'Cairo'}
                            >
                                تصوير <br /> الفيديو
                            </Heading>
                        </MotionBox>

                        <AnimatePresence>
                            {(hovered === 'video' || isMobile) && (
                                <MotionBox
                                    initial={{ opacity: 0, y: 20, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: 10, height: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    overflow="hidden"
                                >
                                    <VStack spacing={4} pt={4} align="center">
                                        <Text color="gray.600" fontSize="lg" maxW="400px">
                                            تغطيات، أفلام ترويجية، إعلانات، وتصوير جوي بجودة سينمائية تروي قصتك.
                                        </Text>

                                        <Button
                                            as={RouterLink}
                                            to="/all-videos"
                                            bg="#343032"
                                            color="white"
                                            _hover={{ bg: "#4a4446" }}
                                            size="lg"
                                            px={12}
                                            borderRadius="0"
                                        >
                                            استكشف المعرض
                                        </Button>
                                    </VStack>
                                </MotionBox>
                            )}
                        </AnimatePresence>
                    </VStack>
                </MotionFlex>

            </Flex>
        </Box>
    );
};

const Home = () => {
    // Stats Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <Box
            bg="white"
            w="full"
            overflowX="hidden"
            dir="rtl"
            fontFamily="'Cairo', sans-serif"
        >
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;700;900&display=swap');`}
            </style>

            {/* 1. HERO SECTION */}
            <Box
                h="100vh"
                w="full"
                position="relative"
                bg="white"
                overflow="hidden"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                    <MotionBox
                        position="absolute" top="50%" left="50%" w="600px" h="600px"
                        border="1px solid" borderColor="rgba(52,48,50,0.15)" borderRadius="50%"
                        style={{ x: '-50%', y: '-50%' }}
                        animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />
                    <MotionBox
                        position="absolute" top="50%" left="50%" w="900px" h="900px"
                        border="1px solid" borderColor="rgba(52,48,50,0.08)" borderRadius="50%"
                        style={{ x: '-50%', y: '-50%' }}
                        animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                    />
                </Box>

                <Box position="relative" zIndex={1} textAlign="center">
                    <MotionBox
                        animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)"
                        style={{ x: '-50%', y: '-50%' }} w="500px" h="500px" opacity={0.05} zIndex={-1}
                    >
                        <Image src={logo} w="full" h="full" objectFit="contain" filter="grayscale(100%)" />
                    </MotionBox>
                    <MotionImage
                        src={logo_name} alt="Zain Alabdin" w={{ base: "250px", md: "400px" }}
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
                        mb={6}
                    />

                </Box>

                <MotionFlex
                    position="absolute"
                    bottom="50px"
                    left="50%"
                    transform="translateX(-50%)"
                    bg="rgba(52, 48, 50, 0.05)"
                    backdropFilter="blur(20px)"
                    border="1px solid rgba(52, 48, 50, 0.1)"
                    borderRadius="32px"
                    px={8}
                    py={5}
                    gap={12}
                    dir="ltr"
                    align="center"
                    justify="center"
                    style={{ x: '-50%' }}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {[
                        { icon: 'mdi:camera-iris', label: 'PHOTOGRAPHY' },
                        { icon: 'mdi:quadcopter', label: 'DRONE' },
                        { icon: 'mdi:video-vintage', label: 'VIDEOGRAPHY' },
                    ].map((item, idx) => (
                        <VStack
                            key={idx}
                            as={motion.div}
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            cursor="pointer"
                            spacing={3}
                            minW="100px"
                            align="center"
                        >
                            <Icon as={Iconify} icon={item.icon} width="30px" height="30px" color="#343032" />
                            <Text
                                fontSize="11px"
                                color="#343032"
                                fontWeight="700"
                                letterSpacing="2px"
                                textAlign="center"
                            >
                                {item.label}
                            </Text>
                        </VStack>
                    ))}
                </MotionFlex>
            </Box>

            {/* 2. STATS SECTION (Restored & Enhanced) */}
            <Box bg="#343032" py={{ base: 16, md: 20 }} borderTop="1px solid" borderColor="rgba(255,255,255,0.05)">
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={0} maxW="1200px" mx="auto" px={{ base: 6, md: 12 }}>
                    {[{ num: 9, label: "سنوات خبرة" }, { num: 750, label: "عميل راضٍ" }, { num: 2300, label: "مشروع منجز" }].map((stat, i) => (
                        <Box key={i} position="relative">
                            <Flex
                                direction="column"
                                align="center"
                                justify="center"
                                py={6}
                                borderRight={{ md: i !== 0 ? "1px solid" : "none" }}
                                borderColor={{ md: "rgba(255,255,255,0.1)" }}
                                height="100%"
                            >
                                <Counter from={0} to={stat.num} />
                                <Text
                                    fontSize={{ base: "lg", md: "xl" }}
                                    color="gray.400"
                                    fontWeight="400"
                                    mt={2}
                                    letterSpacing="wide"
                                >
                                    {stat.label}
                                </Text>
                            </Flex>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>

            {/* 3. SERVICES SECTION (NEW EXPANDING PANELS) */}
            <ServicesSection />

            {/* 4. ABOUT ME */}
            <Box p={{ base: 6, md: 20 }} bg="gray.50">
                <Grid templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }} gap={10} maxW="1400px" mx="auto" alignItems="center">
                    <GridItem colSpan={{ base: 12, lg: 5 }} order={{ base: 2, lg: 1 }}>
                        <MotionBox initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                            <Text fontSize="sm" fontWeight="bold" letterSpacing="widest" mb={4} color="gray.500">عن المصور</Text>
                            <Heading size="3xl" mb={8} lineHeight="1.2" fontFamily={'Cairo'}>رحلة الإبداع <br /> والشغف</Heading>
                            <Text fontSize="xl" color="gray.600" lineHeight="tall" fontWeight="300" mb={6}>
                                كل شيء يبدأ بقصة. أرى العالم بعدسة سينمائية، وأحاول تحويل اللحظات العابرة إلى ذكريات خالدة.
                            </Text>
                            <Text fontSize="md" color="gray.500" lineHeight="tall">
                                خبرة طويلة في تقديم محتوى بصري راقٍ يتحدث بصوت أعلى من الكلمات. الدقة، الإضاءة، والتكوين هي أدواتي الأساسية.
                            </Text>
                        </MotionBox>
                    </GridItem>
                    <GridItem colSpan={{ base: 12, lg: 7 }} order={{ base: 1, lg: 2 }} position="relative">
                        <Box position="relative" w="full" h="600px" overflow="hidden">
                            <MotionImage src={me} alt="Zain Alabdin" w="full" h="full" objectFit="cover" initial={{ scale: 1.2, filter: "grayscale(100%)" }} whileInView={{ scale: 1, filter: "grayscale(0%)" }} transition={{ duration: 1.5 }} />
                            <MotionBox position="absolute" top={0} left={0} right={0} bottom={0} bg="#343032" initial={{ height: "100%" }} whileInView={{ height: "0%" }} transition={{ duration: 1, delay: 0.2, ease: "circOut" }} zIndex={2} />
                        </Box>
                    </GridItem>
                </Grid>
            </Box>

            {/* 5. CONTACT */}
            <Box py={{ base: 20, md: 32 }} px={{ base: 6, md: 20 }} bg="white">
                <MotionBox textAlign="center" mb={20} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <Heading fontSize={{ base: "5xl", md: "8xl" }} fontWeight="900" mb={4} fontFamily={'Cairo'}>لنبدأ مشروعك</Heading>
                    <Text fontSize="xl" color="gray.400">نحول أفكارك إلى واقع بصري</Text>
                </MotionBox>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} maxW="1200px" mx="auto">
                    <MotionFlex direction="column" bg="white" border="2px dashed" borderColor="#343032" p={10} justify="space-between" minH="400px" whileHover={{ y: -10 }} transition={{ type: "spring" }}>
                        <VStack align="flex-start" spacing={0} fontFamily="'Courier New', Courier, monospace">
                            <Icon as={Iconify} icon="mdi:bank-outline" width="40px" height="40px" mb={6} />
                            <Text fontSize="sm" color="gray.500">معلومات التحويل</Text>
                            <Text fontSize="2xl" fontWeight="bold" mt={2}>زين العابدين</Text>
                            <Text fontSize="md" mt={1}>بنك الرياض</Text>
                        </VStack>
                        <VStack align="flex-start" spacing={4} w="full" mt={10} fontFamily="'Courier New', Courier, monospace">
                            <Box w="full" borderBottom="1px dashed gray" />
                            <Flex justify="space-between" w="full"><Text color="gray.500">IBAN</Text><Text fontWeight="bold" dir="ltr">SA24 2000 0000 9999 8888 7777</Text></Flex>
                            {/* <Flex justify="space-between" w="full"><Text color="gray.500">ACC</Text><Text fontWeight="bold" dir="ltr">2888 888 888</Text></Flex> */}
                            <Box w="full" borderBottom="1px dashed gray" />
                            <Image src={logo} w="50px" filter="grayscale(100%)" opacity={0.5} alignSelf="center" mt={4} />
                            <Text fontSize="xs" textAlign="center" w="full" opacity={0.5}>شكراً لثقتكم بنا</Text>
                        </VStack>
                    </MotionFlex>
                    <MotionFlex direction="column" bg="#25D366" p={10} justify="center" align="center" minH="400px" position="relative" overflow="hidden" cursor="pointer" whileHover={{ scale: 1.02 }} onClick={() => window.open('https://wa.me/966554043696', '_blank')}>
                        <Box position="absolute" top="-50%" left="-50%" w="200%" h="200%" bg="radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)" />
                        <Icon as={Iconify} icon="mdi:whatsapp" width="40px" height="40px" color="white" zIndex={1} mb={8} />
                        <Heading color="white" fontSize="4xl" zIndex={1} textAlign="center" mb={2} fontFamily={'Cairo'}>تواصل عبر واتساب</Heading>
                        <Text color="white" fontSize="xl" opacity={0.9} zIndex={1} mb={8}>جاهزون لتصوير مشروعك؟</Text>
                        <Button bg="white" color="#25D366" size="lg" onClick={(e) => { e.stopPropagation(); window.open('https://wa.me/966554043696', '_blank'); }} zIndex={1} px={10} h="60px" fontSize="xl" dir="ltr">+966 55 404 3696</Button>
                    </MotionFlex>
                </SimpleGrid>
            </Box>

            {/* Footer */}
            <Box p={6} borderTop="1px solid" borderColor="gray.100" textAlign="center">
                <Text fontSize="sm" color="gray.400">© 2025 ZAIN . All Rights Reserved.</Text>
            </Box>
        </Box>
    );
};

export default Home;
