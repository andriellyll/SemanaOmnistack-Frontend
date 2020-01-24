import React, {useEffect, useState } from 'react';
import api from './services/api';
// Componente => (bloco isolado) função que retorna um código html, css, ou javascript(quando se trata de dinamicidade na página)
//    um componente não influencia no outro. Cada componente eh separado em seu arquivo
// Propridade => atributo do componente (title, src, etc). Todas as propriedades devem ser passadas como parâmetro atraves do props.
//    A propriedade, dentro da tag, deve ser escrita entre chaves, para o seu valor ser visivel
// Para se usar varios componentes seguidos, eles devem estar dentro de um container => usa-se a fragment (tag sem nomenclatura) => <> </>
// Outra definição de propriedade: Informações que o componente PAI passa para o componente FILHO
// Estado => Informação que o componente vai manipular, manter e atualizar 

// const [counter, setCounter] = useState(0); 0 eh o valor inicial da variavel
// function incrementCounter(){
//    setCounter(counter + 1);
// }

// conceito Imutabilidade React => nunca sera ALTERADA um dado, sera sempre CRIADO outro dado a partir do primeiro.
//      operações como contador++, ou alteração de uma variavel nao sao possiveis.
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
  const [devs, setDevs] = useState([]);
  
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data){
    
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return(
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (            
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>  
      </main>
    </div>
  );
}

export default App;
