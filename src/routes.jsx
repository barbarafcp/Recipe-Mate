// src/routes.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import IngredientSelector from './components/IngredientSelector';
import RecipeResults from './components/RecipeResults';
import Historial from './components/Historial';
import Favoritos from './components/Favoritos';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Box, Button, Flex } from '@chakra-ui/react';

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [favorites, setFavorites] = useState([]);

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
    <Router>
      <Box minH="100vh" bg="gray.50" p="8">
        {!isAuthenticated ? (
          <AuthPage setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <>
            <Flex gap={5} justify="right" align="center" mb="4">
              <Button as="a" href="/favoritos">
                Favoritos
              </Button>
              <Button as="a" href="/">
                Buscar recetas
              </Button>
              <Button as="a" href="/historial">
                Historial
              </Button>
              <Button colorScheme="red" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </Flex>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <IngredientSelector
                      selectedIngredients={selectedIngredients}
                      setSelectedIngredients={setSelectedIngredients}
                    />
                    <RecipeResults
                      selectedIngredients={selectedIngredients}
                      favorites={favorites}
                      setFavorites={setFavorites}
                    />
                  </>
                }
              />
              <Route path="/historial" element={<Historial />} />
              <Route
                path="/favoritos"
                element={
                  <Favoritos
                    favorites={favorites}
                    setFavorites={setFavorites}
                  />
                }
              />
            </Routes>
          </>
        )}
      </Box>
    </Router>
  );
};

export default AppRoutes;
