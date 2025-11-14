import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Heading,
    Image,
    Text,
    useToast,
    extendTheme,
    ChakraProvider,
    Spinner,
    IconButton,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        },
    },
});

export default function AllVideos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    // Fetch all videos
    const fetchVideos = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://192.168.3.128:8000/get-all-videos/');
            setVideos(response.data);
        } catch (error) {
            toast({
                title: 'خطأ',
                description: 'فشل في تحميل الفيديوهات',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle video click to open in new tab
    const handleVideoClick = (videoUrl) => {
        if (videoUrl) {
            window.open(videoUrl, '_blank');
        } else {
            toast({
                title: 'خطأ',
                description: 'رابط الفيديو غير متاح',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Box
                minH="100vh"
                bg="brand.white"
                px={{ base: 4, md: 8, lg: 12 }}
                pt={{ base: '90px', md: '110px' }}
                pb={{ base: 6, md: 8 }}
            >
                {/* Header */}
                <Flex
                    align="center"
                    gap={4}
                    mb={8}
                    dir="rtl"
                    maxW="1400px"
                    mx="auto"
                >
                    <IconButton
                        aria-label="رجوع"
                        icon={<Icon icon="mdi:arrow-right" width="24" height="24" />}
                        onClick={() => navigate('/')}
                        variant="ghost"
                        size="lg"
                        color="brand.dark"
                        _hover={{
                            bg: { base: 'transparent', md: 'rgba(35, 31, 32, 0.1)' },
                        }}
                    />
                    <Heading
                        as="h1"
                        fontSize={{ base: '1xl', md: '3xl' }}
                        fontWeight="bold"
                        color="brand.dark"
                    >
                        أبرز أعمال تصوير الفيديو
                    </Heading>
                </Flex>

                {/* Videos Grid */}
                {loading ? (
                    <Flex justify="center" align="center" py={20}>
                        <Spinner size="xl" color="brand.dark" />
                    </Flex>
                ) : videos.length === 0 ? (
                    <Flex
                        justify="center"
                        align="center"
                        py={20}
                        direction="column"
                        gap={4}
                    >
                        <Text
                            fontSize="xl"
                            color="brand.gray"
                            textAlign="center"
                        >
                            لا توجد فيديوهات متاحة
                        </Text>
                    </Flex>
                ) : (
                    <Box
                        maxW="1400px"
                        mx="auto"
                    >
                        <Box
                            display="grid"
                            gridTemplateColumns={{
                                base: '1fr',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)',
                                lg: 'repeat(4, 1fr)',
                            }}
                            gap={6}
                        >
                            {videos.map((video) => (
                                <Box
                                    key={video.id}
                                    bg="brand.white"
                                    borderRadius="12px"
                                    overflow="hidden"
                                    border="1px solid"
                                    borderColor="rgba(35, 31, 32, 0.1)"
                                    transition="all 0.3s ease"
                                    cursor="pointer"
                                    _hover={{
                                        transform: { base: 'none', md: 'translateY(-4px)' },
                                        boxShadow: { base: 'none', md: '0 8px 20px rgba(0, 0, 0, 0.15)' },
                                    }}
                                    onClick={() => handleVideoClick(video.video_url)}
                                >
                                    {/* Image Container with Play Icon */}
                                    <Box
                                        position="relative"
                                        aspectRatio="16/9"
                                        overflow="hidden"
                                    >
                                        <Image
                                            src={video.image_url}
                                            alt={`Video ${video.id}`}
                                            w="100%"
                                            h="100%"
                                            objectFit="cover"
                                        />
                                        {/* Overlay */}
                                        <Box
                                            position="absolute"
                                            top={0}
                                            left={0}
                                            right={0}
                                            bottom={0}
                                            bg="rgba(0, 0, 0, 0.3)"
                                            transition="all 0.3s ease"
                                            _hover={{
                                                bg: { base: 'rgba(0, 0, 0, 0.3)', md: 'rgba(0, 0, 0, 0.5)' },
                                            }}
                                        />
                                        {/* Play Icon - Centered */}
                                        <Flex
                                            position="absolute"
                                            top="50%"
                                            left="50%"
                                            transform="translate(-50%, -50%)"
                                            align="center"
                                            justify="center"

                                            transition="all 0.3s ease"
                                            _hover={{
                                                transform: { base: 'translate(-50%, -50%)', md: 'translate(-50%, -50%) scale(1.1)' },
                                            }}
                                        >
                                            <Icon
                                                icon="solar:play-bold"
                                                width="32"
                                                height="32"
                                                color="silver"
                                                style={{ marginLeft: '4px' }}
                                            />
                                        </Flex>
                                    </Box>

                                    {/* Text Below Image */}
                                    {video.text && (
                                        <Box
                                            p={4}
                                            bg="brand.white"
                                        >
                                            <Text
                                                fontSize="sm"
                                                color="brand.gray"
                                                fontWeight="400"
                                                lineHeight="tall"
                                                noOfLines={3}
                                                textAlign="right"
                                                dir="rtl"
                                            >
                                                {video.text}
                                            </Text>
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>
        </ChakraProvider>
    );
}

