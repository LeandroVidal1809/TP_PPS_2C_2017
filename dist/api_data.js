define({ "api": [
  {
    "type": "Delete",
    "url": "/Eliminar/",
    "title": "Eliminar alumno",
    "group": "Alumnos",
    "description": "<p>Eliminar alumno.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "Legajo",
            "description": "<p>Legajo del alumno a eliminar</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Legajo\": \"202123\"\n}",
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
            "type": "String",
            "optional": false,
            "field": "Mensaje",
            "description": "<p>Mensaje de finalización de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"Mensaje\": \"Proceso de Eliminación finalizado\"\n}",
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
    "groupTitle": "Alumnos",
    "name": "DeleteEliminar"
  },
  {
    "type": "post",
    "url": "/Alta/",
    "title": "Alta Alumno",
    "group": "Alumnos",
    "description": "<p>Registrar un alumno.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Legajo",
            "description": "<p>Legajo del alumno</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Nombre",
            "description": "<p>Nombre del alumno</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Legajo\": \"103578\",\n  \"Nombre\": \"Vidal,Federico\"\n}",
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
            "type": "String",
            "optional": false,
            "field": "Mensaje",
            "description": "<p>Mensaje de finalización de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"Mensaje\": \"Proceso de grabación finalizado\"\n  \n}",
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
    "groupTitle": "Alumnos",
    "name": "PostAlta"
  },
  {
    "type": "post",
    "url": "/AltaLista/",
    "title": "Alta lista alumno",
    "group": "Alumnos",
    "description": "<p>Registrar una lista de alumnos.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object[]",
            "optional": false,
            "field": "Lista",
            "description": "<p>Lista de alumnos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Legajo\": \"103578\",\n  \"Nombre\": \"Ferreiro,Susana\"\n\n  \"Legajo\": \"103128\",\n  \"Nombre\": \"Lopez,Lucas\"\n\n  \"Legajo\": \"101238\",\n  \"Nombre\": \"Flores,Lucia\"\n\n  \"Legajo\": \"111428\",\n  \"Nombre\": \"Baez,Carolina\"\n\n }",
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
            "type": "String",
            "optional": false,
            "field": "Mensaje",
            "description": "<p>Mensaje de finalización de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"Mensaje\": \"Proceso de grabación de listado finalizado\"\n  \n}",
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
    "groupTitle": "Alumnos",
    "name": "PostAltalista"
  },
  {
    "type": "put",
    "url": "/Modificar/",
    "title": "Modificar alumno",
    "group": "Alumnos",
    "description": "<p>Modificar un alumno.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Legajo",
            "description": "<p>Legajo del alumno (no puede ser modificado)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Nombre",
            "description": "<p>Nombre del alumno</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Legajo\": \"103578\",\n  \"Nombre\": \"Vidal,Fabian\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
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
            "description": "<p>Mensaje de finalización de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n   {\n\"Mensaje\": \"Proceso de modificación finalizado\"\n   }",
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
    "groupTitle": "Alumnos",
    "name": "PutModificar"
  },
  {
    "type": "post",
    "url": "/Asistencia/",
    "title": "Tomar Asistencia",
    "group": "Asistencia",
    "description": "<p>Según los filtros utilizados trae lista de alumnos.</p>",
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
    "description": "<p>Según los filtros nos devuelve la lista tomada segun fecha, materia y aula.</p>",
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
    "description": "<p>Sobre la lista que fue filtrada, se toma presentismo y se envía.</p>",
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
    "description": "<p>Sobre la lista que fue filtrada,permite tomar una foto y asociarla.</p>",
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
    "url": "/Excel/",
    "title": "Descarga archivos en formato excel",
    "group": "Descargas",
    "description": "<p>Descarga archivos en formato excel</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object[]",
            "optional": false,
            "field": "Lista",
            "description": "<p>Lista de alumnos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Legajo\": \"103578\",\n  \"Nombre\": \"Ferreiro,Susana\"\n\n  \"Legajo\": \"103128\",\n  \"Nombre\": \"Lopez,Lucas\"\n\n  \"Legajo\": \"101238\",\n  \"Nombre\": \"Flores,Lucia\"\n\n  \"Legajo\": \"111428\",\n  \"Nombre\": \"Baez,Carolina\"\n\n }",
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
            "type": "String",
            "optional": false,
            "field": "Mensaje",
            "description": "<p>Mensaje de finalización de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"Mensaje\": \"Proceso de Descarga de listado Excel finalizado\"\n  \n}",
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
    "groupTitle": "Descargas",
    "name": "PostExcel"
  },
  {
    "type": "post",
    "url": "/PDF/",
    "title": "Descarga archivos en formato PDF",
    "group": "Descargas",
    "description": "<p>Descarga archivos en formato PDF</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object[]",
            "optional": false,
            "field": "Lista",
            "description": "<p>Lista de alumnos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Legajo\": \"103578\",\n  \"Nombre\": \"Ferreiro,Susana\"\n\n  \"Legajo\": \"103128\",\n  \"Nombre\": \"Lopez,Lucas\"\n\n  \"Legajo\": \"101238\",\n  \"Nombre\": \"Flores,Lucia\"\n\n  \"Legajo\": \"111428\",\n  \"Nombre\": \"Baez,Carolina\"\n\n }",
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
            "type": "String",
            "optional": false,
            "field": "Mensaje",
            "description": "<p>Mensaje de finalización de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"Mensaje\": \"Proceso de Descarga de listado PDF finalizado\"\n  \n}",
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
    "groupTitle": "Descargas",
    "name": "PostPdf"
  },
  {
    "type": "post",
    "url": "/Zip/",
    "title": "Descarga archivos en formato comprimidos",
    "group": "Descargas",
    "description": "<p>Descarga archivos en formato comprimido</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object[]",
            "optional": false,
            "field": "Lista",
            "description": "<p>Lista de alumnos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Legajo\": \"103578\",\n  \"Nombre\": \"Ferreiro,Susana\"\n\n  \"Legajo\": \"103128\",\n  \"Nombre\": \"Lopez,Lucas\"\n\n  \"Legajo\": \"101238\",\n  \"Nombre\": \"Flores,Lucia\"\n\n  \"Legajo\": \"111428\",\n  \"Nombre\": \"Baez,Carolina\"\n\n }",
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
            "type": "String",
            "optional": false,
            "field": "Mensaje",
            "description": "<p>Mensaje de finalización de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"Mensaje\": \"Proceso de Descarga de listado comprimido finalizado\"\n  \n}",
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
    "groupTitle": "Descargas",
    "name": "PostZip"
  },
  {
    "type": "Delete",
    "url": "/Eliminar/",
    "title": "Eliminar encuesta",
    "group": "Encuestas",
    "description": "<p>Eliminar encuesta.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "Id",
            "description": "<p>Id de la pregunta a eliminar</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Id\": 22\n}",
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
            "description": "<p>Mensaje de finalización de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"Mensaje\": \"Proceso de Eliminación finalizado\"\n}",
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
    "name": "DeleteEliminar"
  },
  {
    "type": "get",
    "url": "/Traer/",
    "title": "Traer Encuesta",
    "group": "Encuestas",
    "description": "<p>Traer encuesta vigente.</p>",
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
            "type": "Object",
            "optional": false,
            "field": "Encuests",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"Id\": \"1234\"\n  \"Pregunta\": \"Parcial Oral o Escrito?\",\n  \"TipoRespuesta\": \"Menu Seleccion\",\n  \"Respuesta1\": \"Oral\",\n  \"Respuesta2\": \"Escrito\",\n  \"Respuesta3\": \"Me es indistinto\"\n  \"Duracion\": \"00:15\"\n}",
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
    "name": "GetTraer"
  },
  {
    "type": "post",
    "url": "/Alta/",
    "title": "Alta Encuesta",
    "group": "Encuestas",
    "description": "<p>Generar encuesta.</p>",
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
          "content": "{\n  \"Pregunta\": \"Parcial Oral o Escrito?\",\n  \"TipoRespuesta\": \"Menu Seleccion\",\n  \"Respuesta1\": \"Oral\",\n  \"Respuesta2\": \"Escrito\",\n  \"Respuesta3\": \"Me es indistinto\",\n  \"Duracion\": \"00:30\"\n}",
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
            "description": "<p>Mensaje de finalización de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"Mensaje\": \"Proceso de grabación finalizado\"\n  \n}",
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
    "title": "Modificar encuesta",
    "group": "Encuestas",
    "description": "<p>Modificar encuesta.</p>",
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
            "description": "<p>ón  Duración en Minutos de la encuesta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Pregunta\": \"Parcial Oral o Escrito?\",\n  \"TipoRespuesta\": \"Menu Seleccion\",\n  \"Respuesta1\": \"Oral\",\n  \"Respuesta2\": \"Escrito\",\n  \"Respuesta3\": \"Me es indistinto\"\n  \"Duracion\": \"00:45\"\n}",
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
            "description": "<p>Mensaje de finalización de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"Mensaje\": \"Proceso de modificación finalizado\"\n}",
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
    "description": "<p>Enviando como parámetro la ruta del archivo, nos devolvera todos los datos que contiene.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Path",
            "description": "<p>Ruta donde esta el archivo a importar . El nombre del archivo deberá seguir el siguiente formato: &quot;Materia-Curso-CuatrimestreAño-Aula&quot;.</p>"
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
    "description": "<p>Guarda lista de alumnos importada.</p>",
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
    "title": "Carga dato scanner",
    "group": "QR",
    "description": "<p>Mediante el código que nos devuelve un QR, traemos los datos que proporciona dicho código.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "datoScan",
            "description": "<p>Dato que nos devuelve la lectura de un codigo QR</p>"
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
    "description": "<p>permite a los usuarios ingresar al sistema.</p>",
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
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"Nombre\": \"Leandro Vidal\",\n  \"Tipo\": \"Administrador\",\n  \"PhotoUrl\": \"/assets/img/FotoPerfil1.jpg\"\n  \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 401 Not Authenticated\n{\n \"error\": \"Usuario o Clave erroneos\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./index.js",
    "groupTitle": "Sesion"
  },
  {
    "type": "post",
    "url": "/Alta/",
    "title": "Alta Usuario",
    "group": "Usuario",
    "description": "<p>Alta de usuarios para ingresar al sistema, pueden ser tipo Profesor o Administrativo.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Nombre",
            "description": "<p>Nombre del Usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>Email para registrar al usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Clave",
            "description": "<p>Clave alfanumerica &gt; 6 caracteres</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Tipo",
            "description": "<p>Puede ser del tipo Profesor o Aldministrativo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Nombre\": \"Juan Santoro\",\n  \"Email\": \"Juan@gmail.com\",\n  \"Clave\": \"123456\",\n  \"Tipo\": \"Profesor\",\n \n}",
          "type": "json"
        }
      ]
    },
    "permission": [
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
            "description": "<p>Mensaje de finalización de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"Mensaje\": \"Proceso de grabación finalizado\"\n  \n}",
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
    "groupTitle": "Usuario",
    "name": "PostAlta"
  },
  {
    "type": "post",
    "url": "/AltaLista/",
    "title": "Alta lista de usuarios",
    "group": "Usuario",
    "description": "<p>Alta de una lista de usuarios para ingresar al sistema, pueden ser tipo Profesor o Administrativo.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "Lista",
            "description": "<p>de Usuarios   Lista de usuario a dar de alta</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Nombre\": \"Juan Santoro\",\n  \"Email\": \"Juan@gmail.com\",\n  \"Clave\": \"123456\",\n  \"Tipo\": \"Profesor\",\n\n  \"Nombre\": \"Santiago Pereyra\",\n  \"Email\": \"Sanso@gmail.com\",\n  \"Clave\": \"123456\",\n  \"Tipo\": \"Administrativo\", \n\n  \"Nombre\": \"Lucas Leguizamon\",\n  \"Email\": \"Legui@gmail.com\",\n  \"Clave\": \"123456\",\n  \"Tipo\": \"Profesor\", \n\n \n}",
          "type": "json"
        }
      ]
    },
    "permission": [
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
            "description": "<p>Mensaje de finalización de proceso</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"Mensaje\": \"Proceso de grabación de la lista finalizado\"\n  \n}",
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
    "groupTitle": "Usuario",
    "name": "PostAltalista"
  }
] });
