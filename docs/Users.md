## User

El esquema "User" define la estructura de documentos que serán almacenados en la colección "users" de la base de datos. Cada documento representa un usuario con sus características específicas.

## Propiedades del Esquema

El esquema "User" contiene las siguientes propiedades:

1. `nickname`: Nombre de usuario. Debe ser una cadena de texto con longitud mínima de 2 caracteres. Este campo es obligatorio y debe ser único.

2. `name`: Nombre real del usuario. Debe ser una cadena de texto con longitud mínima de 2 caracteres. Este campo es obligatorio.

3. `lastname`: Apellido del usuario. Debe ser una cadena de texto con longitud mínima de 2 caracteres. Este campo es obligatorio.

4. `password`: Contraseña del usuario. Debe ser una cadena de texto y es obligatorio.

5. `position`: Cargo que ocupa en la empresa el usuario. Debe ser una cadena de texto con longitud mínima de 2 caracteres. Este campo es obligatorio.

6. `role`: Rol del usuario. Debe ser una cadena de texto que puede tomar uno de los siguientes valores: "admin" o "guest". Por defecto, su valor es "guest".

## Métodos del Esquema

El esquema "User" tiene los siguientes métodos:

1. `toJSON`: Este método se utiliza para eliminar la propiedad de la contraseña del objeto del usuario antes de convertirlo a formato JSON. Esto es útil para evitar que la contraseña sea mostrada en las respuestas JSON.

2. `encrypt`: Este método permite encriptar una contraseña proporcionada y actualizar el campo de contraseña del usuario con el valor encriptado.

3. `comparePassword`: Este método se utiliza para comparar una contraseña proporcionada con la contraseña almacenada en el objeto del usuario. Retorna `true` si las contraseñas coinciden, o `false` en caso contrario.

## Pre-hook

El esquema "User" tiene un pre-hook definido que se ejecuta antes de guardar un nuevo usuario en la base de datos. Este pre-hook realiza el siguiente proceso:

1. Si la contraseña del usuario no ha sido modificada, continúa con el proceso de guardado.

2. Si la contraseña del usuario ha sido modificada, genera una sal (salt) de encriptación con un factor de trabajo (work factor) de 10.

3. Luego, encripta la contraseña del usuario utilizando la sal generada y actualiza el campo de contraseña con el valor encriptado antes de guardar el usuario.

Este pre-hook garantiza que la contraseña del usuario se almacene de forma segura utilizando el algoritmo de encriptación bcrypt.

