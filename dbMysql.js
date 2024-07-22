var mysql = require('mysql');

class mysql2{

    constructor(){}
    
    db
    listHistory = []
    credentials = { host: 'localhost', user: 'root', database:'whattsapp_rest' , password: '' }

    

    async init() {
        this.db = mysql.createConnection(this.credentials);

        await this.db.connect(async (error) => {
            if (!error) {
                console.log(`Solicitud de conexión a base de datos exitosa`);
                
            }

            if (error) {
                console.log(`Solicitud de conexión fallida ${error.stack}`);
            }
        });

        
    }

   
    
 getDatos = async (from) => {
       
        await this.init();
        return await new Promise((resolve, reject) => {
            //const sql = `SELECT * FROM history WHERE phone='${from}'`;
            const sql = `SELECT * FROM producto`;
            this.db.query(sql, (error, rows) => {
                if (error) {
                    reject(error);
                }
                    if (rows.length) {
                        const [row] = rows;
                        row.options = JSON.parse(row.options);
                        resolve(row);
                    }
    
                    if (!rows.length) {
                        resolve(null);
                    }
                
            });
        })
    }


    saveDatos = (ctx) => {
        const values = [
            [null, null, null, null, ctx.from, null, null],
        ];
        const sql = 'INSERT INTO history (ref, keyword, answer, refSerialize, phone, options, created_at) values ?';

        this.db.query(sql, [values], (err) => {
            if (err) throw err
            console.log('Guardado en DB...', values);
        });
    }
    checkTableExists = () =>
        new Promise((resolve) => {
            const sql = "SHOW TABLES LIKE 'history'";

            this.db.query(sql, (err, rows) => {
                if (err) throw err

                resolve(!!rows.length);
            });
        })
}

var mysql_2 = mysql2;

module.exports = mysql_2;
