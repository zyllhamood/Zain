import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    IconButton,
    useToast,
    extendTheme,
    ChakraProvider,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
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

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Validation
        if (!username || !password) {
            toast({
                title: 'خطأ',
                description: 'الرجاء إدخال اسم المستخدم وكلمة المرور',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
            return;
        }
        setLoading(true);
        try {
            const res = await dispatch(login({
                username: username,
                password: password
            }))
            if (res.payload.detail === "No active account found with the given credentials") {
                toast({
                    title: 'خطأ',
                    description: 'اسم المستخدم أو كلمة المرور غير صحيحة',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top',
                })
            } else {
                toast({
                    title: 'تم تسجيل الدخول بنجاح',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top',
                })
                setTimeout(() => {
                    window.location.href = '/control'
                }, 1000)
            }
        } catch (error) {
            toast({
                title: 'خطأ في الاتصال',
                description: 'يرجى المحاولة مرة أخرى',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
            })
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if (Cookies.get('access_token')) {
            window.location.href = '/control'
        }
    }, [])

    return (
        <ChakraProvider theme={theme}>
            <Box
                minH="100vh"
                bg="brand.white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                px={4}
                pt={{ base: '80px', md: '100px' }}
                position="relative"
                overflow="hidden"
            >
                {/* Background Decorative Elements */}
                <Box
                    position="absolute"
                    top="-10%"
                    right="-10%"
                    w="400px"
                    h="400px"
                    border="80px solid"
                    borderColor="brand.dark"
                    opacity={0.03}
                    transform="rotate(45deg)"
                    display={{ base: 'none', lg: 'block' }}
                />
                <Box
                    position="absolute"
                    bottom="-10%"
                    left="-10%"
                    w="300px"
                    h="300px"
                    border="60px solid"
                    borderColor="brand.dark"
                    opacity={0.03}
                    transform="rotate(45deg)"
                    display={{ base: 'none', lg: 'block' }}
                />

                {/* Login Form Container */}
                <Box
                    w="full"
                    maxW="450px"
                    bg="brand.white"
                    p={{ base: 8, md: 10 }}
                    borderRadius="16px"
                    boxShadow="0 20px 60px rgba(0, 0, 0, 0.1)"
                    position="relative"
                    zIndex={1}
                    border="1px solid"
                    borderColor="rgba(35, 31, 32, 0.1)"
                >
                    {/* Logo/Title Section */}
                    <Flex direction="column" align="center" mb={8}>
                        <Heading
                            as="h1"
                            fontSize={{ base: '3xl', md: '4xl' }}
                            fontWeight="bold"
                            color="brand.dark"
                            mb={2}
                            textAlign="center"
                        >
                            تسجيل الدخول
                        </Heading>
                        <Box w="60px" h="3px" bg="brand.dark" />
                    </Flex>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} dir="rtl">
                        {/* Username Input */}
                        <Box mb={6}>
                            <Input
                                type="text"
                                placeholder="اسم المستخدم"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                            />
                        </Box>

                        {/* Password Input */}
                        <Box mb={8}>
                            <InputGroup size="lg">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="كلمة المرور"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                />
                                <InputRightElement h="50px" width="3.5rem">
                                    <IconButton
                                        aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                                        icon={
                                            <Icon
                                                icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                                                width="20"
                                                height="20"
                                            />
                                        }
                                        onClick={() => setShowPassword(!showPassword)}
                                        variant="ghost"
                                        size="sm"
                                        color="brand.gray"
                                        _hover={{
                                            bg: 'rgba(35, 31, 32, 0.05)',
                                        }}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </Box>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            w="full"
                            size="lg"
                            bg="brand.dark"
                            color="brand.white"
                            fontWeight="bold"
                            fontSize="md"
                            h="50px"
                            borderRadius="8px"
                            isLoading={loading}
                            loadingText="جاري تسجيل الدخول..."
                            transition="all 0.3s ease"
                            _hover={{
                                bg: 'brand.gray',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 20px rgba(35, 31, 32, 0.2)',
                            }}
                            _active={{
                                transform: 'translateY(0)',
                            }}
                        >
                            تسجيل الدخول
                        </Button>
                    </form>
                </Box>
            </Box>
        </ChakraProvider>
    );
}

