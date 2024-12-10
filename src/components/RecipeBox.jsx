import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading, Text, List, ListItem } from '@chakra-ui/react';
import Cookies from 'js-cookie';

const RecipeBox = ({ recipe }) => {
  const [favorite, setFavorite] = useState(recipe.favorite);

  const toggleFavorite = (recipe) => {
    if (favorite) {
      // Remove from favorites
      axios.post(`http://localhost:8000/favorites/delete`, {
        recipe_id: recipe.recipe_id,
        token: Cookies.get('authToken')
      })
        .then(() => {
          setFavorite(false);
        })
        .catch(err => {
          console.error('Error al quitar de favoritos:', err);
        });
    } else {
      // Add to favorites
      axios.post('http://localhost:8000/favorites', {
        recipe_id: recipe.recipe_id,
        token: Cookies.get('authToken')
      })
        .then(() => {
          setFavorite(true);
        })
        .catch(err => {
          console.error('Error al agregar a favoritos:', err);
        });
    }
  };

  return (
    <Box key={recipe.recipe_id} mt="4" p="4" bg="gray.100" rounded="md">
      <Heading as="h3" size="md">{recipe.title}</Heading>
      <Text mt="2">{recipe.instructions}</Text>
      {recipe.ingredients && (
        <>
          <Heading as="h4" size="sm" mt="4">Ingredientes:</Heading>
          <List spacing={2} mt="2">
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>{ingredient}</ListItem>
            ))}
          </List>
        </>
      )}
      <Button
        mt="4"
        colorScheme={favorite ? 'red' : 'blue'}
        onClick={() => toggleFavorite(recipe)}
      >
        {favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      </Button>
    </Box>
  );
};

export default RecipeBox;
