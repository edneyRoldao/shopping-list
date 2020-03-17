# shopping-list project

- transpiler
    - install babel e rimraf
    - create .babelrc
    - add commands at script property on package.json
    - add nodemon config
    
- environment
    - add content on file .env
    - add environment.dev file (./environment)
    - add environment.prd file (./environment)
    - add environment.config (./config)
    - import file above into server.js (index.js)
 
- Config routes
    - criar routes.config.js
    - no express.config passar a instacia do express (app) pra dentro do arquivo de rotas
    - criar a rota de auth
    - registrar no config de rotas
    - criar controller de rotas (aqui e uma classe)
    
- config mongo
    - criar mongo.config.js
    - add url connection db no environment.dev e user e password no .env
    - conectar o mondo no server.js (index.js)
    - criar o model de usuario
    - insert user no controller (register)
    - add config no express.config pra ler json

- interceptor
    - create interceptor
    - add on route
    
- validator
    - create validator
    - add on route
    - treat errors on controller
    - validator no route
    - tratamanto validator no controller

Shopping list impl
    - create model de category
    - create route de category e registrou no config
    - create service para inserir as categorias
    - create controller de categoria
    
how to stop server port on windows
netstat -ano | findstr port