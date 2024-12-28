<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



# Descrição do Desafio:
 O intuito é construir um sistema que encurte as URLs.
 O sistema deve possibilitar que a partir de um url enviado, ele seja encurtado para no máximo 6 caracteres. Exemplo:
  - Entrada: https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/
  - Saída: http://localhost/aZbKq7

# Requisitos

Deverá ser implementado um projeto com NodeJS na última versão estável, sendo construído como API REST. Leve em consideração que o sistema será implementado em uma infraestrutura que escala verticalmente.

# Funcionalidades

 - O sistema deve possibilitar o cadastro de usuários e autenticação dos mesmos.
 - O sistema deve possibilitar que a partir de um url enviado, ele seja encurtado para no máximo 6 caracteres. Exemplo:
    - Entrada: https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/
    - Saída: http://localhost/aZbKq7
 - Qualquer um pode solicitar que o URL seja encurtado e para encurtar deve existir apenas um endpoint, mas caso seja um usuário autenticado, o sistema deve 
 - registrar que o URL pertence ao usuário. 
 - Um usuário autenticado pode listar, editar o endereço de destino e excluir URLs encurtadas por ele.
 - Todo acesso a qualquer URL encurtado deve ser contabilizado no sistema.
 - Quando um usuário listar os urls deve aparecer na listagem a quantidade de cliques.
 - Todos os registros devem ter uma forma de saber quando foram atualizados.
 - Os registros só poderão ser deletados logicamente do banco, ou seja, deverá ter um campo que guarda a data de exclusão do registro, caso ela esteja nula é 
 porque ele é válido, caso esteja preenchida é porque ele foi excluído e nenhuma operação de leitura ou escrita pode ser realizada por ele.

## Integração e Deploy

 GitHub Actions: Configurar GitHub Actions para rodar os testes automaticamente em cada push e pull request. Utilizar uma imagem Docker para garantir consistência no ambiente de execução.

CI/CD: Configurar integração e deploy contínuos (CI/CD) para o deploy automático da API. Utilizar uma plataforma que suporte CI/CD, de forma que as atualizações aprovadas no repositório GitHub sejam automaticamente publicadas em produção.

Docker: Configurar Docker para que o ambiente seja replicável localmente e durante o CI/CD, garantindo que a API e os testes rodem com consistência.
 

## Instruções:
 
```bash
# Acesse o arquivo .env.example para ver as variáveis de ambiente disponíveis.

# clone o Repositório ou faça download do código fonte logo abaixo.
$ git clone https://github.com/Emanuelvss13/short-url.git

# instale as dependências.
$ npm i

# Rode a aplicação com o docker (opcional).
$ docker compose up --build

# Rode as migrations diponíveis:
$ nxp prisma migrate dev

# Acesse a rotas disponiveis atraves do swagger ou se preferir importe o arquivo requests.json em seu insomnia:
$ http://localhost:3000/api
```
