import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Heading,
    Button,
    Image,
    Text,
    IconButton,
    useToast,
    extendTheme,
    ChakraProvider,
    Spinner,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';

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

export default function Control() {
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loadingPhotos, setLoadingPhotos] = useState(false);
    const [loadingVideos, setLoadingVideos] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    // Fetch all photos
    const fetchPhotos = async () => {
        setLoadingPhotos(true);
        try {
            const response = await axios.get('http://192.168.0.115:8000/get-all-photos/');
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
            setLoadingPhotos(false);
        }
    };

    // Fetch all videos
    const fetchVideos = async () => {
        setLoadingVideos(true);
        try {
            const response = await axios.get('http://192.168.0.115:8000/get-all-videos/');
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
            setLoadingVideos(false);
        }
    };

    // Delete photo
    const handleDeletePhoto = async (photoId) => {
        const result = await Swal.fire({
            title: 'هل أنت متأكد؟',
            text: 'لن تتمكن من استعادة هذه الصورة!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#231F20',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، احذف',
            cancelButtonText: 'إلغاء',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                const token = Cookies.get('access_token');
                await axios.delete('http://192.168.0.115:8000/delete-media/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    data: {
                        id: photoId,
                        media_type: 'photo',
                    },
                });

                Swal.fire({
                    title: 'تم الحذف!',
                    text: 'تم حذف الصورة بنجاح',
                    icon: 'success',
                    confirmButtonColor: '#231F20',
                });

                // Refresh photos list
                fetchPhotos();
            } catch (error) {
                Swal.fire({
                    title: 'خطأ!',
                    text: 'فشل في حذف الصورة',
                    icon: 'error',
                    confirmButtonColor: '#231F20',
                });
            }
        }
    };

    // Delete video
    const handleDeleteVideo = async (videoId) => {
        const result = await Swal.fire({
            title: 'هل أنت متأكد؟',
            text: 'لن تتمكن من استعادة هذا الفيديو!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#231F20',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، احذف',
            cancelButtonText: 'إلغاء',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                const token = Cookies.get('access_token');
                await axios.delete('http://192.168.0.115:8000/delete-media/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    data: {
                        id: videoId,
                        media_type: 'video',
                    },
                });

                Swal.fire({
                    title: 'تم الحذف!',
                    text: 'تم حذف الفيديو بنجاح',
                    icon: 'success',
                    confirmButtonColor: '#231F20',
                });

                // Refresh videos list
                fetchVideos();
            } catch (error) {
                Swal.fire({
                    title: 'خطأ!',
                    text: 'فشل في حذف الفيديو',
                    icon: 'error',
                    confirmButtonColor: '#231F20',
                });
            }
        }
    };

    useEffect(() => {
        fetchPhotos();
        fetchVideos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    direction="column"
                    align="center"
                    mb={8}
                >
                    <Heading
                        as="h1"
                        fontSize={{ base: '2xl', md: '3xl' }}
                        fontWeight="bold"
                        color="brand.dark"
                    >
                        لوحة التحكم
                    </Heading>
                </Flex>

                {/* Main Content - Two Columns */}
                <Flex
                    direction={{ base: 'column', lg: 'row' }}
                    gap={6}
                    align="flex-start"
                >
                    {/* Right Side - Photos */}
                    <Box
                        flex="1"
                        w="full"
                        bg="rgba(35, 31, 32, 0.02)"
                        borderRadius="12px"
                        p={6}
                        border="1px solid"
                        borderColor="rgba(35, 31, 32, 0.1)"

                    >
                        <Flex
                            justify="space-between"
                            align="center"
                            mb={6}
                            direction={{ base: 'column', sm: 'row' }}
                            gap={4}

                        >
                            <Heading
                                as="h2"
                                fontSize="xl"
                                fontWeight="bold"
                                color="brand.dark"
                                textAlign="right"
                            >
                                الصور
                            </Heading>
                            <Button
                                size="md"
                                bg="brand.dark"
                                color="brand.white"
                                fontWeight="bold"
                                px={6}
                                py={4}
                                borderRadius="8px"
                                transition="all 0.3s ease"
                                _hover={{
                                    bg: 'brand.gray',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 20px rgba(35, 31, 32, 0.2)',
                                }}
                                leftIcon={<Icon icon="mdi:camera-plus" width="20" height="20" />}
                                onClick={() => navigate('/create-photos')}
                            >
                                إنشاء صورة
                            </Button>
                        </Flex>

                        {loadingPhotos ? (
                            <Flex justify="center" align="center" py={12}>
                                <Spinner size="xl" color="brand.dark" />
                            </Flex>
                        ) : photos.length === 0 ? (
                            <Text
                                textAlign="center"
                                color="brand.gray"
                                py={12}
                                fontSize="md"
                            >
                                لا توجد صور
                            </Text>
                        ) : (
                            <Flex
                                direction="column"
                                gap={4}
                                maxH="500px"
                                overflowY="auto"
                            >
                                {photos.map((photo) => (
                                    <Box
                                        key={photo.id}
                                        bg="brand.white"
                                        p={4}
                                        borderRadius="8px"
                                        border="1px solid"
                                        borderColor="rgba(35, 31, 32, 0.1)"
                                        transition="all 0.3s ease"
                                        _hover={{
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }}
                                    >
                                        <Flex
                                            align="center"
                                            gap={4}
                                            dir="rtl"
                                        >
                                            {/* Photo Image */}
                                            <Image
                                                src={photo.image_url}
                                                alt={`Photo ${photo.id}`}
                                                w="80px"
                                                h="80px"
                                                objectFit="cover"
                                                borderRadius="6px"
                                                flexShrink={0}
                                            />

                                            {/* Photo Info */}
                                            <Flex
                                                direction="column"
                                                flex="1"
                                                gap={1}
                                            >
                                                <Text
                                                    fontSize="sm"
                                                    color="brand.gray"
                                                    fontWeight="500"
                                                >
                                                    ID: {photo.id}
                                                </Text>
                                            </Flex>

                                            {/* Delete Button */}
                                            <IconButton
                                                aria-label="حذف الصورة"
                                                icon={<Icon icon="mdi:delete" width="20" height="20" />}
                                                colorScheme="red"
                                                variant="ghost"
                                                size="md"
                                                onClick={() => handleDeletePhoto(photo.id)}
                                                _hover={{
                                                    bg: 'red.50',
                                                    color: 'red.600',
                                                }}
                                            />
                                        </Flex>
                                    </Box>
                                ))}
                            </Flex>
                        )}
                    </Box>

                    {/* Left Side - Videos */}
                    <Box
                        flex="1"
                        w="full"
                        bg="rgba(35, 31, 32, 0.02)"
                        borderRadius="12px"
                        p={6}
                        border="1px solid"
                        borderColor="rgba(35, 31, 32, 0.1)"
                    >
                        <Flex
                            justify="space-between"
                            align="center"
                            mb={6}
                            direction={{ base: 'column', sm: 'row' }}
                            gap={4}
                        >
                            <Heading
                                as="h2"
                                fontSize="xl"
                                fontWeight="bold"
                                color="brand.dark"
                                textAlign="right"
                            >
                                الفيديوهات
                            </Heading>
                            <Button
                                size="md"
                                bg="brand.dark"
                                color="brand.white"
                                fontWeight="bold"
                                px={6}
                                py={4}
                                borderRadius="8px"
                                transition="all 0.3s ease"
                                _hover={{
                                    bg: 'brand.gray',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 20px rgba(35, 31, 32, 0.2)',
                                }}
                                leftIcon={<Icon icon="mdi:video-plus" width="20" height="20" />}
                                onClick={() => navigate('/create-video')}
                            >
                                إنشاء فيديو
                            </Button>
                        </Flex>

                        {loadingVideos ? (
                            <Flex justify="center" align="center" py={12}>
                                <Spinner size="xl" color="brand.dark" />
                            </Flex>
                        ) : videos.length === 0 ? (
                            <Text
                                textAlign="center"
                                color="brand.gray"
                                py={12}
                                fontSize="md"
                            >
                                لا توجد فيديوهات
                            </Text>
                        ) : (
                            <Flex
                                direction="column"
                                gap={4}
                                maxH="500px"
                                overflowY="auto"
                            >
                                {videos.map((video) => (
                                    <Box
                                        key={video.id}
                                        bg="brand.white"
                                        p={4}
                                        borderRadius="8px"
                                        border="1px solid"
                                        borderColor="rgba(35, 31, 32, 0.1)"
                                        transition="all 0.3s ease"
                                        _hover={{
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                            transform: 'translateY(-2px)',
                                        }}
                                    >
                                        <Flex
                                            align="center"
                                            gap={4}
                                            dir="rtl"
                                        >
                                            {/* Video Thumbnail */}
                                            <Image
                                                src={video.image_url}
                                                alt={`Video ${video.id}`}
                                                w="80px"
                                                h="80px"
                                                objectFit="cover"
                                                borderRadius="6px"
                                                flexShrink={0}
                                            />

                                            {/* Video Info */}
                                            <Flex
                                                direction="column"
                                                flex="1"
                                                gap={1}
                                            >
                                                <Text
                                                    fontSize="sm"
                                                    color="brand.gray"
                                                    fontWeight="500"
                                                >
                                                    ID: {video.id}
                                                </Text>
                                            </Flex>

                                            {/* Edit and Delete Buttons */}
                                            <Flex gap={2}>
                                                <IconButton
                                                    aria-label="تعديل الفيديو"
                                                    icon={<Icon icon="mdi:pencil" width="20" height="20" />}
                                                    colorScheme="blue"
                                                    variant="ghost"
                                                    size="md"
                                                    onClick={() => navigate(`/edit-video/${video.id}`)}
                                                    _hover={{
                                                        bg: 'blue.50',
                                                        color: 'blue.600',
                                                    }}
                                                />
                                                <IconButton
                                                    aria-label="حذف الفيديو"
                                                    icon={<Icon icon="mdi:delete" width="20" height="20" />}
                                                    colorScheme="red"
                                                    variant="ghost"
                                                    size="md"
                                                    onClick={() => handleDeleteVideo(video.id)}
                                                    _hover={{
                                                        bg: 'red.50',
                                                        color: 'red.600',
                                                    }}
                                                />
                                            </Flex>
                                        </Flex>
                                    </Box>
                                ))}
                            </Flex>
                        )}
                    </Box>
                </Flex>
            </Box>
        </ChakraProvider>
    );
}

