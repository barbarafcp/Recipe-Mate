// src/components/Historial.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import RecipeList from './RecipeList';

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
    <RecipeList recipes={recipes} listName={'Historial'} error={error} />
  );
};

export default Historial;
