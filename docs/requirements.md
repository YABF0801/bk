## Definición de entidades

-   **Usuario**: Usuario registrado en la plataforma, unicos 
        *todos los campos son obligatorios*.
    -   Nickname: Mínimo de 2 caracteres y un máximo 10 (Todos los caracteres serán válidos)
    -   Nombre: Mínimo de 2 caracteres y un máximo 20 (Todos los caracteres serán válidos)
    -   Apellidos: Mínimo de 4 y máximo de 50 (Todos los caracteres serán válidos)
    -   Cargo:  Mínimo de 4 caracteres y máximo de 50
        (Solo texto)
    -   Contraseña: Mínimo de 8 caracteres (Al menos una minúscula, mayúscula y un número)
    -   Role: Admin o User, solo 1 de 2, solo acepta esos 2

  **Organismo**      Orgaismo creados , unicos
        *todos los campos son obligatorios*.
     -   Nombre: Mínimo de 2 caracteres y un máximo 30 (Todos los caracteres serán válidos)
    -   Descripcion: Mínimo de 10 y máximo de 80  (Solo texto)
    -   Priorizado: booleano, por defecto false, si es true (valor + 1)
    

  **Circulo**
    - Nombre: Mínimo de 4 caracteres y un máximo 30 (Todos los caracteres serán válidos)
    - Capacidad Total: suma de capacidades
    - Capacidad 2: solo numero
    - Capacidad 3: solo numero
    - Capacidad 4: solo numero
    - Capacidad 5: solo numero
    - Capacidad 6: solo numero
    - Matricula 2: suma de contador de los circulos con ese nombre y año de vida en las planillas
    - Matricula 3: suma de contador de los circulos con ese nombre y año de vida en las planillas
    - Matricula 4: suma de contador de los circulos con ese nombre y año de vida en las planillas
    - Matricula 5: suma de contador de los circulos con ese nombre y año de vida en las planillas
    - Matricula 6: suma de contador de los circulos con ese nombre y año de vida en las planillas
    - *lat*: latitud sacada del mapa
    - *lon*: longitud sacada del mapa


    **Submision**: Nueva solicitud de matricula
    -   Finalidad: OS o OM solo puede ser 1 de 2, por defecto OM, solo acepta esos 2
    -   Valor: suma de valores de prioridades de esta y entidades inferiores, en numero con condicion
    -   Tipo: Nueva o Traslado, nueva por defecto, solo puede ser 1 de 2, solo acepta esos 2
        (valor + 36)
    -   Caso social: booleano, por defecto false (valor + 18) 
    -   *Numero*: REQ- numero de planilla asociado a la fecha, no puede ser el mismo con la misma fecha
    -   *Motivo*: REQ-, texto maximo 3 lineas, minimo 1
    -   *Niño*: incluye la entidad niño q a su vez incluye a padres 1 y 2 

        **Niño** 
        - *Nombre*: Mínimo de 2 caracteres y un máximo 20 (Todos los caracteres serán válidos)
        - *Apellidos*: Mínimo de 2 y máximo de 50 (Todos los caracteres serán válidos)
        - *Carnet*: 11 caracteres (solo numeros naturales)
        - Sexo: sacado del carnet, condicion si el numero es par o impar
        - Edad: sacado del carnet... ??
        - *Año de vida*: solo puede escoger entre 2 y 6
        - *Direccion*: Mínimo de 2 caracteres y un máximo 70 (Todos los caracteres serán válidos)
        - Localidad: Mínimo de 2 caracteres y un máximo 20 (Todos los caracteres serán válidos)
        - *Consejo Popular*: Escoger de la lista... ??? por defecto --seleccione--
        - Municipio: Escoger de la lista... ??? por defecto IJ
        - Provincia: Escoger de la lista... ??? por defecto IJ
        - *lat*: latitud sacada del mapa
        - *lon*: longitud sacada del mapa

        - *circulo*: sale de la bd entidad circulo, nombre del circulo asignado, por defecto null, si es OS escoger de la lista, si es OM = null y hide

        -PaRENT 1: incluye la entidad padres 1 
        -PaRENT 2: incluye la entidad padres 2

          **Parent-1**  
           - *Nombre*: Mínimo de 2 caracteres y un máximo 20 (Todos los caracteres serán válidos)
           - *Apellidos*: Mínimo de 2 y máximo de 50 (Todos los caracteres serán válidos)
           -Parentesco: MADRE/ PADRE/ TUTOR solo puede ser 1 de 3, por defecto  MADRE, solo acepta esos 3
           - Monoparental: booleano, por defecto false (valor + 3), si es true no mostrar a PARENT 2 y pasar directo a guardar.
           - Direccion: Mínimo de 2 caracteres y un máximo 70 (Todos los caracteres serán válidos)
           - Convive: booleano, por defecto false, si true, desactivar direccion imput y = a la del niño
           -*Telefono*: Mínimo de 8 y máximo de 15 (solo numeros) Poner simbolito de +53

           - Ocupacion: TRABAJADOR/ JUBILADO/ ASISTENCIADO solo puede ser 1 de 3, por defecto  TRABAJADOR, solo acepta esos 3

           -Organismo: sale de la bd entidad Organismo, escoger de la lista, por defecto --seleccione-- (si priorizado valor +)
           
           - Nombre Trabajo: Mínimo de 2 caracteres y un máximo 70 (Todos los caracteres serán válidos)
           - Direccion Trabajo: Mínimo de 2 caracteres y un máximo 70 (Todos los caracteres serán válidos)
           - Cargo: Mínimo de 4 y máximo de 50 (Solo texto)
           -Horario: Time Picker, 1 para entrada y 1 para salida
           - SalarioM: Mínimo de 4 y máximo de 15 (solo numeros) 

               MAYBE REMOVE
              -Otros niños en CI: booleano, por   defecto false, si true, activar cant y centro imput 
              -cant: numero, max 10
              -centro: sale de la bd entidad circulo, nombre del circulo asignado, por defecto null, si es true escoger de la lista

            - Embarazada: booleano, por defecto false (valor + 2)
            - Estudiante: booleano, por defecto false (valor + 2)
            - Hipoacusica: booleano, por defecto false (valor + 9)

         **Parent-2**  
           - *Nombre*: Mínimo de 2 caracteres y un máximo 20 (Todos los caracteres serán válidos)
           - *Apellidos*: Mínimo de 2 y máximo de 50 (Todos los caracteres serán válidos)
           -Parentesco: MADRE/ PADRE/ TUTOR solo puede ser 1 de 3, por defecto  PADRE, solo acepta esos 3
           - Direccion: Mínimo de 2 caracteres y un máximo 70 (Todos los caracteres serán válidos)
           - Convive: booleano, por defecto false, si true, desactivar direccion imput y = a la del niño
           -*Telefono*: Mínimo de 8 y máximo de 15 (solo numeros) Poner simbolito de +53

           - Ocupacion: TRABAJADOR/ JUBILADO/ ASISTENCIADO solo puede ser 1 de 3, por defecto  TRABAJADOR, solo acepta esos 3
           
           - Nombre Trabajo: Mínimo de 2 caracteres y un máximo 70 (Todos los caracteres serán válidos)
           - Direccion Trabajo: Mínimo de 2 caracteres y un máximo 70 (Todos los caracteres serán válidos)
           - Cargo: Mínimo de 4 y máximo de 50 (Solo texto)
           -Horario: Time Picker, 1 para entrada y 1 para salida
           - SalarioM: Mínimo de 4 y máximo de 15 (solo numeros) 
           
    si es asistenciado deshabilitar las cosas de trabajo


## Requisitos funcionales

-   El usuario podrá crearse desde un usuario admin, introduciendo los datos necesarios.
-   El nickname debe ser único por cada usuario.
-   El usuario podrá autenticarse ante la aplicación utilizando su nickname y contraseña.
-   Si la autenticación es válida, la aplicación le devolverá al usuario un identificador que le servirá para demostrar su identidad ante la aplicación .

-   El usuario admin podrá obtener todos los datos exceptuando las contraseñas y acceder a todo, utilizando su identificador.
-   El usuario admin podrá actualizar todos los datos que se guardan, será necesario el identificador.
-   El usuario podrá eliminar datos de la plataforma, será necesario el identificador y la contraseña actual.

-   el usuario user solo accedera al dashboard y a los listados general y propuestas, organismos y circulos a modo lectura


