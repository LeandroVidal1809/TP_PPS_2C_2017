var express = require('express');  
var app = express();

app.use(express.static('public'));

/**
 * @api {post} / Valida ingreso de Sesión
 * @apiGroup Sesion
 * @apiParam {String} Usuario Usuario el cual ya ha registrado previamente
 * @apiParam {String} Clave   Clave alfanumerica > 6
 *  * @apiParamExample {json} Input
 *    {
 *      "Usuario": "Leandro"
 *      "Clave": "Lisandro123"
 *    }
 * 
 * @apiSuccess {Number} Id Identificatorio del usuario 
 * @apiSuccess {String} Nombre Nombre del usuario
 * @apiSuccess {String} Tipo tipo de perfil que contiene el usuario
 
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "Nombre": "Leandro Vidal",
 *      "Tipo": "Administrador",
 *      
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
app.post('/Login', function(req, res) {  
    // business logic for create a Login...
});


/**
 * @api {post} /R Registrar Usuario
 * @apiGroup Sesion
 * @apiParam {String} Usuario Usuario el cual va a usar para ingresar
 * @apiParam {String} Clave   clave alfanumerica > 6 caracteres
 * @apiParam {String} Email   Email Valido cuenta de Firebase
 * @apiParam {String} Nombre  Nombre y Apellido de la persona  
 *  * @apiParamExample {json} Input
 *    {
 *      "Usuario": "Leandro",
 *      "Clave": "Lisandro123",
 *       "Email":"Leandrovidal92@gmail.com"
 *       "Nombre":"Leandro Vida"
 *    }
 * 
 * @apiSuccess {String} Mensaje Mensaje que devolveremos al usuario
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "Mensaje": El usuario fue agregado exitosamente
 *      
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
app.post('/Login', function(req, res) {  
    // business logic for create a Login...
});


app.listen(3000, function() {  
    console.log('Login api up and running...');
});