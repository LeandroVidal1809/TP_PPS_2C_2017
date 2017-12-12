define({ "api": [
  {
    "type": "post",
    "url": "/Asistencia/",
    "title": "Tomar Asistencia",
    "group": "Asistencia",
    "description": "<p>según los filtros utilizados trae lista de alumnos</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Materia",
            "description": "<p>Filtro de Materia para crear la lista</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Aula",
            "description": "<p>Filtro de Aula para crear la lista</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Materia\": \"PPS\",\n  \"Aula\": \"201\",\n   \n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "Administrativo"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Lista",
            "description": "<p>de alumnos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"Nombre\": \"Leandro Vidal\"\n  \"id\": 2,\n  \"Nombre\": \"Ignacio Perez\"\n  \"id\": 3,\n  \"Nombre\": \"Juan Lopez\"\n  \"id\": 4,\n  \"Nombre\": \"Santiago Rodriguez\"\n  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Asistencia",
    "name": "PostAsistencia"
  },
  {
    "type": "post",
    "url": "/ConsultaAsistencia/",
    "title": "Consulta de la asistencia",
    "group": "Asistencia",
    "description": "<p>Según los filtros nos devuelve la lista tomada segun fecha, materia y aula</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "Fecha",
            "description": "<p>Fecha de la foto tomada</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Aula",
            "description": "<p>Aula donde la foto fue tomada</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Materia",
            "description": "<p>Materia donde la foto fue tomada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Fecha\": \"10/12/2017\",\n  \"Aula\": \"201\",\n  \"Materia\": \"PPS\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "Administrativo"
      },
      {
        "name": "Profesor"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Listado",
            "description": "<p>de Alumnos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"id\": 1,\n  \"Nombre\": \"Leandro Vidal\",\n  \"Estado\": \"Presente\"\n  \"id\": 2,\n  \"Nombre\": \"Ignacio Perez\",\n  \"Estado\": \"Ausente\"\n  \"id\": 3,\n  \"Nombre\": \"Juan Lopez\",\n  \"Estado\": \"Presente\"\n  \"id\": 4,\n  \"Nombre\": \"Santiago Rodriguez\",\n  \"Estado\": \"Ausente\"    \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Asistencia",
    "name": "PostConsultaasistencia"
  },
  {
    "type": "post",
    "url": "/EnviaAsistencia/",
    "title": "Enviar Asistencia",
    "group": "Asistencia",
    "description": "<p>sobre la lista que fue filtrada, se toma presentismo y se envía</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "Listado",
            "description": "<p>Listado de alumnos y su asistencia</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"id\": 1,\n  \"Nombre\": \"Leandro Vidal\",\n  \"Estado\": \"Presente\"\n  \"id\": 2,\n  \"Nombre\": \"Ignacio Perez\",\n  \"Estado\": \"Ausente\"\n  \"id\": 3,\n  \"Nombre\": \"Juan Lopez\",\n  \"Estado\": \"Presente\"\n  \"id\": 4,\n  \"Nombre\": \"Santiago Rodriguez\",\n  \"Estado\": \"Ausente\"      \n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "Administrativo"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Mensaje",
            "description": "<p>de fin de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n      \"Mensaje\": \"El proceso finalizo exitosamente.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Asistencia",
    "name": "PostEnviaasistencia"
  },
  {
    "type": "post",
    "url": "/FotoAsistencia/",
    "title": "Tomar foto de la asistencia",
    "group": "Asistencia",
    "description": "<p>sobre la lista que fue filtrada,permite tomar una foto y asociarla</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "UrlPhoto",
            "description": "<p>Url donde se almacenara la foto</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "Fecha",
            "description": "<p>Fecha de la foto tomada</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Aula",
            "description": "<p>Aula donde la foto fue tomada</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Materia",
            "description": "<p>Materia donde la foto fue tomada</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"UrlPhoto\": \"https://firebasestorage.googleapis.com/v0/b/tpfinalpps-68471.appspot.com/o/Aulas%2F7f2709d7-4845-45a9-a762?alt=media&token=bae5490d-a66d-4301-9b90-a3229759a565\",\n  \"Fecha\": \"10/12/2017\",\n  \"Aula\": \"201\",\n  \"Materia\": \"PPS\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "Administrativo"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Mensaje",
            "description": "<p>de fin de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n      \"Mensaje\": \"El proceso finalizo exitosamente.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Asistencia",
    "name": "PostFotoasistencia"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/apidoc/main.js",
    "group": "C__xampp_htdocs_FinalPPSDocumentation_task_api_public_apidoc_main_js",
    "groupTitle": "C__xampp_htdocs_FinalPPSDocumentation_task_api_public_apidoc_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/Alta/",
    "title": "",
    "group": "Encuestas",
    "description": "<p>Generar encuesta</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Pregunta",
            "description": "<p>Pregunta de la encuesta</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "TipoRespuesta",
            "description": "<p>Tipo de la respuesta (Menu de Seleccion - Botones Opcion)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Respuesta1",
            "description": "<p>Primer respuesta a la pregunta</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Respuesta2",
            "description": "<p>Segunda respuesta a la pregunta</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Respuesta3",
            "description": "<p>Segunda respuesta a la pregunta</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "Duraci",
            "description": "<p>ón   Duración en Minutos de la encuesta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Pregunta\": \"Parcial Oral o Escrito?\",\n  \"TipoRespuesta\": \"Menu Seleccion\",\n  \"Respuesta1\": \"Oral\",\n  \"Respuesta2\": \"Escrito\",\n  \"Respuesta3\": \"Me es indistinto\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "Profesor"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Mensaje",
            "description": "<p>de finalización de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"MateriaActual\": \"PPS\",\n  \"Aula\": \"201\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Encuestas",
    "name": "PostAlta"
  },
  {
    "type": "put",
    "url": "/Modificar/",
    "title": "",
    "group": "Encuestas",
    "description": "<p>Modificar encuesta</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Pregunta",
            "description": "<p>Pregunta de la encuesta</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "TipoRespuesta",
            "description": "<p>Tipo de la respuesta (Menu de Seleccion - Botones Opcion)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Respuesta1",
            "description": "<p>Primer respuesta a la pregunta</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Respuesta2",
            "description": "<p>Segunda respuesta a la pregunta</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Respuesta3",
            "description": "<p>Segunda respuesta a la pregunta</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "Duraci",
            "description": "<p>ón   Duración en Minutos de la encuesta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Pregunta\": \"Parcial Oral o Escrito?\",\n  \"TipoRespuesta\": \"Menu Seleccion\",\n  \"Respuesta1\": \"Oral\",\n  \"Respuesta2\": \"Escrito\",\n  \"Respuesta3\": \"Me es indistinto\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "Profesor"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Mensaje",
            "description": "<p>de finalización de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"MateriaActual\": \"PPS\",\n  \"Aula\": \"201\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Encuestas",
    "name": "PutModificar"
  },
  {
    "type": "get",
    "url": "/ImportarCsv/:Path",
    "title": "Importar planilla csv",
    "group": "Importar",
    "description": "<p>pasandole como parámetro la ruta del archivo, nos devolvera todos los datos que contiene</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Path",
            "description": "<p>Ruta donde esta el archivo a importar . El nombre del archivo debera seguir el siguiente formato &quot;Materia-Curso-CuatrimestreAño-Aula&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Path\": \"assets/archivos/PPS-4A-2C2017-200.csv\",\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "Administrativo"
      },
      {
        "name": "Administrador"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Listado",
            "description": "<p>de alumnos importados</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \n  \"Legajo\": \"100215\",\n  \"Nombre\": \"Vidal,Leandro\",\n  \"Horario\":\"Sabado 8:30 12:30\"\n  \n  \"Legajo\": \"103215\",\n  \"Nombre\": \"Bana,Nalana\",\n  \"Horario\":\"Sabado 8:30 12:30\"\n      \n  \"Legajo\": \"101115\",\n  \"Nombre\": \"Sorichetti,Florencia\",\n  \"Horario\":\"Sabado 8:30 12:30\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Importar",
    "name": "GetImportarcsvPath"
  },
  {
    "type": "post",
    "url": "/GuardarLista/",
    "title": "Guarda lista de alumnos importada",
    "group": "Importar",
    "description": "<p>Guarda</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "Listado",
            "description": "<p>de alumnos importados</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n \"Legajo\": \"100215\",\n  \"Nombre\": \"Vidal,Leandro\",\n  \"Horario\":\"Sabado 8:30 12:30\"\n  \n  \"Legajo\": \"103215\",\n  \"Nombre\": \"Bana,Nalana\",\n  \"Horario\":\"Sabado 8:30 12:30\"\n      \n  \"Legajo\": \"101115\",\n  \"Nombre\": \"Sorichetti,Florencia\",\n  \"Horario\":\"Sabado 8:30 12:30\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "Administrativo"
      },
      {
        "name": "Administrador"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Mensaje",
            "description": "<p>de proceso finalizado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"Mensaje\":\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Importar",
    "name": "PostGuardarlista"
  },
  {
    "type": "get",
    "url": "/CargarScann/:datoScan",
    "title": "",
    "group": "QR",
    "description": "<p>mediante el codigo que nos devuelve un QR , traemos los datos que proporciona dicho codigo</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "datoScan",
            "description": "<p>dato que nos devuelve la lectura de un codigo QR</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"datoScan\": \"54ew54s5633wfrkjkasw8852rrraa\",\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "Alumno"
      },
      {
        "name": "Administrador"
      },
      {
        "name": "Profesor"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Objeto",
            "description": "<p>especifico del codigo enviado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"MateriaActual\": \"PPS\",\n  \"Aula\": \"201\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "QR",
    "name": "GetCargarscannDatoscan"
  },
  {
    "type": "post",
    "url": "/inicio/",
    "title": "Inicio de sesión",
    "group": "Sesion",
    "description": "<p>permite a los usuarios ingresar al sistema</p>",
    "permission": [
      {
        "name": "Todos"
      }
    ],
    "name": "GetSesi_n",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Usuario",
            "description": "<p>Usuario el cual ya ha registrado previamente</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Clave",
            "description": "<p>Clave alfanumerica &gt; 6</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Usuario\": \"Leandro\",\n  \"Clave\": \"Lisandro123\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Id",
            "description": "<p>Identificatorio del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Nombre",
            "description": "<p>Nombre del usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Tipo",
            "description": "<p>tipo de perfil que contiene el usuario</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Url",
            "description": "<p>Foto Url de la foto que contiene el usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"Nombre\": \"Leandro Vidal\",\n  \"Tipo\": \"Administrador\",\n  \"Tipo\": \"/assets/img/FotoPerfil1.jpg\"\n  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error\nHTTP/1.1 401 Not Authenticated\n{\n \"error\": \"NoAccessRight\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Sesion"
  }
] });
