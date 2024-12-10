// src/components/RecipeResults.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Box, Button, Text } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import RecipeBox from './RecipeBox';

const RecipeResults = ({ selectedIngredients }) => {
  const [recipe, setRecipe] = useState();
  const [error, setError] = useState('');

  const fetchRecipes = () => {
    axios.post('http://localhost:8000/recommendation', {
      ingredient_list: selectedIngredients,
      token: Cookies.get('authToken'),
    })
      .then(response => {
        setRecipe(response.data);
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

  const fetchRecipesWithAI = () => {
    axios.post('http://localhost:8000/generate-recipe', {
      ingredients: selectedIngredients,
      token: Cookies.get('authToken'),
    })
      .then(response => {
        setRecipe(response.data);
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
      <Button colorScheme="blue" w="full" mb="4" onClick={fetchRecipesWithAI}>
        Buscar Recetas con AI
      </Button>

      {error && <Text color="red.500" mt="4">{error}</Text>}

      
      {recipe && (
        <RecipeBox key={recipe.recipe_id} recipe={recipe} />
      )}
    </Box>
  );
};

RecipeResults.propTypes = {
  selectedIngredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RecipeResults;
