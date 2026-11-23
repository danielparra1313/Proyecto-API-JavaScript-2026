const sql = require('mssql')

const config = {
  server: 'localhost',
  database: 'Prueba',
  port: 1433,
  options: {
    trustServerCertificate: true
  },
  driver: 'msnodesqlv8', // IMPORTANTE para Windows Auth
  authentication: {
    type: 'ntlm',
    options: {
      domain: 'DESKTOP-E6K7N11',
      userName: 'usuario', // tu usuario de Windows
      password: '' // si no tiene contraseña, dejar vacío (no recomendado)
    }
  }
}

async function conectar() {
  try {
    await sql.connect(config)
    console.log('Conectado a Prueba')

    const result = await sql.query('SELECT * FROM categorias')
    console.log(result.recordset)
  } catch (err) {
    console.error(err)
  }
}

conectar()