## Circulo

El esquema "Circulo" define la estructura de documentos que serán almacenados en la colección "circulo" de la base de datos. Cada documento representa un círculo con sus características específicas.

## Propiedades del Esquema

El esquema "Circulo" contiene las siguientes propiedades:

1. `number`: Número del círculo. Debe ser un valor numérico único y obligatorio.

2. `name`: Nombre del círculo. Debe ser una cadena de texto con longitud mínima de 2 caracteres. Este campo es obligatorio y debe ser único.

3. `circulotype`: Tipo de círculo. Puede tomar uno de los dos valores: "rural" o "urbano". El valor por defecto es "urbano".

4. `normed_capacity2`, `normed_capacity3`, `normed_capacity4`, `normed_capacity5`, `normed_capacity6`: Capacidad normada para los diferentes años de vida (2, 3, 4, 5 y 6 respectivamente). Todos los campos son numéricos y requeridos, y tienen un valor predeterminado de 0.

5. `matricula2`, `matricula3`, `matricula4`, `matricula5`, `matricula6`: Matrícula para cada año de vida (2, 3, 4, 5 y 6 respectivamente). Todos estos campos son numéricos y tienen un valor predeterminado de 0.

6. `attendance2`, `attendance3`, `attendance4`, `attendance5`, `attendance6`: Porciento de asistencia por año de vida (2, 3, 4, 5 y 6 respectivamente). Estos campos son numéricos y tienen un valor predeterminado de 100.

7. `calculated_capacity2`, `calculated_capacity3`, `calculated_capacity4`, `calculated_capacity5`, `calculated_capacity6`: Capacidad calculada según el porciento de asistencia para los diferentes años de vida (2, 3, 4, 5 y 6 respectivamente). Todos estos campos son numéricos y tienen un valor predeterminado de 0.

8. `girls2`, `girls3`, `girls4`, `girls5`, `girls6`: Cantidad de niñas para los diferentes niveles educativos (2, 3, 4, 5 y 6 respectivamente). Todos estos campos son numéricos y tienen un valor predeterminado de 0.

9. `latlng`: Coordenadas geográficas. Debe ser arreglo con un máximo de 2 elementos.

10. `isCiActive`: Indica si el círculo está activo o no. Es un campo booleano y tiene un valor predeterminado de `true`.

## Métodos del Esquema

El esquema "Circulo" tiene un método llamado `calculateCapacity`, que se ejecuta antes de guardar un documento. Este método realiza el cálculo de la capacidad calculada para cada año de vida en función de la asistencia. La capacidad calculada se establece como un 20% mayor que la capacidad normada si la asistencia está entre el 1% y el 80%. De lo contrario, la capacidad calculada es igual a la capacidad normada.

