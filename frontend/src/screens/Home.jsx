import React from 'react';
import {
    ChakraProvider,
    extendTheme,
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Button,
    Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import logo from '../images/logo.png';
import me from '../images/me.png';
import logo_name from '../images/name.png';
import logos from '../images/logos.png';
// Custom Chakra Theme with Cairo font and custom colors
const theme = extendTheme({
    colors: {
        brand: {
            dark: '#231F20',
            gray: '#414042',
            white: '#ffffff',
        },
    },
    fonts: {
        heading: "'Cairo', sans-serif",
        body: "'Cairo', sans-serif",
    },
    styles: {
        global: {
            body: {
                bg: '#ffffff',
                color: '#231F20',
            },
            '*': {
                scrollBehavior: 'smooth',
            },
        },
    },
});

// Service Icon Component
const ServiceIconBox = ({ icon, titleEn, titleAr }) => {
    return (
        <Flex
            direction={{ base: 'row', md: 'column' }}
            align="center"
            gap={{ base: 4, md: 0 }}
            p={{ base: 3, md: 2 }}
            position="relative"
            transition="all 0.4s ease"

            w={{ base: 'full', md: 'auto' }}
            maxW={{ base: '280px', md: 'none' }}

        >
            <Flex
                w={{ base: '60px', md: '80px' }}
                h={{ base: '60px', md: '80px' }}
                border="2px solid"
                borderColor="brand.dark"
                align="center"
                justify="center"
                mb={{ base: 0, md: 4 }}
                transition="all 0.4s ease"
                flexShrink={0}
            >
                <Icon icon={icon} width={32} color="#231F20" />
            </Flex>
            <Flex direction="column" align={{ base: 'flex-start', md: 'center' }}>
                <Text
                    fontSize={{ base: 'md', md: 'xs' }}
                    color="brand.dark"
                    fontWeight={{ base: '600', md: '300' }}
                    letterSpacing="wide"
                >
                    {titleEn}
                </Text>
                <Text
                    fontSize={{ base: 'xs', md: 'xs' }}
                    color="gray.500"
                    fontWeight="300"
                    display={{ base: 'block', md: 'none' }}
                >
                    {titleAr}
                </Text>
            </Flex>
        </Flex>
    );
};

export default function Home() {

    return (
        <ChakraProvider theme={theme}>
            <Box>
                {/* Revolutionary Hero Section */}
                <Box
                    id="home"
                    position="relative"
                    minH="100vh"
                    bg="brand.white"
                    overflow="hidden"
                    pt={{ base: '40px', md: '100px' }}
                >
                    {/* Geometric Background Elements */}
                    <Box
                        position="absolute"
                        top="10%"
                        right="-5%"
                        w="400px"
                        h="400px"
                        border="80px solid"
                        borderColor="brand.dark"
                        opacity={0.03}
                        transform="rotate(45deg)"
                        display={{ base: 'none', lg: 'block' }}
                    />
                    <Image
                        src={logo}
                        alt="Logo Background"
                        position="absolute"
                        bottom={{ base: '10%', lg: '5%' }}
                        left={{ base: '-20%', lg: '-3%' }}
                        w={{ base: '300px', lg: '400px' }}
                        h={{ base: '300px', lg: '400px' }}
                        objectFit="contain"
                        opacity={0.05}
                        display={{ base: 'block', lg: 'block' }}
                    />

                    <Flex
                        direction="column"
                        align={{ base: 'center', md: 'center' }}
                        justify="center"
                        minH="calc(100vh - 100px)"
                        px={{ base: 6, md: 12, lg: 20 }}
                        textAlign={{ base: 'right', md: 'center' }}
                        position="relative"
                        zIndex={1}
                    >
                        {/* Name Display */}
                        <Flex mb={4} mt={4} align="center" justify="center">
                            <Heading
                                as="h1"
                                fontSize={{ base: '5xl', md: '7xl', lg: '8xl' }}
                                fontWeight="900"
                                color="brand.dark"
                                textAlign={{ base: 'right', md: 'center' }}
                                letterSpacing="tight"
                                display={'none'}
                            >
                                زين العابدين
                            </Heading>
                            <Image src={logo_name} alt="Me" width={{ base: '50%', md: '60%' }} />
                        </Flex>

                        {/* Subtitle with Modern Typography */}
                        <Flex align="center" justify="center" gap={4} mb={14} mt={-8}>
                            <Box w="50px" h="1px" bg="brand.dark" opacity={0.4} display={{ base: 'none', md: 'block' }} />
                            <Heading
                                as="h2"
                                fontSize={{ base: 'xl', md: '2xl', lg: '2xl' }}
                                fontWeight="300"
                                color="gray.600"
                                letterSpacing="wide"

                            >
                                مصور | Photography
                            </Heading>
                            <Box w="50px" h="1px" bg="brand.dark" opacity={0.4} display={{ base: 'none', md: 'block' }} />
                        </Flex>

                        {/* Services Icons - Responsive Design */}
                        <Flex
                            direction={{ base: 'column', md: 'row' }}
                            gap={{ base: 3, md: 12 }}
                            mt={{ base: 0, md: 12 }}
                            justify="center"
                            align={{ base: 'flex-start', md: 'center' }}
                            maxW={{ base: '100%', md: '800px' }}
                            w="full"
                        >
                            <ServiceIconBox
                                icon="mdi:camera-iris"
                                titleEn="PHOTOGRAPHY"
                                titleAr="التصوير الفوتوغرافي"
                            />
                            <ServiceIconBox
                                icon="mdi:video-vintage"
                                titleEn="VIDEOGRAPHY"
                                titleAr="التصوير الفيديو"
                            />
                            <ServiceIconBox
                                icon="mdi:quadcopter"
                                titleEn="DRONE"
                                titleAr="تصوير الدرون"
                            />
                        </Flex>

                        {/* Scroll Indicator */}
                        <Flex
                            direction="column"
                            align="center"
                            position="absolute"
                            bottom="40px"
                            left="50%"
                            transform="translateX(-50%)"
                            animation="bounce 2s ease-in-out infinite"
                            display={{ base: 'none', md: 'none' }}
                        >
                            <Box
                                w="1px"
                                h="40px"
                                bg="gray.400"
                                opacity={0.5}
                                mb={2}
                            />
                            <Icon icon="mdi:chevron-down" width="24" height="24" color="gray.400" />
                        </Flex>
                    </Flex>
                </Box>

                {/* Statistics Section - New Addition */}
                <Box bg="brand.dark" py={{ base: 12, md: 16 }}>
                    <Flex
                        maxW="1400px"
                        mx="auto"
                        px={{ base: 4, md: 12 }}
                        gap={{ base: 2, md: 12 }}
                        flexWrap="nowrap"
                        justify="space-around"
                        align="center"
                    >
                        <Flex direction="column" align="center" flex="1" minW={0}>
                            <Heading fontSize={{ base: '2xl', sm: '3xl', md: '6xl' }} color="brand.white" fontWeight="bold">
                                2300+
                            </Heading>
                            <Text fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} color="brand.white" opacity={0.7} mt={{ base: 1, md: 2 }} fontWeight="300" textAlign="center">
                                مشروع منجز
                            </Text>
                        </Flex>
                        <Box w="1px" h={{ base: '40px', md: '60px' }} bg="brand.white" opacity={0.2} display={{ base: 'block', md: 'block' }} />
                        <Flex direction="column" align="center" flex="1" minW={0}>
                            <Heading fontSize={{ base: '2xl', sm: '3xl', md: '6xl' }} color="brand.white" fontWeight="bold">
                                750+
                            </Heading>
                            <Text fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} color="brand.white" opacity={0.7} mt={{ base: 1, md: 2 }} fontWeight="300" textAlign="center">
                                عميل راضٍ
                            </Text>
                        </Flex>
                        <Box w="1px" h={{ base: '40px', md: '60px' }} bg="brand.white" opacity={0.2} display={{ base: 'block', md: 'block' }} />
                        <Flex direction="column" align="center" flex="1" minW={0}>
                            <Heading fontSize={{ base: '2xl', sm: '3xl', md: '6xl' }} color="brand.white" fontWeight="bold">
                                9+
                            </Heading>
                            <Text fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} color="brand.white" opacity={0.7} mt={{ base: 1, md: 2 }} fontWeight="300" textAlign="center">
                                سنوات خبرة
                            </Text>
                        </Flex>
                    </Flex>
                </Box>

                {/* About Section - Asymmetric Modern Design */}
                <Box
                    id="about"
                    bg="brand.white"
                    py={{ base: 20, md: 32 }}
                    px={{ base: 6, md: 12, lg: 20 }}
                    position="relative"
                >
                    <Flex
                        maxW="1400px"
                        mx="auto"
                        direction={{ base: 'column', lg: 'row' }}
                        gap={16}
                        align="center"
                    >
                        {/* Left Side - Decorative */}
                        <Box flex="1" position="relative" display={{ base: 'none', lg: 'block' }}>
                            {/* Decorative element - positioned behind */}
                            <Box
                                position="absolute"
                                top="30px"
                                right="-30px"
                                w="100%"
                                h="500px"
                                border="3px solid"
                                borderColor="brand.dark"
                                opacity={0.2}
                                zIndex={0}
                            />

                            {/* Main image container */}
                            <Box
                                w="100%"
                                h="500px"
                                position="relative"
                                overflow="hidden"
                                boxShadow="0 20px 60px rgba(0, 0, 0, 0.15)"
                                transition="all 0.4s ease"
                                zIndex={1}

                            >
                                <Image
                                    src={me}
                                    alt="Zain Alabdin - Photographer"
                                    w="100%"
                                    h="100%"
                                    objectFit="cover"
                                    objectPosition="center"
                                />

                                {/* Subtle gradient overlay for better visual */}
                                <Box
                                    position="absolute"
                                    bottom="0"
                                    left="0"
                                    right="0"
                                    h="150px"
                                    bgGradient="linear(to-t, rgba(35, 31, 32, 0.4), transparent)"
                                    pointerEvents="none"
                                />
                            </Box>
                        </Box>

                        {/* Right Side - Content */}
                        <Flex direction="column" flex="1" dir="rtl">
                            <Text
                                fontSize={{ base: 'sm', md: 'md' }}
                                color="brand.gray"
                                fontWeight="600"
                                letterSpacing="widest"
                                mb={4}
                                textTransform="uppercase"
                            >
                                من أنا
                            </Text>

                            <Heading
                                as="h3"
                                fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
                                fontWeight="bold"
                                color="brand.dark"
                                mb={8}
                                lineHeight="1.2"
                            >
                                رحلة الإبداع

                                والشغف
                            </Heading>

                            <Box w="80px" h="4px" bg="brand.dark" mb={8} />

                            <Text
                                fontSize={{ base: 'lg', md: 'xl' }}
                                color="brand.gray"
                                lineHeight="tall"
                                mb={6}
                                fontWeight="300"
                            >
                                أنا مصور محترف متخصص في التصوير الفوتوغرافي والفيديو، أقدم خدماتي للأفراد والشركات على حد سواء.
                                أؤمن بأن كل لحظة تستحق أن تُخلَّد بأجمل صورة، ولذلك أعمل بشغف لتقديم أعمال فنية تعكس جمال اللحظة.
                            </Text>

                            <Text
                                fontSize={{ base: 'lg', md: 'xl' }}
                                color="brand.gray"
                                lineHeight="tall"
                                fontWeight="300"
                            >
                                مع سنوات من الخبرة في هذا المجال، أسعى دائماً لتحقيق رؤية عملائي وتجاوز توقعاتهم من خلال
                                الإبداع والاحترافية والاهتمام بأدق التفاصيل.
                            </Text>
                        </Flex>
                    </Flex>
                </Box>

                {/* Services Section - Ultra Modern */}
                <Box
                    id="services"
                    bg="brand.dark"
                    py={{ base: 20, md: 32 }}
                    px={{ base: 6, md: 12, lg: 20 }}
                    position="relative"
                >
                    <Flex direction="column" align="center" mb={16}>
                        <Text
                            fontSize={{ base: 'sm', md: 'md' }}
                            color="brand.white"
                            fontWeight="600"
                            letterSpacing="widest"
                            mb={4}
                            textTransform="uppercase"
                            opacity={0.7}
                        >
                            خدماتنا
                        </Text>

                        <Heading
                            as="h3"
                            fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
                            fontWeight="bold"
                            color="brand.white"
                            mb={6}
                            textAlign="center"
                        >
                            ما نقدمه لك
                        </Heading>

                        <Box w="80px" h="4px" bg="brand.white" />
                    </Flex>

                    {/* Services Content - Split Layout */}
                    <Flex
                        direction={{ base: 'column', lg: 'row' }}
                        gap={{ base: 12, lg: 8 }}
                        maxW="1400px"
                        mx="auto"
                    >
                        {/* Photography Section - Right Side */}
                        <Flex
                            direction="column"
                            flex="1"
                            dir="rtl"
                        >
                            <Flex align="center" gap={3} mb={6}>
                                <Icon icon="mdi:camera-iris" width="32" height="32" color="#ffffff" />
                                <Heading
                                    as="h4"
                                    fontSize={{ base: '2xl', md: '3xl' }}
                                    fontWeight="bold"
                                    color="brand.white"
                                >
                                    التصوير الفوتوغرافي
                                </Heading>
                            </Flex>

                            <Flex
                                direction="column"
                                gap={4}
                                mb={8}
                            >
                                {[
                                    { title: 'تصوير أشخاص', subtitle: 'Portraits' },
                                    { title: 'تصوير مطاعم ومأكولات', subtitle: 'Food Photography' },
                                    { title: 'تصوير منتجات', subtitle: 'Product Photography' },
                                    { title: 'تصوير فعاليات', subtitle: 'Events Photography' },
                                ].map((service, index) => (
                                    <Flex
                                        key={index}
                                        align="center"
                                        gap={3}
                                        p={4}
                                        bg="rgba(255, 255, 255, 0.05)"
                                        borderRadius="8px"
                                        transition="all 0.3s ease"
                                        _hover={{
                                            bg: { base: 'rgba(255, 255, 255, 0.05)', md: 'rgba(255, 255, 255, 0.1)' },
                                            transform: { base: 'none', md: 'translateX(-5px)' },
                                        }}
                                    >
                                        <Box
                                            w="8px"
                                            h="8px"
                                            bg="brand.white"
                                            borderRadius="50%"
                                            flexShrink={0}
                                        />
                                        <Flex direction="column" flex="1">
                                            <Text
                                                fontSize={{ base: 'md', md: 'lg' }}
                                                fontWeight="600"
                                                color="brand.white"
                                            >
                                                {service.title}
                                            </Text>
                                            <Text
                                                fontSize={{ base: 'xs', md: 'sm' }}
                                                color="brand.white"
                                                opacity={0.6}
                                            >
                                                {service.subtitle}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                ))}
                            </Flex>

                            <Button
                                as={RouterLink}
                                to="/all-photos"
                                size="lg"
                                bg="brand.white"
                                color="brand.dark"
                                fontWeight="bold"
                                px={8}
                                py={6}
                                borderRadius="8px"
                                transition="all 0.3s ease"
                                _hover={{
                                    bg: { base: 'brand.white', md: 'brand.gray' },
                                    color: { base: 'brand.dark', md: 'brand.white' },
                                    transform: { base: 'none', md: 'translateY(-2px)' },
                                    boxShadow: { base: 'none', md: '0 8px 20px rgba(0, 0, 0, 0.2)' },
                                }}
                                rightIcon={<Icon icon="mdi:arrow-left" width="20" height="20" />}
                            >
                                استكشف أعمال التصوير
                            </Button>
                        </Flex>

                        {/* Divider - Only on Desktop */}
                        <Box
                            w="1px"
                            h="auto"
                            bg="rgba(255, 255, 255, 0.2)"
                            display={{ base: 'none', lg: 'block' }}
                        />

                        {/* Videography Section - Left Side */}
                        <Flex
                            direction="column"
                            flex="1"
                            dir="rtl"
                        >
                            <Flex align="center" gap={3} mb={6}>
                                <Icon icon="mdi:video-vintage" width="32" height="32" color="#ffffff" />
                                <Heading
                                    as="h4"
                                    fontSize={{ base: '2xl', md: '3xl' }}
                                    fontWeight="bold"
                                    color="brand.white"
                                >
                                    التصوير الفيديو
                                </Heading>
                            </Flex>

                            <Flex
                                direction="column"
                                gap={4}
                                mb={8}
                            >
                                {[
                                    { title: 'تغطيات إعلامية', subtitle: 'Media Coverage' },
                                    { title: 'أفلام تعريفية', subtitle: 'Promotional Films' },
                                    { title: 'تصوير درون', subtitle: 'Drone Videography' },
                                    { title: 'إعلانات تجارية', subtitle: 'Commercial Ads' },
                                ].map((service, index) => (
                                    <Flex
                                        key={index}
                                        align="center"
                                        gap={3}
                                        p={4}
                                        bg="rgba(255, 255, 255, 0.05)"
                                        borderRadius="8px"
                                        transition="all 0.3s ease"
                                        _hover={{
                                            bg: { base: 'rgba(255, 255, 255, 0.05)', md: 'rgba(255, 255, 255, 0.1)' },
                                            transform: { base: 'none', md: 'translateX(-5px)' },
                                        }}
                                    >
                                        <Box
                                            w="8px"
                                            h="8px"
                                            bg="brand.white"
                                            borderRadius="50%"
                                            flexShrink={0}
                                        />
                                        <Flex direction="column" flex="1">
                                            <Text
                                                fontSize={{ base: 'md', md: 'lg' }}
                                                fontWeight="600"
                                                color="brand.white"
                                            >
                                                {service.title}
                                            </Text>
                                            <Text
                                                fontSize={{ base: 'xs', md: 'sm' }}
                                                color="brand.white"
                                                opacity={0.6}
                                            >
                                                {service.subtitle}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                ))}
                            </Flex>

                            <Button
                                as={RouterLink}
                                to="/all-videos"
                                size="lg"
                                bg="brand.white"
                                color="brand.dark"
                                fontWeight="bold"
                                px={8}
                                py={6}
                                borderRadius="8px"
                                transition="all 0.3s ease"
                                _hover={{
                                    bg: { base: 'brand.white', md: 'brand.gray' },
                                    color: { base: 'brand.dark', md: 'brand.white' },
                                    transform: { base: 'none', md: 'translateY(-2px)' },
                                    boxShadow: { base: 'none', md: '0 8px 20px rgba(0, 0, 0, 0.2)' },
                                }}
                                rightIcon={<Icon icon="mdi:arrow-left" width="20" height="20" />}
                            >
                                استكشف أعمال الفيديو
                            </Button>
                        </Flex>
                    </Flex>
                </Box>

                {/* Partners Section - Grid Layout */}
                <Box
                    bg="brand.dark"
                    py={{ base: 20, md: 28 }}
                    px={{ base: 6, md: 12, lg: 20 }}
                >
                    <Flex direction="column" align="center" mb={16}>
                        <Text
                            fontSize={{ base: 'sm', md: 'md' }}
                            color="brand.white"
                            fontWeight="600"
                            letterSpacing="widest"
                            mb={4}
                            textTransform="uppercase"
                            opacity={0.7}
                        >
                            شركاء النجاح
                        </Text>

                        <Heading
                            as="h3"
                            fontSize={{ base: '3xl', md: '5xl' }}
                            fontWeight="bold"
                            color="brand.white"
                            mb={6}
                            textAlign="center"
                        >
                            عملاء نفتخر بهم
                        </Heading>

                        <Box w="80px" h="4px" bg="brand.white" />
                    </Flex>

                    <Box
                        maxW="1200px"
                        mx="auto"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Image
                            src={logos}
                            alt="Partners and Clients"
                            maxW="100%"
                            h="auto"
                            objectFit="contain"
                            opacity={0.9}
                            transition="all 0.3s ease"
                            _hover={{
                                opacity: { base: 0.9, md: 1 },
                            }}
                        />
                    </Box>
                </Box>

                {/* Contact Section - Split Design */}
                <Box
                    id="contact"
                    bg="brand.white"
                    py={{ base: 20, md: 32 }}
                    px={{ base: 6, md: 12, lg: 20 }}
                >
                    <Flex direction="column" align="center" mb={16}>
                        <Text
                            fontSize={{ base: 'sm', md: 'md' }}
                            color="brand.gray"
                            fontWeight="600"
                            letterSpacing="widest"
                            mb={4}
                            textTransform="uppercase"
                        >
                            تواصل معنا
                        </Text>

                        <Heading
                            as="h3"
                            fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
                            fontWeight="bold"
                            color="brand.dark"
                            mb={6}
                            textAlign="center"
                        >
                            لنبدأ مشروعك
                        </Heading>

                        <Box w="80px" h="4px" bg="brand.dark" />
                    </Flex>

                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        gap={8}
                        maxW="1000px"
                        mx="auto"
                        justify="center"
                        align="stretch"
                    >
                        {/* WhatsApp Contact */}
                        <Box
                            flex="1"
                            bg="brand.dark"
                            p={{ base: 8, md: 10 }}
                            borderRadius="12px"
                            transition="all 0.3s ease"
                            _hover={{
                                transform: { base: 'none', md: 'translateY(-5px)' },
                                boxShadow: { base: 'none', md: '0 10px 30px rgba(0, 0, 0, 0.2)' },
                            }}
                        >
                            <Flex direction="column" align="center" dir="rtl">
                                <Flex
                                    w="70px"
                                    h="70px"
                                    bg="#25D366"
                                    align="center"
                                    justify="center"
                                    borderRadius="50%"
                                    mb={6}
                                >
                                    <Icon icon="mdi:whatsapp" width="40" height="40" color="#ffffff" />
                                </Flex>
                                <Heading
                                    as="h4"
                                    fontSize="xl"
                                    fontWeight="bold"
                                    color="brand.white"
                                    mb={4}
                                    textAlign="center"
                                >
                                    تواصل عبر واتساب
                                </Heading>
                                <Link
                                    href="https://wa.me/966554043696"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button
                                        bg="#25D366"
                                        color="brand.white"
                                        size="lg"
                                        fontSize="md"
                                        fontWeight="bold"
                                        dir="ltr"
                                        px={8}
                                        py={6}
                                        borderRadius="8px"
                                        transition="all 0.3s ease"
                                        _hover={{
                                            bg: { base: '#25D366', md: '#20BA5A' },
                                            transform: { base: 'none', md: 'scale(1.05)' },
                                        }}
                                        leftIcon={<Icon icon="mdi:whatsapp" width="24" height="24" />}
                                    >
                                        +966 55 404 3696
                                    </Button>
                                </Link>
                            </Flex>
                        </Box>

                        {/* IBAN Info */}
                        <Box
                            flex="1"
                            bg="brand.dark"
                            p={{ base: 8, md: 10 }}
                            borderRadius="12px"
                            transition="all 0.3s ease"
                            _hover={{
                                transform: { base: 'none', md: 'translateY(-5px)' },
                                boxShadow: { base: 'none', md: '0 10px 30px rgba(0, 0, 0, 0.2)' },
                            }}
                        >
                            <Flex direction="column" align="center" dir="rtl">
                                <Flex
                                    w="70px"
                                    h="70px"
                                    bg="brand.white"
                                    align="center"
                                    justify="center"
                                    borderRadius="50%"
                                    mb={6}
                                >
                                    <Icon icon="mdi:bank" width="40" height="40" color="brand.dark" />
                                </Flex>
                                <Heading
                                    as="h4"
                                    fontSize="xl"
                                    fontWeight="bold"
                                    color="brand.white"
                                    mb={4}
                                    textAlign="center"
                                >
                                    معلومات التحويل
                                </Heading>
                                <Box
                                    bg="rgba(255, 255, 255, 0.1)"
                                    p={6}
                                    borderRadius="8px"
                                    w="full"
                                    textAlign="center"
                                >
                                    <Text
                                        fontSize={{ base: 'md', md: 'lg' }}
                                        color="brand.white"
                                        fontFamily="monospace"
                                        fontWeight="600"
                                        mb={2}
                                    >
                                        SA00 0000 0000 0000 0000 0000
                                    </Text>
                                    <Text
                                        fontSize="sm"
                                        color="brand.white"
                                        opacity={0.7}
                                    >
                                        يرجى إرسال إيصال التحويل بعد الدفع
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>

                {/* Footer - Minimalist */}
                <Box
                    bg="brand.dark"
                    py={12}
                    px={{ base: 6, md: 12, lg: 20 }}
                    borderTop="1px"
                    borderColor="rgba(255, 255, 255, 0.1)"
                >
                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        justify="space-between"
                        align="center"
                        gap={6}
                        maxW="1400px"
                        mx="auto"
                    >
                        <Text fontSize="sm" color="brand.white" textAlign="center" opacity={0.7}>
                            © 2025 زين العابدين. جميع الحقوق محفوظة.
                        </Text>
                        <Flex gap={6}>
                            {[
                                { icon: 'mdi:instagram', link: '#' },
                                { icon: 'mdi:twitter', link: '#' },
                                { icon: 'mdi:facebook', link: '#' },
                                { icon: 'mdi:youtube', link: '#' },
                            ].map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.link}
                                    w="45px"
                                    h="45px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    border="1px solid"
                                    borderColor="rgba(255, 255, 255, 0.3)"
                                    transition="all 0.3s ease"
                                    _hover={{
                                        bg: { base: 'transparent', md: 'brand.white' },
                                        borderColor: { base: 'rgba(255, 255, 255, 0.3)', md: 'brand.white' },
                                        transform: { base: 'none', md: 'translateY(-4px)' },
                                        '& svg': {
                                            color: { base: '#ffffff', md: '#231F20' },
                                        },
                                    }}
                                >
                                    <Icon icon={social.icon} width="24" height="24" color="#ffffff" />
                                </Link>
                            ))}
                        </Flex>
                    </Flex>
                </Box>

                {/* Custom Animations */}
                <style>
                    {`
            @keyframes float {
              0%, 100% {
                transform: translateX(-50%) translateY(0);
              }
              50% {
                transform: translateX(-50%) translateY(-15px);
              }
            }
            
            @keyframes bounce {
              0%, 100% {
                transform: translateX(-50%) translateY(0);
              }
              50% {
                transform: translateX(-50%) translateY(10px);
              }
            }
            
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
                </style>
            </Box>
        </ChakraProvider>
    );
}
