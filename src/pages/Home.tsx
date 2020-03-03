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
  IonLoading,
  IonRefresherContent,
  IonRefresher,
  IonBackButton
} from "@ionic/react";
import React, { useState,useEffect } from "react";
import "./Home.css";
import axios from "axios";
import api from '../services/api'
import { RefresherEventDetail } from '@ionic/core';

const Home: React.FC = () => {
  const [jogo,setJogo] = useState();  
  const [concurso,setConcurso] = useState();
  const [acumulado,setAcumulado] = useState();
  const[ dataConcurso, setDataConcurso] = useState();
  var concursos = Array()
  const [dezenas,setDezenas] = useState([])
  const [premiacao,setpremiacao] = useState()
  const [showLoading, setShowLoading] = useState(true);
  const [dados, setDados] = useState(false)
  const sendGetRequest = async () => {

    const response = await axios.get(`https://ganheinaloteria.herokuapp.com/api/megasena`);
    let dados = response.data
    
    return dados;
  };

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    sendGetRequest().then(data => {
      setDezenas(data.dezenas)
      setConcurso(data.numero)
      setDataConcurso(data.data);
      setpremiacao(data.premiacao)
      setAcumulado(data.valorAcumulado)
      event.detail.complete();
      salvarConcursos()
    })
  }
  const  salvarConcursos =   () => {
    
     for(let i = concurso; i>=(concurso-100);i--){
      
      concursos.push(i)
    }
    
    //concursos = c
    //console.log(concursos);
    
  }
  useEffect(() => {
    console.log(api);
    
    setShowLoading(true)
    setJogo('Mega-sena')
    sendGetRequest().then(data => {
      setDezenas(data.dezenas)
      setConcurso(data.numero)
      setDataConcurso( data.data);
      setpremiacao(data.premiacao)
      setAcumulado(data.valorAcumulado)
      setDados(true)
      setShowLoading(false)
      
    })
      
    

  }, []);



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill='clear'>
            <IonBackButton defaultHref="/" />
          </IonButton>
  
        <IonTitle className="tituloMega">
          
        {jogo}
        </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="conteudo">

        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
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
              //console.log({url});
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
        
       
      </IonContent>
    </IonPage>
  );
};

export default Home;
