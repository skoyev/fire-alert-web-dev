module.exports = {
    development: {
      app: {
        name: 'Fire Alert',
        port: process.env.PORT || 8000
      },
      domain: 'uxf.zimbra-vnc.de',
      boshURL: 'https://talk.uxf.zimbra-vnc.de/http-bind',
      database:{
        username: 'postgres',
        host:     'localhost',
        dbname:   'postgres',
        password: 'postgres',
        port:      5432
      },
      cache:{
        ttl : 9999999
      }
    },    
    production: {
        app: {
            name: 'Fire Alert',
            port: process.env.PORT || 8000
        },
        domain: 'uxf.zimbra-vnc.de',
        boshURL: 'https://talk.uxf.zimbra-vnc.de/http-bind',
        database:{
            username: 'postgres',
            host:     'localhost',
            name:     'postgres',
            password: 'love',
            port:      5432
        },
        cache:{
            ttl : 9999999
        }
    }
  };