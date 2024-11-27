// src/components/IngredientSelector.jsx

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Box, Button, Select, List, ListItem, Heading, Input } from '@chakra-ui/react';

const IngredientSelector = ({ selectedIngredients, setSelectedIngredients }) => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/ingredients/')
      .then(response => {
        const sortedIngredients = response.data.sort((a, b) => a.localeCompare(b));
        setIngredients(sortedIngredients);
      })
      .catch(error => console.error('Error al cargar ingredientes:', error));
  }, []);

  const handleSelect = (event) => {
    const ingredient = event.target.value;
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleRemove = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
  };

  const filteredIngredients = ingredients
    .slice(20)
    .filter((ingredient) => ingredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box maxW="lg" mx="auto" p="6" bg="white" shadow="md" rounded="md">
      <Heading as="h2" size="lg" mb="4" textAlign="center">
        Selecciona tus Ingredientes
      </Heading>

      <Input
        placeholder="Buscar ingrediente"
        mb="4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Select placeholder="Selecciona un ingrediente" onChange={handleSelect} mb="4">
        {filteredIngredients.map((ingredient, index) => (
          <option key={index} value={ingredient}>
            {ingredient}
          </option>
        ))}
      </Select>

      <List spacing={3}>
        {selectedIngredients.map((ingredient, index) => (
          <ListItem
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="gray.100"
            p="2"
            rounded="md"
          >
            {ingredient}
            <Button colorScheme="red" size="sm" onClick={() => handleRemove(ingredient)}>
              Eliminar
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

IngredientSelector.propTypes = {
  selectedIngredients: PropTypes.array.isRequired,
  setSelectedIngredients: PropTypes.func.isRequired,
};

export default IngredientSelector;
