const app = require('./app');
const db = require('./db/database');

( async () => {
    try{
        await db.authenticate();
        await db.sync()
        console.log( "Base de datos conectada " )
    }
    catch(error){
        throw new Error(error);
    }
} )()

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ' + app.get('port'));
});