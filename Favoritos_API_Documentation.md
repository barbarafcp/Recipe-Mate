
# API Documentation: Favoritos

## 1. Obtener Favoritos
**Endpoint**: `GET /favorites`

### Descripción:
Devuelve la lista de recetas favoritas del usuario autenticado.

### Request:
- **Headers**:
```json
{
  "Authorization": "Bearer <authToken>"
}
```

### Response:
- **200 OK**:
```json
[
  {
    "recipe_id": 1,
    "title": "Ensalada César",
    "instructions": "Mezcla todos los ingredientes.",
    "ingredients": ["Lechuga", "Pollo", "Aderezo César"]
  },
  {
    "recipe_id": 2,
    "title": "Pizza Margarita",
    "instructions": "Hornea la pizza.",
    "ingredients": ["Masa", "Tomate", "Queso"]
  }
]
```
- **401 Unauthorized**:
```json
{
  "error": "Usuario no autenticado."
}
```

---

## 2. Agregar a Favoritos
**Endpoint**: `POST /favorites`

### Descripción:
Agrega una receta a la lista de favoritos del usuario autenticado.

### Request:
- **Headers**:
```json
{
  "Authorization": "Bearer <authToken>"
}
```
- **Body**:
```json
{
  "recipe_id": 1,
  "title": "Ensalada César",
  "instructions": "Mezcla todos los ingredientes.",
  "ingredients": ["Lechuga", "Pollo", "Aderezo César"]
}
```

### Response:
- **201 Created**:
```json
{
  "message": "Receta agregada a favoritos."
}
```
- **400 Bad Request**:
```json
{
  "error": "La receta ya está en favoritos."
}
```
- **401 Unauthorized**:
```json
{
  "error": "Usuario no autenticado."
}
```

---

## 3. Eliminar de Favoritos
**Endpoint**: `DELETE /favorites/:id`

### Descripción:
Elimina una receta de la lista de favoritos del usuario autenticado.

### Request:
- **Headers**:
```json
{
  "Authorization": "Bearer <authToken>"
}
```
- **Params**:
  - `id`: ID de la receta que se desea eliminar.

### Response:
- **200 OK**:
```json
{
  "message": "Receta eliminada de favoritos."
}
```
- **404 Not Found**:
```json
{
  "error": "La receta no está en favoritos."
}
```
- **401 Unauthorized**:
```json
{
  "error": "Usuario no autenticado."
}
```

---

## Consideraciones Técnicas

1. **Autenticación**:
   - Todos los endpoints deben validar el token del usuario (`Authorization: Bearer <authToken>`).
   - Usar middleware de autenticación para verificar que el token es válido.

2. **Persistencia de Datos**:
   - Los favoritos deben almacenarse en la base de datos vinculados al usuario. Por ejemplo, una tabla de favoritos:

   **Tabla `favorites`**:
   | ID | User ID | Recipe ID | Title          | Instructions                | Ingredients             |
   |----|---------|-----------|----------------|-----------------------------|-------------------------|
   | 1  | 101     | 1         | Ensalada César | Mezcla todos los ingredientes. | ["Lechuga", "Pollo"] |
   | 2  | 101     | 2         | Pizza Margarita| Hornea la pizza.             | ["Masa", "Tomate"]    |

3. **Validación**:
   - Verificar que la receta existe antes de agregarla a favoritos.
   - Verificar que la receta ya no esté en favoritos antes de agregarla nuevamente.

4. **Respuesta en Formato Estandarizado**:
   - Usar HTTP status codes correctos (`200`, `201`, `404`, `401`, etc.).
   - Asegurarse de devolver mensajes claros en los errores.
