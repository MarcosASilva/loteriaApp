import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonLoading
} from "@ionic/react";
import React, { useState,useEffect } from "react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import axios from "axios";

const Home: React.FC = () => {
  const [number, setNumber] = useState(0);
  const [jogo,setJogo] = useState();  
  const [jogo2,setJogo2] = useState([]);
  const [concurso,setConcurso] = useState();
  const [acumulado,setAcumulado] = useState();
  const[ dataConcurso, setDataConcurso] = useState();
  var concursos = Array()
  const [dezenas,setDezenas] = useState([])
  const [premiacao,setpremiacao] = useState()
  const [showLoading, setShowLoading] = useState(true);
  const sendGetRequest = async () => {

    const response = await axios.get(`https://ganheinaloteria.herokuapp.com/api/megasena`);
    let dados = response.data
    
    return dados;
  };

  
  const  salvarConcursos =   () => {
    
     for(let i = concurso; i>=(concurso-100);i--){
      
      concursos.push(i)
    }
    
    //concursos = c
    //console.log(concursos);
    
  }
  useEffect(() => {
    setShowLoading(true)
    setJogo('Mega-sena')
    sendGetRequest().then(data => {
      setDezenas(data.dezenas)
      setConcurso(data.numero)
      setDataConcurso( data.data);
      setpremiacao(data.premiacao)
      setAcumulado(data.valorAcumulado)
      setShowLoading(false)
      salvarConcursos()
    })
    sendGetRequest().then(data => {
      setJogo2(data)
    })
      
      console.log(jogo2);
      
    

  }, []);

  const click = () => {
 
 
 //console.log(dezenas);

    setNumber(number + 1);
    console.log(concursos);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle>
          
        {jogo}
        </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>

          </IonToolbar>
        </IonHeader>
        <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Carregando...'}
        duration={5000}
      />

          <p>
            Ultimas Dezenas Sorteadas - Concurso {concurso}
          </p>
          <p>
            Data: {dataConcurso}
          </p>
          <div className="dezenas">
           {
            dezenas.map((d, key )=> {

              return (
                <div className="dezena" key={key}>
                  {d} 
                 
                </div>
              );
            })
          }
  </div>    
  {
   acumulado==='0,00' ? <p> <strong>Número de ganhadores(6 números): </strong> {premiacao.sena.ganhadores} <br/> 
    <strong>Valor da Premiação: </strong> R$ {premiacao.sena.valorPago} </p> 
   : <p> <strong>Valor Acumulado:</strong> {acumulado} </p>
  }
        <IonList color="primary">
          {
            salvarConcursos()
          }
        {
          
          
            concursos.map(c => {
              //console.log({c});
              let url = '/concurso/'+c
              console.log({url});
              return (
               
                <IonItem href={url}>
                  
                    <IonLabel>
                    Concurso {c}
                    </IonLabel>
                  
                  
                 
                </IonItem>
              );
            })
          }
</IonList>
<div className="dezenas">
<IonButton onClick={click}>{number}</IonButton>
<IonButton onClick={click}>{number}</IonButton>
</div>
        
       
      </IonContent>
    </IonPage>
  );
};

export default Home;
