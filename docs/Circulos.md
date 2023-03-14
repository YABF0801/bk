# Circulo

Esta entidad tiene los siguientes requisitos:

## Schema

1. number:
   - number | required |  min: 1 | max: 999 | unique
2. name :
   - string | required | minLength: 4 | maxLength: 30 | unique
3. normed_capacity2:
   - number | required | default: 0
4. normed_capacity3:
   - number | required | default: 0
5. normed_capacity4:
   - number | required | default: 0
6. normed_capacity5:
   - number | required | default: 0
7. normed_capacity6:
   - number | required | default: 0
8. matricula2:
   - number | default: 0
9. matricula3:
   - number | default: 0
10. matricula4:
   - number | default: 0
11. matricula5:
   - number | default: 0
12. matricula6:
   - number | default: 0
13. girls2:
   - number 
14. girls3:
   - number 
15. girls4:
   - number 
16. girls5:
   - number 
17. girls6:
   - number 
18. lat:
   - number | required |  min: -90 | max: 90 
19. lon:
   - number | required |  min: -180 | max: 180 
20. isCiActive:
   - boolean | default: true 

