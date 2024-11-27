import { Box, Heading, List, ListItem, Button, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Favoritos = ({ favorites, setFavorites }) => {
  const handleRemoveFromFavorites = (recipeId) => {
    setFavorites((prev) => prev.filter((fav) => fav.recipe_id !== recipeId));
  };

  return (
    <Box maxW="lg" mx="auto" p="6" bg="white" shadow="md" rounded="md">
      <Heading as="h2" size="lg" mb="4" textAlign="center">
        Favoritos
      </Heading>
      {favorites.length === 0 ? (
        <Text>No hay recetas favoritas.</Text>
      ) : (
        <List spacing={4}>
          {favorites.map((recipe) => (
            <ListItem key={recipe.recipe_id} p="4" bg="gray.100" rounded="md">
              <Heading as="h3" size="md">{recipe.title}</Heading>
              <Button
                mt="2"
                colorScheme="red"
                onClick={() => handleRemoveFromFavorites(recipe.recipe_id)}
              >
                Quitar de favoritos
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

Favoritos.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      recipe_id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  setFavorites: PropTypes.func.isRequired,
};

export default Favoritos;
