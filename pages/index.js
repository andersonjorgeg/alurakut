import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

function ProfileSidebar({githubUser}){
  return (
    <Box as="aside">
      <img src={`https://github.com/${githubUser}.png`} style={{borderRadius: '8px'}} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.dados.length})
      </h2>
      <ul>
        {propriedades.dados.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={itemAtual.html_url} target="_blank">
                <img src={itemAtual.avatar_url}/>
                <span>{itemAtual.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

function ProfileRelationsCommunities(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.dados.length})
      </h2>
      <ul>
        {propriedades.dados.slice(0,6).map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={itemAtual.imageUrl} target="_blank">
                <img src={itemAtual.imageUrl}/>
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

function ProfileRelationsFavorite(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            {propriedades.title} ({propriedades.dados.length})
            </h2>

            <ul>
              {propriedades.dados.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`}/>
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([]); 
  const usuarioAleatorio = 'andersonjorgeg';
  const pessoasFavoritas = [
    'juunegreiros', 
    'omariosouto', 
    'peas', 
    'rafaballerini', 
    'marcobrunodev',
    'felipefialho',
    'dannylbr'
  ]
  const [seguidores, setSeguidores] = React.useState([]);
  //? 0 - pegar o array de dados do github
    React.useEffect(function() {
      //GET
      fetch('https://api.github.com/users/andersonjorgeg/followers')
        .then(function (respostaDoServidor) {
          return respostaDoServidor.json();
        })
        .then(function (respostaCompleta){
          setSeguidores(respostaCompleta);
        })

        //API GraphQL
        fetch('https://graphql.datocms.com/', {
          method: 'POST',
          headers: {
            'Authorization': '8a07d25b70fd1982af70a5a7aef15c',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ "query": `query {
            allCommunities {
              id
              title
              imageUrl
              creatorSlug
            } 
          }` }) 
        })
        .then((response) => response.json())
        .then((respostaCompleta) => {
          const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
          console.log(comunidadesVindasDoDato)
          setComunidades(comunidadesVindasDoDato)
        })
    }, [])

  console.log('seguidores: antes do return',seguidores);
  //? 1- criar um box que vai ter um map, baseado nos itens do array que pegamos do Github

  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio}/>
      <MainGrid>
        {/* primeira coluna */}
        <div className="profileArea" style={{ gridArea:'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio}/>
        </div>
        {/* segunda coluna */}
        <div className="welcomeArea" style={{ gridArea:'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) {usuarioAleatorio}
            </h1>

            <OrkutNostalgicIconSet/>
          </Box>
          <Box>
            <h2 className="smallTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();//?cancela o evento se for cancelável.
              const dadosDoForm = new FormData(e.target);
              console.log('Campo: ',dadosDoForm.get('title'))
              console.log('Campo: ',dadosDoForm.get('image'))

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: usuarioAleatorio,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
              })  
            }}>
              <div>
                <input 
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input 
                  type="text"
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        {/* terceira coluna */}
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title='Seguidores' dados={seguidores}/>
          <ProfileRelationsCommunities title='comunidades' dados={comunidades}/>
          <ProfileRelationsFavorite title='pessoasFavoritas' dados={pessoasFavoritas} />
          
          {/* <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`}/>
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper> */}
        </div> 
      </MainGrid>
    </>
  )
}
