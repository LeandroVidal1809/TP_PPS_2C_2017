var express = require('express');  
var app = express();

app.use(express.static('public'));
//SESION GRUPO=======================================================

/**
  @api {post} /inicio/ Inicio de sesión
 * @apiGroup Sesion
 * @apiDescription permite a los usuarios ingresar al sistema
 * @apiPermission Todos
 * @apiName GetSesión
 * @apiParam {String} Usuario Usuario el cual ya ha registrado previamente
 * @apiParam {String} Clave   Clave alfanumerica > 6
 *  * @apiParamExample {json} Input
 *    {
 *      "Usuario": "Leandro",
 *      "Clave": "Lisandro123"
 *    }
 * 
 * @apiSuccess {Number} Id Identificatorio del usuario 
 * @apiSuccess {String} Nombre Nombre del usuario
 * @apiSuccess {String} Tipo tipo de perfil que contiene el usuario
 * @apiSuccess {String} Url Foto Url de la foto que contiene el usuario
 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "Nombre": "Leandro Vidal",
 *      "Tipo": "Administrador",
 *      "PhotoUrl": "/assets/img/FotoPerfil1.jpg"
 *      
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 401 Not Authenticated
 *    {
 *     "error": "Usuario o Clave erroneos"
 *    }
 */
app.post('/Login', function(req, res) {  
    // business logic for create a Login...
});

//SESION TOMAR ASISTENCIA=======================================================

/**
 * @api {post} /Asistencia/ Tomar Asistencia
 * @apiGroup Asistencia
 * @apiDescription según los filtros utilizados trae lista de alumnos 
 * @apiParam {String} Materia Filtro de Materia para crear la lista
 * @apiParam {String} Aula   Filtro de Aula para crear la lista
 * @apiPermission Administrativo
 *  * @apiParamExample {json} Input
 *    {
 *      "Materia": "PPS",
 *      "Aula": "201",
 *       
 *    }
 * 
 * @apiSuccess {Object} Lista de alumnos
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "Nombre": "Leandro Vidal"
 *      "id": 2,
 *      "Nombre": "Ignacio Perez"
 *      "id": 3,
 *      "Nombre": "Juan Lopez"
 *      "id": 4,
 *      "Nombre": "Santiago Rodriguez"
 *      
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
app.post('/SetListaMateria', function(req, res) {  
    // business logic for create a Login...
});

/**
 * @api {post} /EnviaAsistencia/ Enviar Asistencia
 * @apiGroup Asistencia
 * @apiDescription sobre la lista que fue filtrada, se toma presentismo y se envía  
 * @apiParam {Object[]} Listado Listado de alumnos y su asistencia
 * @apiPermission Administrativo
 *  * @apiParamExample {json} Input
 *    {
*      "id": 1,
 *      "Nombre": "Leandro Vidal",
 *      "Estado": "Presente"
 *      "id": 2,
 *      "Nombre": "Ignacio Perez",
 *      "Estado": "Ausente"
 *      "id": 3,
 *      "Nombre": "Juan Lopez",
 *      "Estado": "Presente"
 *      "id": 4,
 *      "Nombre": "Santiago Rodriguez",
 *      "Estado": "Ausente"      
 *    }
 * 
 * @apiSuccess {string} Mensaje de fin de proceso
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *          "Mensaje": "El proceso finalizo exitosamente."
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
app.post('/AgregarLista', function(req, res) {  
    // business logic for create a Login...
});

/**
 * @api {post} /FotoAsistencia/ Tomar foto de la asistencia
 * @apiGroup Asistencia
 * @apiDescription sobre la lista que fue filtrada,permite tomar una foto y asociarla 
 * @apiParam {String} UrlPhoto Url donde se almacenara la foto
 * @apiParam {Date} Fecha   Fecha de la foto tomada
 * @apiParam {String} Aula   Aula donde la foto fue tomada 
 * @apiParam {String} Materia   Materia donde la foto fue tomada 
 * @apiPermission Administrativo
 *  * @apiParamExample {json} Input
 *    {
 *      "UrlPhoto": "https://firebasestorage.googleapis.com/v0/b/tpfinalpps-68471.appspot.com/o/Aulas%2F7f2709d7-4845-45a9-a762?alt=media&token=bae5490d-a66d-4301-9b90-a3229759a565",
 *      "Fecha": "10/12/2017",
 *      "Aula": "201",
 *      "Materia": "PPS"
 *    }
 * 
 * @apiSuccess {string} Mensaje de fin de proceso
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *          "Mensaje": "El proceso finalizo exitosamente."
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
app.post('/AgregarLista', function(req, res) {  
    // business logic for create a Login...
});

/**
 * @api {post} /ConsultaAsistencia/ Consulta de la asistencia
 * @apiGroup Asistencia
 * @apiDescription Según los filtros nos devuelve la lista tomada segun fecha, materia y aula
 * @apiParam {Date} Fecha   Fecha de la foto tomada
 * @apiParam {String} Aula   Aula donde la foto fue tomada 
 * @apiParam {String} Materia   Materia donde la foto fue tomada 
 * @apiPermission Administrativo 
 * @apiPermission Profesor
 *  * @apiParamExample {json} Input
 *    {
 *      "Fecha": "10/12/2017",
 *      "Aula": "201",
 *      "Materia": "PPS"
 *    }
 * 
 * @apiSuccess {Object[]} Listado de Alumnos
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       "id": 1,
 *      "Nombre": "Leandro Vidal",
 *      "Estado": "Presente"
 *      "id": 2,
 *      "Nombre": "Ignacio Perez",
 *      "Estado": "Ausente"
 *      "id": 3,
 *      "Nombre": "Juan Lopez",
 *      "Estado": "Presente"
 *      "id": 4,
 *      "Nombre": "Santiago Rodriguez",
 *      "Estado": "Ausente"    
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
app.post('/AgregarLista', function(req, res) {  
    // business logic for create a Login...
});



//IMPORTAR EXCEL=======================================================
/**
 * @api {get} /ImportarCsv/:Path Importar planilla csv
 * @apiGroup Importar
 * @apiDescription pasandole como parámetro la ruta del archivo, nos devolvera todos los datos que contiene 
 *  @apiParam {String} Path   Ruta donde esta el archivo a importar . El nombre del archivo debera seguir el siguiente formato "Materia-Curso-CuatrimestreAño-Aula"  
 * @apiPermission Administrativo 
 * @apiPermission Administrador
 *  * @apiParamExample {json} Input
 *    {
 *      "Path": "assets/archivos/PPS-4A-2C2017-200.csv",
 *    }
 * 
 * @apiSuccess {Object[]} Listado de alumnos importados
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      
 *      "Legajo": "100215",
 *      "Nombre": "Vidal,Leandro",
 *      "Horario":"Sabado 8:30 12:30"
 *      
 *      "Legajo": "103215",
 *      "Nombre": "Bana,Nalana",
 *      "Horario":"Sabado 8:30 12:30"
 *          
 *      "Legajo": "101115",
 *      "Nombre": "Sorichetti,Florencia",
 *      "Horario":"Sabado 8:30 12:30"
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/readCsvData', function(req, res) {  
    // business logic for create a Login...
});

/**
 * @api {post} /GuardarLista/ Guarda lista de alumnos importada
 * @apiGroup Importar
 * @apiDescription Guarda  
 * @apiParam  {Object[]} Listado de alumnos importados 
 * @apiPermission Administrativo 
 * @apiPermission Administrador
 *  * @apiParamExample {json} Input
 *    {
 *     "Legajo": "100215",
 *      "Nombre": "Vidal,Leandro",
 *      "Horario":"Sabado 8:30 12:30"
 *      
 *      "Legajo": "103215",
 *      "Nombre": "Bana,Nalana",
 *      "Horario":"Sabado 8:30 12:30"
 *          
 *      "Legajo": "101115",
 *      "Nombre": "Sorichetti,Florencia",
 *      "Horario":"Sabado 8:30 12:30"
 *    }
 * 
 * @apiSuccess {String} Mensaje de proceso finalizado
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "Mensaje":
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
app.post('/guardarLista', function(req, res) {  
    // business logic for create a Login...
});

//Lector QR=======================================================
/**
 * @api {get} /CargarScann/:datoScan Carga dato scanner 
 * @apiGroup QR
 * @apiDescription mediante el codigo que nos devuelve un QR , traemos los datos que proporciona dicho codigo 
 * @apiParam {String} datoScan   dato que nos devuelve la lectura de un codigo QR   
 * @apiPermission Alumno 
 * @apiPermission Administrador
 * @apiPermission Profesor
 *  * @apiParamExample {json} Input
 *    {
 *      "datoScan": "54ew54s5633wfrkjkasw8852rrraa",
 *    }
 * 
 * @apiSuccess {Object} Objeto especifico del codigo enviado
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "MateriaActual": "PPS",
 *      "Aula": "201"
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/CargaScan', function(req, res) {  
    // business logic for create a Login...
});


//Crear Encuestas=======================================================
/**
 * @api {post} /Alta/ Alta Encuesta
 * @apiGroup Encuestas
 * @apiDescription Generar encuesta 
 * @apiParam {String} Pregunta   Pregunta de la encuesta   
 * @apiParam {String} TipoRespuesta   Tipo de la respuesta (Menu de Seleccion - Botones Opcion)   
 * @apiParam {String} Respuesta1   Primer respuesta a la pregunta
 * @apiParam {String} Respuesta2   Segunda respuesta a la pregunta   
 * @apiParam {String} Respuesta3   Segunda respuesta a la pregunta
 * @apiParam {Date} Duración   Duración en Minutos de la encuesta     
 * @apiPermission Profesor
 *  * @apiParamExample {json} Input
 *    {
 *      "Pregunta": "Parcial Oral o Escrito?",
 *      "TipoRespuesta": "Menu Seleccion",
 *      "Respuesta1": "Oral",
 *      "Respuesta2": "Escrito",
 *      "Respuesta3": "Me es indistinto"
 *    }
 * 
 * @apiSuccess {String} Mensaje Mensaje de finalización de proceso
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "Mensaje": "Proceso de grabación finalizado"
 *      
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
app.post('/AltaEncuesta', function(req, res) {  
    // business logic for create a Login...
});

/**
 * @api {put} /Modificar/ Modificar encuesta
 * @apiGroup Encuestas
 * @apiDescription Modificar encuesta 
 * @apiParam {String} Pregunta   Pregunta de la encuesta   
 * @apiParam {String} TipoRespuesta   Tipo de la respuesta (Menu de Seleccion - Botones Opcion)   
 * @apiParam {String} Respuesta1   Primer respuesta a la pregunta
 * @apiParam {String} Respuesta2   Segunda respuesta a la pregunta   
 * @apiParam {String} Respuesta3   Segunda respuesta a la pregunta
 * @apiParam {Date} Duración  Duración en Minutos de la encuesta     
 * @apiPermission Profesor
 *  * @apiParamExample {json} Input
 *    {
 *      "Pregunta": "Parcial Oral o Escrito?",
 *      "TipoRespuesta": "Menu Seleccion",
 *      "Respuesta1": "Oral",
 *      "Respuesta2": "Escrito",
 *      "Respuesta3": "Me es indistinto"
 *      "Duracion": "00:45"
 *    }
 * 
 * @apiSuccess {String} Mensaje Mensaje de finalización de proceso
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
* "Mensaje": "Proceso de modificación finalizado"
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
app.put('/ModificaEncuesta', function(req, res) {  
    // business logic for create a Login...
});

/**
 * @api {Delete} /Eliminar/  Eliminar encuesta
 * @apiGroup Encuestas
 * @apiDescription Eliminar  encuesta 
 * @apiParam {integer} Id   Id de la pregunta a eliminar
 * @apiPermission Profesor
 *  * @apiParamExample {json} Input
 *    {
 *      "Id": 22
 *    }
 * 
 * @apiSuccess {String} Mensaje Mensaje de finalización de proceso
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "Mensaje": "Proceso de Eliminación finalizado"
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
app.delete('/EliminaEncuesta', function(req, res) {  
    // business logic for create a Login...
});



/**
 * @api {get} /Traer/ Traer Encuesta
 * @apiGroup Encuestas
 * @apiDescription Traer  encuesta vigente
 * @apiPermission Profesor
 * @apiSuccess {Object} Encuests
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "Id": "Proceso de Eliminación finalizado"
 *      "Pregunta": "Parcial Oral o Escrito?",
 *      "TipoRespuesta": "Menu Seleccion",
 *      "Respuesta1": "Oral",
 *      "Respuesta2": "Escrito",
 *      "Respuesta3": "Me es indistinto"
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/TraeEncuesta', function(req, res) {  
    // business logic for create a Login...
});





app.listen(3000, function() {  
    console.log('Login api up and running...');
});