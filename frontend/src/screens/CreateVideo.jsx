import React, { useState, useRef } from 'react';
import {
    Box,
    Flex,
    Heading,
    Button,
    Image,
    Text,
    Input,
    Textarea,
    useToast,
    extendTheme,
    ChakraProvider,
    Spinner,
    IconButton,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
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

export default function CreateVideo() {
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [text, setText] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);
    const [creating, setCreating] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const toast = useToast();

    // Handle image file selection
    const handleImageSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        await uploadImage(file);
    };

    // Handle drag and drop for image
    const handleDrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (!file || !file.type.startsWith('image/')) return;

        await uploadImage(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Upload image with media_type='video'
    const uploadImage = async (file) => {
        const token = Cookies.get('access_token');
        if (!token) {
            toast({
                title: 'خطأ',
                description: 'يرجى تسجيل الدخول أولاً',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
            navigate('/login');
            return;
        }

        setUploadingImage(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('media_type', 'video');

            const response = await axios.post(
                'http://192.168.0.115:8000/upload-image/',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setImageUrl(response.data.url);
            toast({
                title: 'نجح التحميل',
                description: 'تم تحميل الصورة بنجاح',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
            });
        } catch (error) {
            toast({
                title: 'خطأ في التحميل',
                description: error.response?.data?.error || error.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top',
            });
        } finally {
            setUploadingImage(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    // Remove uploaded image
    const handleRemoveImage = () => {
        setImageUrl('');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!text.trim()) {
            toast({
                title: 'خطأ',
                description: 'الرجاء إدخال النص',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
            return;
        }

        const token = Cookies.get('access_token');
        if (!token) {
            toast({
                title: 'خطأ',
                description: 'يرجى تسجيل الدخول أولاً',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
            navigate('/login');
            return;
        }

        setCreating(true);
        try {
            await axios.post(
                'http://192.168.0.115:8000/create-video/',
                {
                    text: text,
                    image_url: imageUrl || '',
                    video_url: videoUrl || '',
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            toast({
                title: 'نجح الإنشاء',
                description: 'تم إنشاء الفيديو بنجاح',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
            });

            // Navigate back to control after short delay
            setTimeout(() => {
                navigate('/control');
            }, 1000);
        } catch (error) {
            toast({
                title: 'خطأ في الإنشاء',
                description: error.response?.data?.error || error.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top',
            });
        } finally {
            setCreating(false);
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
                    direction="column"
                    align="center"
                    mb={8}
                    gap={4}
                >
                    <Flex align="center" gap={4} w="full" maxW="800px" dir="rtl">
                        <IconButton
                            aria-label="رجوع"
                            icon={<Icon icon="mdi:arrow-right" width="24" height="24" />}
                            onClick={() => navigate('/control')}
                            variant="ghost"
                            size="lg"
                            color="brand.dark"
                            _hover={{
                                bg: 'rgba(35, 31, 32, 0.1)',
                            }}
                        />
                        <Heading
                            as="h1"
                            fontSize={{ base: '2xl', md: '3xl' }}
                            fontWeight="bold"
                            color="brand.dark"
                        >
                            إنشاء فيديو جديد
                        </Heading>
                    </Flex>
                </Flex>

                {/* Form Container */}
                <Box
                    maxW="800px"
                    mx="auto"
                >
                    <form onSubmit={handleSubmit}>
                        {/* Image Upload Section */}
                        <Box mb={6}>
                            <Text
                                fontSize="md"
                                fontWeight="600"
                                color="brand.dark"
                                mb={3}
                                textAlign="right"
                            >
                                صورة الفيديو
                            </Text>
                            {!imageUrl ? (
                                <Box
                                    border="2px dashed"
                                    borderColor={uploadingImage ? "brand.gray" : "rgba(35, 31, 32, 0.3)"}
                                    borderRadius="12px"
                                    p={8}
                                    textAlign="center"
                                    bg={uploadingImage ? "rgba(35, 31, 32, 0.02)" : "rgba(35, 31, 32, 0.01)"}
                                    transition="all 0.3s ease"
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    cursor="pointer"
                                    _hover={{
                                        borderColor: "brand.dark",
                                        bg: "rgba(35, 31, 32, 0.02)",
                                    }}
                                    onClick={() => !uploadingImage && fileInputRef.current?.click()}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageSelect}
                                        style={{ display: 'none' }}
                                        disabled={uploadingImage}
                                    />

                                    {uploadingImage ? (
                                        <Flex direction="column" align="center" gap={4}>
                                            <Spinner size="xl" color="brand.dark" />
                                            <Text color="brand.gray" fontSize="md">
                                                جاري تحميل الصورة...
                                            </Text>
                                        </Flex>
                                    ) : (
                                        <Flex direction="column" align="center" gap={4}>
                                            <Icon
                                                icon="mdi:cloud-upload"
                                                width="48"
                                                height="48"
                                                color="#231F20"
                                            />
                                            <Box>
                                                <Text
                                                    fontSize="lg"
                                                    fontWeight="600"
                                                    color="brand.dark"
                                                    mb={1}
                                                >
                                                    اسحب الصورة هنا أو انقر للاختيار
                                                </Text>
                                                <Text
                                                    fontSize="sm"
                                                    color="brand.gray"
                                                >
                                                    اختر صورة للفيديو
                                                </Text>
                                            </Box>
                                        </Flex>
                                    )}
                                </Box>
                            ) : (
                                <Box
                                    position="relative"
                                    borderRadius="12px"
                                    overflow="hidden"
                                    border="1px solid"
                                    borderColor="rgba(35, 31, 32, 0.1)"
                                    bg="brand.white"
                                >
                                    <Image
                                        src={imageUrl}
                                        alt="Video thumbnail"
                                        w="100%"
                                        h="300px"
                                        objectFit="cover"
                                    />
                                    <Box
                                        position="absolute"
                                        top={2}
                                        right={2}
                                    >
                                        <IconButton
                                            aria-label="إزالة الصورة"
                                            icon={<Icon icon="mdi:close" width="20" height="20" />}
                                            size="sm"
                                            bg="rgba(0, 0, 0, 0.6)"
                                            color="brand.white"
                                            borderRadius="50%"
                                            onClick={handleRemoveImage}
                                            _hover={{
                                                bg: 'rgba(0, 0, 0, 0.8)',
                                            }}
                                        />
                                    </Box>
                                </Box>
                            )}
                        </Box>

                        {/* Video URL Input */}
                        <Box mb={6}>
                            <Text
                                fontSize="md"
                                fontWeight="600"
                                color="brand.dark"
                                mb={3}
                                textAlign="right"
                            >
                                رابط الفيديو
                            </Text>
                            <Input
                                type="url"
                                placeholder="أدخل رابط الفيديو"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                size="lg"
                                bg="rgba(35, 31, 32, 0.03)"
                                border="2px solid"
                                borderColor="rgba(35, 31, 32, 0.1)"
                                borderRadius="8px"
                                _focus={{
                                    borderColor: 'brand.dark',
                                    bg: 'brand.white',
                                    boxShadow: '0 0 0 3px rgba(35, 31, 32, 0.1)',
                                }}
                                _hover={{
                                    borderColor: 'rgba(35, 31, 32, 0.3)',
                                }}
                                fontSize="md"
                                fontWeight="400"
                                h="50px"
                                dir="ltr"
                            />
                        </Box>

                        {/* Text Input */}
                        <Box mb={8}>
                            <Text
                                fontSize="md"
                                fontWeight="600"
                                color="brand.dark"
                                mb={3}
                                textAlign="right"
                            >
                                النص <Text as="span" color="red.500">*</Text>
                            </Text>
                            <Textarea
                                placeholder="أدخل النص"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                size="lg"
                                bg="rgba(35, 31, 32, 0.03)"
                                border="2px solid"
                                borderColor="rgba(35, 31, 32, 0.1)"
                                borderRadius="8px"
                                _focus={{
                                    borderColor: 'brand.dark',
                                    bg: 'brand.white',
                                    boxShadow: '0 0 0 3px rgba(35, 31, 32, 0.1)',
                                }}
                                _hover={{
                                    borderColor: 'rgba(35, 31, 32, 0.3)',
                                }}
                                fontSize="md"
                                fontWeight="400"
                                minH="120px"
                                dir="rtl"
                                resize="vertical"
                            />
                        </Box>

                        {/* Submit Button */}
                        <Flex
                            justify="center"
                            gap={4}
                        >
                            <Button
                                type="button"
                                size="lg"
                                variant="outline"
                                borderColor="brand.dark"
                                color="brand.dark"
                                fontWeight="bold"
                                px={8}
                                py={6}
                                borderRadius="8px"
                                onClick={() => navigate('/control')}
                                _hover={{
                                    bg: 'rgba(35, 31, 32, 0.05)',
                                }}
                            >
                                إلغاء
                            </Button>
                            <Button
                                type="submit"
                                size="lg"
                                bg="brand.dark"
                                color="brand.white"
                                fontWeight="bold"
                                px={8}
                                py={6}
                                borderRadius="8px"
                                isLoading={creating}
                                loadingText="جاري الإنشاء..."
                                leftIcon={<Icon icon="mdi:check" width="24" height="24" />}
                                _hover={{
                                    bg: 'brand.gray',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 20px rgba(35, 31, 32, 0.2)',
                                }}
                                _active={{
                                    transform: 'translateY(0)',
                                }}
                            >
                                إنشاء الفيديو
                            </Button>
                        </Flex>
                    </form>
                </Box>
            </Box>
        </ChakraProvider>
    );
}

