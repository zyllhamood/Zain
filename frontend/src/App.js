import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Control from './screens/Control';
import CreatePhotos from './screens/CreatePhotos';
import CreateVideo from './screens/CreateVideo';
import EditVideo from './screens/EditVideo';
import AllPhotos from './screens/AllPhotos';
import AllVideos from './screens/AllVideos';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  return (
    <ChakraProvider>
      <Navbar />
      <Routes>
        {/* New professional design - Default */}
        <Route exact path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/control" element={<Control />} />
        <Route path="/create-photos" element={<CreatePhotos />} />
        <Route path="/create-video" element={<CreateVideo />} />
        <Route path="/edit-video/:id" element={<EditVideo />} />
        <Route path="/all-photos" element={<AllPhotos />} />
        <Route path="/all-videos" element={<AllVideos />} />


      </Routes>
    </ChakraProvider>
  );
}

export default App;
