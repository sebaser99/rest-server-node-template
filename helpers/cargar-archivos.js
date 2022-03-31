const path = require('path');
const {v4: uuidv4} = require('uuid');

const subirArchivo = (files, extensionesValidas = ['png', 'jpeg', 'jpg', 'gif'], carpeta = '') => { 
    return new Promise((resolve, reject)=> { 
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length -1]

        if(!extensionesValidas.includes(extension)){
          reject(`La extensión ${extension} no es válida. Extensiones válidas ${extensionesValidas}`)
        }

        const nombreTemp = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp)

        archivo.mv(uploadPath, (err) => {
            if(err) {
                console.log(err)
                reject(err)
            }
            resolve(nombreTemp)
        })
    })
}

const validarColecciones= (coleccion, colecciones)=> {
    const  coleccionPermitida = colecciones.includes(coleccion)
    if(!coleccionPermitida) throw new Error(`La colección ${coleccion} no es permitida - Elija alguna de estas:  ${colecciones}`)
    
    return true;
}
module.exports = {
    subirArchivo,
    validarColecciones
}