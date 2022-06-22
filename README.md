# Ignite NodeJS - Serverless - Desafio 01

Projeto de cadastro de "To do" utilizando [Serverless framework](https://www.serverless.com/), desenvolvido como desafio do Ignite NodeJS.

## Executando o projeto

- Instalar Dependências:
  ```yarn```
- Instalar o DynamoDB: 
  ```yarn dynamodb:install```
- Iniciar o DynamoDB: 
  ```yarn dynamodb:start```
- Iniciar o projeto:
  ```yarn dev```


## Rotas

- **POST -** `/todos/{userid}`
    
    Essa rota recebe o `id` de um usuário pelo `pathParameters` e os seguintes campos no corpo da requisição: `title` e `deadline`, onde `deadline` é a data limite para o *todo*.
    
    O *todo* é salvo com os seguintes campos no DynamoDB:
    
    ```
    { 
      id: 'uuid'
      user_id: 'uuid'
      title: 'Nome da tarefa',
      done: false,
      deadline: new Date(deadline)
    }
    ```
    
 - **GET -** `/todos/{userid}`
    
    Essa rota recebe o `id` de um usuário pelo `pathParameters` (o mesmo id que foi usado para criar algum *todo*).
    
    A rota retorna os *todos* que possuírem o `user_id` igual ao `id` recebido pelos parâmetros.
