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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
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

export default function AllPhotos() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const toast = useToast();

    // Fetch all photos
    const fetchPhotos = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://192.168.3.128:8000/get-all-photos/');
            setPhotos(response.data);
        } catch (error) {
            toast({
                title: 'خطأ',
                description: 'فشل في تحميل الصور',
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
        fetchPhotos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle image click to show full size
    const handleImageClick = (photo) => {
        setSelectedPhoto(photo);
        onOpen();
    };

    // Handle close modal
    const handleCloseModal = () => {
        setSelectedPhoto(null);
        onClose();
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
                        أبرز اعمال التصوير الفوتوغرافي
                    </Heading>
                </Flex>

                {/* Photos Grid */}
                {loading ? (
                    <Flex justify="center" align="center" py={20}>
                        <Spinner size="xl" color="brand.dark" />
                    </Flex>
                ) : photos.length === 0 ? (
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
                            لا توجد صور متاحة
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
                            gap={4}
                        >
                            {photos.map((photo) => (
                                <Box
                                    key={photo.id}
                                    position="relative"
                                    aspectRatio="1"
                                    borderRadius="8px"
                                    overflow="hidden"
                                    cursor="pointer"
                                    transition="all 0.3s ease"
                                    _hover={{
                                        transform: { base: 'none', md: 'scale(1.02)' },
                                        boxShadow: { base: 'none', md: '0 8px 20px rgba(0, 0, 0, 0.15)' },
                                    }}
                                    onClick={() => handleImageClick(photo)}
                                >
                                    <Image
                                        src={photo.image_url}
                                        alt={`Photo ${photo.id}`}
                                        w="100%"
                                        h="100%"
                                        objectFit="cover"
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                )}

                {/* Full Size Image Modal */}
                <Modal
                    isOpen={isOpen}
                    onClose={handleCloseModal}
                    size="full"
                    isCentered
                >
                    <ModalOverlay
                        bg="rgba(0, 0, 0, 0.9)"
                        backdropFilter="blur(10px)"
                    />
                    <ModalContent
                        bg="transparent"
                        boxShadow="none"
                        maxW="100vw"
                        maxH="100vh"
                        m={0}
                    >
                        <ModalBody
                            p={0}
                            position="relative"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            minH="100vh"
                        >
                            {/* Close Button */}
                            <IconButton
                                aria-label="إغلاق"
                                icon={<Icon icon="mdi:close" width="32" height="32" />}
                                position="absolute"
                                top={4}
                                right={4}
                                zIndex={10}
                                bg="rgba(255, 255, 255, 0.2)"
                                color="brand.white"
                                borderRadius="50%"
                                size="lg"
                                onClick={handleCloseModal}
                                _hover={{
                                    bg: { base: 'rgba(0, 0, 0, 0.6)', md: 'rgba(255, 255, 255, 0.3)' },
                                    transform: { base: 'none', md: 'scale(1.1)' },
                                }}
                                transition="all 0.3s ease"
                            />

                            {/* Full Size Image */}
                            {selectedPhoto && (
                                <Image
                                    src={selectedPhoto.image_url}
                                    alt={`Photo ${selectedPhoto.id}`}
                                    maxW="90vw"
                                    maxH="90vh"
                                    objectFit="contain"
                                    borderRadius="8px"
                                />
                            )}
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </ChakraProvider>
    );
}

