// src/components/RecipeResults.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Box, Button, Heading, Text, List, ListItem } from '@chakra-ui/react';

const RecipeResults = ({ selectedIngredients }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const fetchRecipes = () => {
    axios.post('http://127.0.0.1:8000/recommendation', { ingredient_list: selectedIngredients })
      .then(response => {
        setRecipes([response.data]);
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
        </Box>
      ))}
    </Box>
  );
};
RecipeResults.propTypes = {
  selectedIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RecipeResults;
