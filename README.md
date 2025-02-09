### Instruções para configuração

---

#### Acessar a pasta do projeto

`/desafio`

#### Criar o arquivo .env do backend

`cp backend/.env.example backend/.env`

#### Instalar as dependências do backend

`npm install --prefix ./backend`

#### Criar o arquivo .env do frontend

`cp frontend/.env.example frontend/.env`

#### Instalar as dependências do frontend

`npm install --prefix ./frontend`

#### Executar o build do frontend

`npm run build --prefix ./frontend`

#### Construir as imagens do projeto

`docker-compose build`

#### Iniciar os containers do projeto

`docker-compose up`

#### Acessar o container do backend

`docker exec -it backend sh`

#### Executar as migrations para criar as tabelas no banco

`npm run prisma:migrate`

#### Executar os seeders para popular as tabelas

`npm run prisma:seed`

#### Acessar o sistema

##### > [http://localhost:3001/](http://localhost:3001/)
