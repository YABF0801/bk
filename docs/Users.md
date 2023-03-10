# Usuario

Esta entidad tiene los siguientes requisitos:

## Schema

1. nickname :
   - string | required | minLength: 2 | maxLength: 10 | unique
2. name :
   - string | required | minLength: 2 | maxLength: 20 
3. lastname :
   - string | required | minLength: 4 | maxLength: 50 
4. password:
   - string | required 
5. position :
   - string | required | minLength: 4 | maxLength: 50
6. role:
   - string | enum: ['admin', 'guest'] | default: 'guest'


se establecen la siguientes condiciones: 

   - password debe contener al menos una mayúscula, una minúscula y un número
   - encriptar la contraseña antes de guardar
