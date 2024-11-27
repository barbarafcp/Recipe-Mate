// src/components/Historial.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Text, List, ListItem } from '@chakra-ui/react';
import Cookies from 'js-cookie';

const Historial = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const fetchRecipes = () => {
    const token = Cookies.get('authToken');
    axios.get('http://localhost:8000/historial', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setRecipes(response.data.data);
        setError('');
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          setError('Error al obtener el historial de recetas');
        } else {
          console.error('Error al obtener recetas:', err);
        }
      });
  };

  useEffect(() => {
    fetchRecipes();
  }, [])

  return (
    <Box maxW="lg" mx="auto" mt="8" p="6" bg="white" shadow="md" rounded="md">
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

export default Historial;
