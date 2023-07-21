## Tools

El esquema "Tools" define la estructura de documentos que serán almacenados en la colección "tools" de la base de datos. Cada documento representa una herramienta con sus características específicas.

## Propiedades del Esquema

El esquema "Tools" contiene las siguientes propiedades:

1. `uniqueValue`: Un valor único que identifica la herramienta. Es de tipo cadena y tiene un valor predeterminado de "tools". Este campo es único 

2. `consecutive`: Un número que representa el número consecutivo para las planillas. Es de tipo numérico y tiene un valor predeterminado de 0. Este campo es único.

3. `omDate`: Una fecha que indica la fecha límite de recepción de solicitudes para el otorgamiento masivo y comenzar a generar propuestas. Es de tipo fecha y es único.

4. `contadorGP`: Un contador que almacena cuántas veces se han generado las propuestas antes de cerrar el otorgamiento. Es de tipo numérico y tiene un valor predeterminado de 0. Este campo es único.

5. `contadorCC`: Un contador que se utiliza para el cambio de curso. Es de tipo numérico y tiene un valor predeterminado de 0. Este campo es único.

6. `contadorAcept`: Un contador que se utiliza para aceptar las primeras propuestas antes del cambio de curso. Es de tipo numérico y tiene un valor predeterminado de 0. Este campo es único.

7. `circulosParaGP`: Un arreglo que almacena información de círculos copiada de la base de datos real para generar propuestas. Es de tipo arreglo.

8. `proyeccionParaGP`: Un arreglo que almacena información de círculos con proyección de matrículas de datos reales para generar propuestas. Es de tipo arreglo.

9. `curso`: Un número que indica el curso actual que transcurre. Es de tipo numérico y es único.
