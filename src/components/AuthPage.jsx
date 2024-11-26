// src/components/AuthPage.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Box,
  Button,
  Input,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from '@chakra-ui/react';

const AuthPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    axios.post('http://localhost:8000/login', { email, password })
      .then(response => {
        Cookies.set('authToken', response.data.token, { expires: 7 });
        setIsAuthenticated(true);
        setError('');
      })
      .catch(() => setError('Credenciales inválidas.'));
  };

  const handleRegister = () => {
    axios.post('http://localhost:8000/register', { email, password })
      .then(() => {
        setError('');
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
      })
      .catch(() => setError('Error al registrar. Intenta de nuevo.'));
  };

  return (
    <Box maxW="md" mx="auto" mt="8" p="6" bg="white" shadow="md" rounded="md">
      <Heading as="h2" size="lg" textAlign="center" mb="4">
        Autenticación
      </Heading>
      {error && <Text color="red.500" mb="4">{error}</Text>}
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Iniciar Sesión</Tab>
          <Tab>Registrarse</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Input
              placeholder="Correo electrónico"
              type="email"
              mb="4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Contraseña"
              type="password"
              mb="4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button colorScheme="blue" w="full" onClick={handleLogin}>
              Iniciar Sesión
            </Button>
          </TabPanel>
          <TabPanel>
            <Input
              placeholder="Correo electrónico"
              type="email"
              mb="4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Contraseña"
              type="password"
              mb="4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button colorScheme="green" w="full" onClick={handleRegister}>
              Registrarse
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
AuthPage.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default AuthPage;
