## Criando um projeto NextJS
Execute no seu terminal dentro do diretorio que voce deseja ter seu projeto o comando
```bash
$ npx create-next-app NOME_DO_PROJETO
```
Crie dentro da raiz da pasta do projeto uma pasta chamada "src" e mova a pasta "pages" para dentro de "src".


## Instalando e configurando typescript em um projeto nextJS
Primeiro vamos instalar as dependencias de desenvolvimento
```bash
$ yarn add typescript @types/react @types/node -D
``` 
Agora basta renomear todas as extensoes de arquivos de .js para .tsx


## Criando estilos globais
Dentro de "src" crie uma pasta chamda "styles" e dentro dela voce crie seu arquivo "global.css".

Veja um exemplo abaixo:

**_src/styles/global.css_**
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #333;
}
``` 
Agora é só importar no seu arquivo "_app.tsx", veja o exemplo abaixo:
**_src/pages/_app.tsx_**
```javascript
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

``` 


## Instalando um pré-processador de css
Nesse projeto vamos utilizar "Sass", veja como adicionar essa dependencia:
```bash
$ yarn add sass
```
_**OBS**: Ao instalar o sass, neste projeto vamos utilizar as estilizações globais com o sass, para isso renomeie o arquivo **"global.css"** para **"global.scss"** tambem altere a extensão na importação do seu arquivo **"_app.tsx"**_


## Configurando document do NextJS
Criamos um arquivo chamado **_document.tsx** para nele guardar todas as informaçoes do projeto que nao queremos que seja recarregada do zero a todo momento, nele configuramos todo o html do nosso projeto.

Veja um exemplo onde configuramos as fontes do projeto:

_**src/pages/_document.tsx**_
```javascript
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

``` 

