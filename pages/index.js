import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import ComunidadesDefault from '../src/components/ComunidadesDefault';
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

export default function Home() {
  const [comunidades, setComunidades] = React.useState([...ComunidadesDefault]); 
  console.log(ComunidadesDefault);
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
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }
              
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas);  
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
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image}/>
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
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
        </div> 
      </MainGrid>
    </>
  )
}
