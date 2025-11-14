import React, { useState, useRef } from 'react';
import {
    Box,
    Flex,
    Heading,
    Button,
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

export default function CreatePhotos() {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadingIndex, setUploadingIndex] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const toast = useToast();

    // Handle file selection
    const handleFileSelect = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        await uploadImages(files);
    };

    // Handle drag and drop
    const handleDrop = async (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files).filter(file =>
            file.type.startsWith('image/')
        );
        if (files.length === 0) return;

        await uploadImages(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Upload multiple images
    const uploadImages = async (files) => {
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

        // Upload each image sequentially
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setUploading(true);
            setUploadingIndex(i);

            try {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('media_type', 'photo');

                const response = await axios.post(
                    'http://192.168.3.128:8000/upload-image/',
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                // Add uploaded image to the list
                setUploadedImages(prev => [...prev, {
                    url: response.data.url,
                    media_id: response.data.media_id,
                    id: Date.now() + i, // Temporary ID for display
                }]);

                toast({
                    title: 'نجح التحميل',
                    description: `تم تحميل الصورة ${i + 1} بنجاح`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top',
                });
            } catch (error) {
                toast({
                    title: 'خطأ في التحميل',
                    description: `فشل تحميل الصورة ${i + 1}: ${error.response?.data?.error || error.message}`,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top',
                });
            } finally {
                if (i === files.length - 1) {
                    setUploading(false);
                    setUploadingIndex(null);
                }
            }
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Remove image from uploaded list (local only, doesn't delete from server)
    const handleRemoveImage = (index) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
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
                    <Flex align="center" gap={4} w="full" maxW="1200px" dir="rtl">
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
                            إنشاء صور جديدة
                        </Heading>
                    </Flex>
                </Flex>

                {/* Upload Section */}
                <Box
                    maxW="1200px"
                    mx="auto"
                    mb={8}
                >
                    <Box
                        border="2px dashed"
                        borderColor={uploading ? "brand.gray" : "rgba(35, 31, 32, 0.3)"}
                        borderRadius="12px"
                        p={8}
                        textAlign="center"
                        bg={uploading ? "rgba(35, 31, 32, 0.02)" : "rgba(35, 31, 32, 0.01)"}
                        transition="all 0.3s ease"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        cursor="pointer"
                        _hover={{
                            borderColor: "brand.dark",
                            bg: "rgba(35, 31, 32, 0.02)",
                        }}
                        onClick={() => !uploading && fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                            disabled={uploading}
                        />

                        {uploading ? (
                            <Flex direction="column" align="center" gap={4}>
                                <Spinner size="xl" color="brand.dark" />
                                <Text color="brand.gray" fontSize="md">
                                    جاري تحميل الصور...
                                </Text>
                            </Flex>
                        ) : (
                            <Flex direction="column" align="center" gap={4}>
                                <Icon
                                    icon="mdi:cloud-upload"
                                    width="64"
                                    height="64"
                                    color="#231F20"
                                />
                                <Box>
                                    <Text
                                        fontSize="xl"
                                        fontWeight="bold"
                                        color="brand.dark"
                                        mb={2}
                                    >
                                        اسحب الصور هنا أو انقر للاختيار
                                    </Text>
                                    <Text
                                        fontSize="sm"
                                        color="brand.gray"
                                    >
                                        يمكنك تحميل صورة واحدة أو أكثر
                                    </Text>
                                </Box>
                                <Button
                                    size="lg"
                                    bg="brand.dark"
                                    color="brand.white"
                                    fontWeight="bold"
                                    px={8}
                                    py={6}
                                    borderRadius="8px"
                                    leftIcon={<Icon icon="mdi:image-plus" width="24" height="24" />}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        fileInputRef.current?.click();
                                    }}
                                    _hover={{
                                        bg: 'brand.gray',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 20px rgba(35, 31, 32, 0.2)',
                                    }}
                                >
                                    اختر الصور
                                </Button>
                            </Flex>
                        )}
                    </Box>
                </Box>

                {/* Uploaded Images Section */}
                {uploadedImages.length > 0 && (
                    <Box
                        maxW="1200px"
                        mx="auto"
                    >
                        <Heading
                            as="h2"
                            fontSize="xl"
                            fontWeight="bold"
                            color="brand.dark"
                            mb={6}
                            textAlign="right"
                        >
                            الصور المرفوعة ({uploadedImages.length})
                        </Heading>

                        <Box
                            bg="rgba(35, 31, 32, 0.02)"
                            borderRadius="12px"
                            p={6}
                            border="1px solid"
                            borderColor="rgba(35, 31, 32, 0.1)"
                        >
                            <Flex
                                direction="row"
                                wrap="wrap"
                                gap={4}
                            >
                                {uploadedImages.map((image, index) => (
                                    <Box
                                        key={image.id || index}
                                        position="relative"
                                        w={{ base: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 11px)', lg: 'calc(25% - 12px)' }}
                                        borderRadius="8px"
                                        overflow="hidden"
                                        border="1px solid"
                                        borderColor="rgba(35, 31, 32, 0.1)"
                                        bg="brand.white"
                                        transition="all 0.3s ease"
                                        _hover={{
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                                        }}
                                    >
                                        <Image
                                            src={image.url}
                                            alt={`Uploaded ${index + 1}`}
                                            w="100%"
                                            h="200px"
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
                                                onClick={() => handleRemoveImage(index)}
                                                _hover={{
                                                    bg: 'rgba(0, 0, 0, 0.8)',
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            p={3}
                                            bg="brand.white"
                                        >
                                            <Text
                                                fontSize="xs"
                                                color="brand.gray"
                                                fontWeight="500"
                                            >
                                                ID: {image.media_id}
                                            </Text>
                                        </Box>
                                    </Box>
                                ))}
                            </Flex>
                        </Box>

                        {/* Success Message and Back Button */}
                        <Flex
                            justify="center"
                            mt={8}
                            gap={4}
                        >
                            <Button
                                size="lg"
                                bg="brand.dark"
                                color="brand.white"
                                fontWeight="bold"
                                px={8}
                                py={6}
                                borderRadius="8px"
                                onClick={() => navigate('/control')}
                                leftIcon={<Icon icon="mdi:check" width="24" height="24" />}
                                _hover={{
                                    bg: 'brand.gray',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 20px rgba(35, 31, 32, 0.2)',
                                }}
                            >
                                تم، العودة للوحة التحكم
                            </Button>
                        </Flex>
                    </Box>
                )}
            </Box>
        </ChakraProvider>
    );
}

