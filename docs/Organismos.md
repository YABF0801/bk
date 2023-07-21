# Organismo

El esquema "Organismo" define la estructura de documentos que serán almacenados en la colección "organismo" de la base de datos. Cada documento representa un organismo con sus características específicas.

### Propiedades del Esquema

El esquema "Organismo" contiene las siguientes propiedades:

1. `name`: Nombre del organismo. Debe ser una cadena de texto con una longitud mínima de 2 caracteres y una longitud máxima de 30 caracteres. Este campo es obligatorio y debe ser único.

2. `description`: Descripción del organismo. Debe ser una cadena de texto con una longitud mínima de 10 caracteres y una longitud máxima de 80 caracteres. Este campo es obligatorio.

3. `priorizado`: Prioridad del organismo. Es un valor booleano (verdadero o falso). Si no se especifica, su valor por defecto es "false".

4. `weight`: Peso del organismo. Debe ser un número. Si no se especifica, su valor por defecto es 0.

## Métodos del Esquema

El esquema "Organismo" tiene un método llamado calculateWeight(). Este método se ejecuta antes de guardar un documento y calcula el peso del organismo basado en su prioridad. Si el organismo está marcado como priorizado (priorizado: true), se le asigna un peso de 2, de lo contrario, el peso se establece en 0.

