const jwt = require('jsonwebtoken');

export const verificarAutorizacion = ( autorizacion, clave ) => {
    let token = '';
    if( autorizacion && autorizacion.toLowerCase().startsWith('bearer') ){
        const div = token.split(' ');
        token = div[1]; 
    }

    const decodedToken = jwt.verify(token, clave);
    return decodedToken;
}