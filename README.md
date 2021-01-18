# Exemplo de API de pagamentos com Login

Este projeto consiste em um exemplo de transferências eletrônicas realizadas entre contas.

## Tecnologias

Essas são as tecnologias utilizadas para a criação deste projeto:

- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Knex](http://knexjs.org/)
- [Jest](https://jestjs.io/)

## Estrutura do Projeto

Foi adotado, na construção do projeto, os princípios [SOLID](https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530), e uma arquitetura baseada na [Clean Code Architecture](https://medium.com/@renicius.pagotto/clean-architecture-e-suas-premissas-6beb933c72b1).

## Como executar

Para executar o projeto localmente, é necessario realizar os seguintes passos:

```
# 1. Clone o repositório localmente
$ git clone 'https://github.com/GabrielAranda1/Happy.git'

# 2. Instale as dependências
$ yarn install ou npm install

# 2.1. Crie a base de dados
$ yarn setupdb ou npm run setupdb

# 2.2 Realize as migrations do banco de dados
$ yarn knex:migrate ou npm run knex:migrate

# 2.3. Rode a aplicação
$ yarn dev or npm run dev

```

## Disponibilidade

A aplicação pode ser testada online pelo endereço padrão https://money-transfer-example.herokuapp.com ou localmente em http://localhost:3333

## Endpoints

Aqui consta todos os endpoints locais e o que deve ser enviado para obter a resposta esperada.:

1. GET https://money-transfer-example.herokuapp.com/users - Criar uma nova conta

- Corpo da requisição

```
{
	"name": "João",
	"lastname": "Ninguem",
	"cpf": "12345678943",
	"password": "salaminho",
	"balance": 10000
}
```

2. POST https://money-transfer-example.herokuapp.com/login - Realizar login

- Corpo da requisição

```
{
	"cpf": "12345678943",
	"password": "salaminho"
}
```

3. POST https://money-transfer-example.herokuapp.com/transaction - Criar nova transação

- Header da requisição

```
  "Authorization": "Bearer <<token gerado no login>>"
```

- Corpo da requisição

  receiver = CPF de quem receberá a quantia <br>
  value = valor a ser transferido

```
{
	"receiver": "98765432143",
	"value": 10
}
```

4. GET https://money-transfer-example.herokuapp.com/user/((ID do usuario)) - Visualizar saldo da conta

- Header da requisição

```
    "Authorization": "Bearer <<token gerado no login>>"
```

5. PUT https://money-transfer-example.herokuapp.com/transaction/((ID da transação)) - Estornar transação

- Header da requisição

```
    "Authorization": "Bearer <<token gerado no login>>"
```

6. GET https://money-transfer-example.herokuapp.com/transactions/((ID do usuário))?from=((data início))&to=((data final)) - Listar transações em um período de tempo

- Header da requisição

```
    "Authorization": "Bearer <<token gerado no login>>"
```

- Parametros de busca

```
from=2020-12-12
to=2020-12-20
```

#
