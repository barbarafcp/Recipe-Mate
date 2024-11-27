import { useState, useEffect } from 'react';
import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import IngredientSelector from './components/IngredientSelector';
import RecipeResults from './components/RecipeResults';
import AuthPage from './components/AuthPage';
import Historial from './components/Historial';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showHistorial, setShowHistorial] = useState(false);
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

  const handleShowHistorial = () => {
    setShowHistorial(!showHistorial);
  }

  return (
    <Box minH="100vh" bg="gray.50" p="8">
      {!isAuthenticated ? (
        <AuthPage setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <>
          <Flex gap={5} justify="right" align="center" mb="4">
            {!showHistorial ? (
              <Button onClick={handleShowHistorial}>
                Historial
              </Button>
            ) : (
              <Button onClick={handleShowHistorial}>
                Buscar recetas
              </Button>
            )}
            <Button colorScheme="red" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Flex>
          {!showHistorial ? (
            <>
              <IngredientSelector
                selectedIngredients={selectedIngredients}
                setSelectedIngredients={setSelectedIngredients}
              />
              <RecipeResults selectedIngredients={selectedIngredients} />
            </>
          ) : (
            <Historial />
          )}
          
        </>
      )}
    </Box>
  );
}

export default App;
