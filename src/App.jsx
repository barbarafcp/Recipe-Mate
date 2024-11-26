import { useState, useEffect } from 'react';
import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import IngredientSelector from './components/IngredientSelector';
import RecipeResults from './components/RecipeResults';
import AuthPage from './components/AuthPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('authToken');
    setIsAuthenticated(false);
  };

  return (
    <Box minH="100vh" bg="gray.50" p="8">
      {!isAuthenticated ? (
        <AuthPage setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <>
          <Flex align="center" mb="4">
            <Spacer />
            <Button colorScheme="red" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Flex>
          <IngredientSelector
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
          />
          <RecipeResults selectedIngredients={selectedIngredients} />
        </>
      )}
    </Box>
  );
}

export default App;
