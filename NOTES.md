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


## Configurando Document do NextJS
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

## Trabalhando com datas utilizando o date-fns
Para trabalhar com datas eu gosto de utilizar o date-fns, nesse projeto instalamos essa dependencia executando:
```bash
$ yarn add date-fns
```

Veja um exemplo de codigo de como utilizar o date-fns, nesse exemplo queremos um output parcido "Qui, 8 Abril" exemplo:
```javascript
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export function Header() {
  const currentDate = format(new Date(), 'EEEEEEE, d MMMM', {locale: ptBR});

  return (
    <div>
      <p>Trabalhando com data</p>

      <span>{currentDate}</span>
    </div>
  );
}
``` 
Saiba mais acessando a documentaçao do date-fns: https://date-fns.org/docs/Getting-Started


## Consumindo API's
Existem 3 maneiras legais de consumir uma api no nextjs, porem so vou apresentar as 2 principais, explicando sua diferença e mostrando exemplos.

**SSR: Server Side Rendering*, neste modelo consumimos os dados de uma api e sem a necessaidad do javascript no client conseguimos renderizar suas informações, pois ela é renderizada pelo servidor node do nextjs, com isso nao perdemos informações e temos resultados muito melhores na indexação dos motores de buscas como google, bing e etc, um ponto importante é lembrar que este modelo é executado toda vez que alguem acessa a pagina do qual é necessario fazer essa chamada na api.

EXEMPLO DE UMA CHAMDA DE API UTILIZANDO O MODELO SSR: getServerSideProps()
```javascript
export default function Home(props) {
  console.log(props.episodes)

  return (
    <h1>Index</h1>
  )
}

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    }
  }
}
```

**SSG: Static Site Generation*, este modelo tem as mesmas funcionalidades do modelo acima (SSR) com um grande diferecial na performance, neste modelo determinamos com qual frequencia essa chamada na api ira funcionar, imagine um blog com muitas noticias e muitos usuarios acessando simultaneamente, todo acesso iria gerar uma chamada na api, imagine que tenhamos 1 milhao de chamadas na api sem a necessidade pois o conteudo sera o mesmo, entao utilizando este modelo podemos programar por exemplo para que uma pagina statica seja montada em um determinado intervalo de tempo atualizando suas informações, fazendo assim que menos requisições ocorram na api.

EXEMPLO DE UMA CHAMDA DE API UTILIZANDO O MODELO SSG: getStaticProps()
```javascript
export default function Home(props) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}
```

## Trabalhando com o Image do nextJS
Se voce tem imagens externas no projeto existe uma funcionalidade fantastica no nextJS, estamos falando do Image, com esse recurso temos mais performance, para utilzar voce primeiro tem que criar um arquivo de configuração nao raiz do seu projeto, no exemplo baixo vamos mostrar como criar este arquivo mas lembre-se que a url do dominio é de acordo com o dominio que vem a sua imagem.

**_next.config.js_**
```javascript
module.exports = {
  images: {
    domains: ['storage.googleapis.com'],
  }
}
```

Exemplo de um arquivo com chamada da imagem:
**_src/pages/index.tsx_**
```javascript
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Image 
        width={192} 
        height={192} 
        src="https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/funcional.jpg"
        alt="imagem teste" 
        objectFit="cover"
      />
    </div>
  )
}
```


## Roteamento de paginas no nextJS
O nextJS trouxe muita praticidade no quesito roteamento, é muito simples fazer isso nesse framework, basta voce criar o arquivo responsavel pela rota dentro de **_src/pages_** e tudo acontece, o nome desse arquivo vai formar a rota ou seja sera a URL isso acontece devido ao "file system routing" voce pode saber mais sobre isso acessando https://nextjs.org/docs/routing/introduction
<br>

**Criando uma rota simples**: Se dentro de "src/pages" criarmos um arquivo chamado "episodes.tsx" (a extensao é devido a estarmos trabalhando com typescript poderia ser "episode.js") para acessar essa pagina de episodios, teriamos que navegar "dominio.com/episodes" e tudo iria funcionar normalmente.
<br>

**Criando uma rota dinamica (parametros)**: Vamos supor que queira ir em um episodio especifico, no caso de uso teria inumeros episódios, seriam URL diferentes, por exemplo "dominio.com/episodios/bla-bla-bla" ATENÇÃO AGORA QUE FICA INTERESSANTE, ao invés de utilizarmos um "query params" poderiamos utilizar uma flag que vai receber esse parametro de identificar qual episodio, para isso criamos uma pasta em **_src/pages_** como nome de "episodes" e dentro dela o arquivo que o nome venha ser um colchetes e dentro dos colchetes um "slug" ou "id" ou qualquer outro nome, exemplo **[slug].tsx, [episode].tsx ou [id].tsx**, a nomenclatura nao importa, é apenas um nome dado para usar como parametro, veja o exemplo abaixo:

**_src/pages/episodes/[slug].tsx_**
```javascript
import { useRouter } from 'next/router';

export default function Episode() {
  const router = useRouter();

  return (
    <h1>{router.query.slug}</h1>
  )
}

// Para acessar: http://localhost:3000/episodes/bla-bla-bla
``` 
**OBS**: Note a URL para acessar essa rota, e que tudo que vier como parametro da pagina, ira vir dentro do slug como usamos de exemplo e utilizando o useRouter do nextJS recebemos esse parametro.

