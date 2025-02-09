### Instruções para configuração

---

#### Acessar a pasta do projeto

```bash
$ cd desafio
```

#### Criar o arquivo .env do backend

```bash
$ cp backend/.env.example backend/.env
```

#### Instalar as dependências do backend

```bash
$ npm install --prefix ./backend
```

#### Criar o arquivo .env do frontend

```bash
$ cp frontend/.env.example frontend/.env
```

#### Instalar as dependências do frontend

```bash
$ npm install --prefix ./frontend
```

#### Executar o build do frontend

```bash
$ npm run build --prefix ./frontend
```

#### Construir as imagens do projeto

```bash
$ docker-compose build
```

#### Iniciar os containers do projeto

```bash
$ docker-compose up
```

#### Acessar o container do backend

```bash
$ docker exec -it backend sh
```

#### Executar as migrations para criar as tabelas no banco

```bash
# npm run prisma:migrate
```

#### Executar os seeders para popular as tabelas

```bash
# npm run prisma:seed
```

#### Acessar o sistema

##### > [http://localhost:3001/](http://localhost:3001/)
