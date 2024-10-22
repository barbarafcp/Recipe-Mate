// src/App.jsx
import { useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import IngredientSelector from './components/IngredientSelector';
import RecipeResults from './components/RecipeResults';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  return (
    <Box minH="100vh" bg="gray.50" p="8">
      <Heading as="h1" size="2xl" textAlign="center" mb="8">
        Recipe Mate
      </Heading>
      <IngredientSelector
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
      <RecipeResults selectedIngredients={selectedIngredients} />
    </Box>
  );
}

export default App;
