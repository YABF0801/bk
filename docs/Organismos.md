# Organismo

Esta entidad tiene los siguientes requisitos:

## Schema

1. name :
   - string | required | minLength: 2 | maxLength: 30 | unique
2. description:
   - string | required | minLength: 10 | maxLength: 80 
3. priorizado:
   - boolean | default: false 
4. weight:
   - number | default: 0  


se establece la siguiente condición: 
   si priorizado: true entonces weight: 2