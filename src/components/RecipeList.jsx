// src/components/RecipeList.jsx

import { Box, Heading, Text } from '@chakra-ui/react';
import RecipeBox from './RecipeBox';

const RecipeList = ({ recipes, listName, error }) => {
  return (
    <Box maxW="lg" mx="auto" mt="8" p="6" bg="white" shadow="md" rounded="md">
      <Heading as="h2" size="lg" mb="4" textAlign="center">
        {listName}
      </Heading>
      {error && <Text color="red.500" mt="4">{error}</Text>}

      {recipes.map((recipe) => (
        <RecipeBox key={recipe.recipe_id} recipe={recipe} />
      ))}
    </Box>
  );
};

export default RecipeList;
