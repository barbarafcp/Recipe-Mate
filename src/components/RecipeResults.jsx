// src/components/RecipeResults.jsx

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Box, Button, Heading, Text, List, ListItem } from '@chakra-ui/react';
import Cookies from 'js-cookie';

const RecipeResults = ({ selectedIngredients }) => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  const fetchRecipes = () => {
    axios.post('http://localhost:8000/recommendation', {
      ingredient_list: selectedIngredients,
      token: Cookies.get('authToken'),
    })
      .then(response => {
        setRecipes(response.data);
        setError('');
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          setError('No se encontraron recetas con los ingredientes proporcionados.');
        } else {
          console.error('Error al obtener recetas:', err);
        }
      });
  };

  const fetchFavorites = () => {
    axios.get('http://localhost:8000/favorites', {
      headers: { Authorization: `Bearer ${Cookies.get('authToken')}` },
    })
      .then(response => {
        setFavorites(response.data);
      })
      .catch(err => {
        console.error('Error al cargar favoritos:', err);
      });
  };

  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.some((fav) => fav.recipe_id === recipe.recipe_id);

    if (isFavorite) {
      // Remove from favorites
      axios.delete(`http://localhost:8000/favorites/${recipe.recipe_id}`, {
        headers: { Authorization: `Bearer ${Cookies.get('authToken')}` },
      })
        .then(() => {
          setFavorites(favorites.filter((fav) => fav.recipe_id !== recipe.recipe_id));
        })
        .catch(err => {
          console.error('Error al quitar de favoritos:', err);
        });
    } else {
      // Add to favorites
      axios.post('http://localhost:8000/favorites', recipe, {
        headers: { Authorization: `Bearer ${Cookies.get('authToken')}` },
      })
        .then(() => {
          setFavorites([...favorites, recipe]);
        })
        .catch(err => {
          console.error('Error al agregar a favoritos:', err);
        });
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <Box maxW="lg" mx="auto" mt="8" p="6" bg="white" shadow="md" rounded="md">
      <Button colorScheme="blue" w="full" mb="4" onClick={fetchRecipes}>
        Buscar Recetas
      </Button>

      {error && <Text color="red.500" mt="4">{error}</Text>}

      {recipes.map((recipe) => (
        <Box key={recipe.recipe_id} mt="4" p="4" bg="gray.100" rounded="md">
          <Heading as="h3" size="md">{recipe.title}</Heading>
          <Text mt="2">{recipe.instructions}</Text>
          <Heading as="h4" size="sm" mt="4">Ingredientes:</Heading>
          <List spacing={2} mt="2">
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>{ingredient}</ListItem>
            ))}
          </List>
          <Button
            mt="4"
            colorScheme={favorites.some((fav) => fav.recipe_id === recipe.recipe_id) ? 'red' : 'blue'}
            onClick={() => toggleFavorite(recipe)}
          >
            {favorites.some((fav) => fav.recipe_id === recipe.recipe_id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          </Button>
        </Box>
      ))}
    </Box>
  );
};

RecipeResults.propTypes = {
  selectedIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RecipeResults;
