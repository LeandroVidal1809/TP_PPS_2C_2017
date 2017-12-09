define({ "api": [
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
    "url": "/",
    "title": "Valida ingreso de Sesión",
    "group": "Sesion",
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
          "content": "{\n  \"Usuario\": \"Leandro\"\n  \"Clave\": \"Lisandro123\"\n}",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"Nombre\": \"Leandro Vidal\",\n  \"Tipo\": \"Administrador\",\n  \n}",
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
    "groupTitle": "Sesion",
    "name": "Post"
  },
  {
    "type": "post",
    "url": "/R",
    "title": "Registrar Usuario",
    "group": "Sesion",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Usuario",
            "description": "<p>Usuario el cual va a usar para ingresar</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Clave",
            "description": "<p>clave alfanumerica &gt; 6 caracteres</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Email",
            "description": "<p>Email Valido cuenta de Firebase</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Nombre",
            "description": "<p>Nombre y Apellido de la persona</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"Usuario\": \"Leandro\",\n  \"Clave\": \"Lisandro123\",\n   \"Email\":\"Leandrovidal92@gmail.com\"\n   \"Nombre\":\"Leandro Vida\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Mensaje",
            "description": "<p>Mensaje que devolveremos al usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"Mensaje\": El usuario fue agregado exitosamente\n  \n}",
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
    "groupTitle": "Sesion",
    "name": "PostR"
  }
] });
