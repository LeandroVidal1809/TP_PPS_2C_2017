

module M {
    var s = "hello";
    export function f(param:string) {

        var a = document.getElementById('valorcamporeturn').value;

       
        var json = "{\nId:1154\nPregunta:Final oral o escrito?\nTipoRespuesta:Menu selección\nRespuesta1:Oral\nRespuesta2:escrito\nRespuesta3:indistinto\n}";
        document.getElementById('valorcamporeturn').value = json;
            
    }


    export function i(){
        alert("asd");
        console.log("awwdas");
    }

    export function e() {
        var a = document.getElementById('valorcamporeturncsv').value;
        var s = document.getElementById('valorcampocsv').value;
        var x = 0;
                if(s=='assets/archivos/PPS-4A-2C2017-200.csv' )
                {

                    var json = "{Legajo:100215\nNombre:Vidal,Leandro\nHorario:Sabado 8:30 12:30\n\n";
                    json +=  "Legajo:100213\nNombre:Sorichetti,Florencia\nHorario:Sabado 8:30 12:30\n\n";
                    json +=  "Legajo:102153\nNombre:Pereyra,Juan\nHorario:Sabado 8:30 12:30\n\n}";       
                    document.getElementById('valorcamporeturncsv').value = json;
                  x=1;              
                }
                if(s=='assets/archivos/LAB4-4B-2C2017-200.csv' )
                {
                    var json = "{Legajo:110315\nNombre:Lopez,Pedro\nHorario:Jueves 8:30 12:30\n\n";
                    json +=  "Legajo:100213\nNombre:Rodriguez,Lucas\nHorario:Jueves 8:30 12:30\n\n";
                    json +=  "Legajo:104113\nNombre:Matos,Juan\nHorario:Jueves 8:30 12:30\n\n}";       
                    document.getElementById('valorcamporeturncsv').value = json;
                    x=1;                
                }
                if(x==0)
                {
                    document.getElementById('valorcamporeturncsv').value = "{Mensaje:La plantilla ingresada no existe}";
                
                }   
    }



    export function g() {
        var a = document.getElementById('valorcamporeturnqr').value;
        var s = document.getElementById('valorcampoqr').value;
        if(s=='54ew54kj34742kasw8852rr22ab')
        {
            var json = "{\nMateriaActual:PPS\nAula:201\n}";
            
            document.getElementById('valorcamporeturnqr').value = json;
                        
        }

        else if(s=='54ew54kj34742kasw8852rr22a')
        {
            var json = "{\nMateriaActual:Laboratorio 4\nAula:200\n}";       
            document.getElementById('valorcamporeturnqr').value = json;
                        
        }
        else
        {
            document.getElementById('valorcamporeturnqr').value = "{Mensaje:El código QR no existe o no tiene los permisos necesaerios}";
        }   
    }





    
}