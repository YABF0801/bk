## Submision

El esquema "Submision" define la estructura de documentos que serán almacenados en la colección "submision" de la base de datos. Cada documento representa una presentación con sus características específicas.

## Propiedades del Esquema

El esquema "Submision" contiene las siguientes propiedades:

1. `finality`: Tipo de finalidad de la planilla, ya sea para otorgamiento masivo o sistemático. Debe ser una cadena de texto y puede tomar los valores "os" u "om". El valor por defecto es "om".

2. `submisiontype`: Tipo de planilla. Debe ser una cadena de texto y puede ser "nueva" o "traslado". El valor por defecto es "nueva".

3. `entryNumber`: Número de entrada. Debe ser un valor numérico y es obligatorio.

4. `socialCase`: Indica si la planilla se registra como un caso social. Es un valor booleano y por defecto es falso.

5. `motive`: Motivo de la solicitud. Es una cadena de texto.

6. `status`: Estado de la planilla. Debe ser una cadena de texto y puede tomar los valores "pendiente", "propuesta", "matricula" o "baja". El valor por defecto es "pendiente".

7. `ciPedido`: Círculo de preferencia solicitado. Es una cadena de texto.

8. `weight`: Peso asignado a la planilla. Es un valor numérico y tiene un valor predeterminado de 0. El peso se calcula automáticamente utilizando ciertos criterios definidos en el método `calculateWeight`.

9. `child`: Objeto que contiene información sobre el menor. Contiene las siguientes propiedades:

   - `childName`: Nombre del menor. Es una cadena de texto con longitud mínima de 2 caracteres y es obligatorio.
   - `childLastname`: Apellido del menor. Es una cadena de texto con longitud mínima de 2 caracteres y es obligatorio.
   - `carnet`: Número de carnet del menor. Es un valor numérico único y es obligatorio.
   - `sex`: Género del menor. Debe ser una cadena de texto y puede ser "masculino" o "femenino".
   - `age`: Edad del menor en años. Es un valor numérico y debe estar entre 0 y 6.
   - `year_of_life`: Año de vida al que le corresponde asistir. Es un valor numérico y es obligatorio.
   - `childAddress`: Dirección del menor. Es una cadena de texto con longitud mínima de 5 caracteres y es obligatorio.
   - `neighborhood`: Barrio o localidad del menor. Es una cadena de texto.
   - `cPopular`: Consejo popular al que pertenece. Es una cadena de texto y es obligatorio.
   - `municipality`: Municipio del menor. Es una cadena de texto y es obligatorio.
   - `province`: Provincia del menor. Es una cadena de texto.
   - `circulo`: Referencia a un documento en la colección "circulo" de la base de datos. Contiene solo la propiedad `_id` y `name`.
   - `matriculaDate`: Fecha de matrícula. Es una cadena de texto.
   - `latlng`: Coordenadas geográficas. Es un arreglo con un máximo de 2 elementos.
   - `parents`: Arreglo que contiene la información de los padres. Cada elemento del arreglo es un objeto con las siguientes propiedades:

     - `parentName`: Nombre del padre o madre. Es una cadena de texto.
     - `parentLastname`: Apellido del padre o madre. Es una cadena de texto.
     - `uniqueParent`: Indica si es un padre o madre único. Es un valor booleano y por defecto es falso.
     - `typeParent`: Tipo de parentesco. Debe ser una cadena de texto y puede ser "madre", "padre" o "tutor". Si no se proporciona, el valor por defecto es "madre".
     - `convivencia`: Indica si convive con el menor. Es un valor booleano y por defecto es verdadero.
     - `parentAddress`: Dirección del padre o madre. Es una cadena de texto.
     - `phoneNumber`: Número de teléfono del padre o madre. Es una cadena de texto.
     - `occupation`: Ocupación del padre o madre. Debe ser una cadena de texto y puede ser "trabajador", "jubilado", "asistenciado" o "estudiante". El valor por defecto es "trabajador".
     - `workName`: Nombre del lugar de trabajo del padre o madre. Es una cadena de texto.
     - `workAddress`: Dirección del lugar de trabajo del padre o madre. Es una cadena de texto.
     - `jobTitle`: Cargo del padre o madre en el lugar de trabajo. Es una cadena de texto.
     - `organismo`: Referencia a un documento en la colección "organismo" de la base de datos.
     - `salary`: Salario del padre o madre. Es un valor numérico.
     - `otherChildrenInCi`: Indica si el padre o madre tiene otros hijos en el Círculo Infantil. Es un valor booleano y por defecto es falso.
     - `numberOfOtherChildrenInCi`: Número de otros hijos  en el Círculo Infantil. Es un valor numérico y por defecto es 0.
     - `otherChildrenCenter`: Centro donde están matriculados los otros hijos del padre o madre. Es una cadena de texto.
     - `pregnant`: Indica si la madre está embarazada. Es un valor booleano y por defecto es falso.
     - `deaf`: Indica si la madre tiene alguna discapacidad auditiva. Es un valor booleano y por defecto es falso.

10. `createdBy`: Usuario que registró la solicitud. Es una cadena de texto.

## Métodos del Esquema

El esquema "Submision" tiene los siguientes métodos:

1. `preSaveFunctions()`: Método que se ejecuta antes de guardar la presentación. Llama a los métodos `calculateWeight()`, `Gender()` y `Age()` para realizar cálculos de edad y género y asignar valores automáticamente.

2. `calculateWeight()`: Método que calcula y asigna el peso de la planilla basándose en ciertos criterios definidos en el código.

3. `Gender()`: Método que determina el género del menor basándose en el número de carnet.

4. `Age()`: Método que calcula y asigna la edad del menor basándose en el número de carnet.

    

