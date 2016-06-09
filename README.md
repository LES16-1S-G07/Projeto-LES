
## Tecnologias utilizadas
* [MeanJS]( https://github.com/meanjs/mean)
* [MongoDB](http://www.mongodb.org/)
* [Node.js](http://www.nodejs.org/)
* [Express](http://expressjs.com/)
* [AngularJS](http://angularjs.org/)

## Pré-requisitos
* [Git](https://git-scm.com/downloads).
* [Node.js](https://nodejs.org/en/download/). Sê tiver problemas, verifique por soluções em [GitHub Gist](https://gist.github.com/isaacs/579814)
* [MongoDB](http://www.mongodb.org/downloads), e use a porta padrão(27017).
* [ Ruby](https://www.ruby-lang.org/en/documentation/installation/)
* [Bower Package Manager](http://bower.io/) - front-end packages. Tenha certeza de ter instalado Node.js e npm first, depois instalar bower globalmente usando npm:

```bash
$ npm install -g bower
```

* Grunt - Sê decidir utilizar [Grunt Task Runner](http://gruntjs.com/) para automatizar o processo de desenvolvimento.

```bash
$ npm install -g grunt-cli
```

* [Sass](http://sass-lang.com/) para compilar CSS durante o processamento do grunt. Requer ruby, instale usando gem install:

```bash
$ gem install sass
```
## Quick Install

Para instalar dependências do Node.js use npm novamente. Na pasta da aplicação rode pelo console:

```bash
$ npm install
```
## Rodando a aplicação
```
$ grunt
```
A aplicação deve rodar na porta 3000 em ambiente de desenvolvimento (veja /config/env/* para mais detalhes)
* [http://localhost:3000](http://localhost:3000)
* explore `config/env/development.js` para mais informações

### Modo de produção

```bash
$ grunt prod
```
* explore `config/env/production.js` para mais informações

### Rodando com User Seed
Ira tentar gerar usuários 'user' e 'admin'. Sê já existir ira ser mostrado no console.

Em desenvolvimento:
```bash
MONGO_SEED=true grunt
```

Em Produção:
```bash
MONGO_SEED=true grunt prod
```

## Créditos
Baseado no template criado pelo [Time MeanJS]( https://github.com/meanjs/mean)
