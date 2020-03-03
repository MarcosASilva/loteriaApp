
import React, { useState  } from "react";
import { RouteComponentProps } from 'react-router-dom';
import './Home.css'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLoading, IonButton,  IonBackButton } from '@ionic/react';
import axios from 'axios'

interface MegaDetails extends RouteComponentProps<{
  id: string;
}> { }
const ConcursoMega: React.FC<MegaDetails> = ({ match }) => {


  const [concurso, setConcurso] = useState();
  const [acumulado, setAcumulado] = useState();
  const [dataConcurso, setDataConcurso] = useState();
  
  const [dezenas, setDezenas] = useState([])
  const [premiacao, setpremiacao] = useState()
  const [showLoading, setShowLoading] = useState(true);
  var prev, next = ''


  

    React.useEffect(() => {
      setConcurso(match.params.id) 
      setShowLoading(true)
      sendGetRequest(match.params.id).then(data => {
        setDezenas(data.dezenas)
        setDataConcurso(data.data);
        setpremiacao(data.premiacao)
        setAcumulado(data.valorAcumulado)
        setShowLoading(false)
        
      })
     
      //console.log(prev);
      
    }, [match.params.id])
  const sendGetRequest = async (concursos:string) => {
    console.log(concursos)
    const response = await axios.get(`https://ganheinaloteria.herokuapp.com/api/megasena/${concursos}`);
    let dados = response.data

    return dados;
  };
  const definirUrls = () => {
    prev = '/concurso/' + (+match.params.id - 1)

    next = '/concurso/' + (+match.params.id + 1)
  } 
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar justify-content-around>
            <IonButton slot="start" fill='clear'>
              <IonBackButton defaultHref="/megasena" />
            </IonButton>
            <IonTitle>Concurso {concurso} </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonLoading
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={'Carregando...'}
            duration={5000}
          />
          Resultado do concurso {concurso}
          <p>
            Data: {dataConcurso}
          </p>
          <div className="dezenas">
            {
              dezenas.map((d, key) => {

                return (
                  <div className="dezena" key={key}>
                    {d}

                  </div>
                );
              })
            }
          </div>
          {
            acumulado === '0,00' ? <p> <strong>Número de ganhadores(6 números): </strong> {premiacao.sena.ganhadores} <br />
              <strong>Valor da Premiação: </strong> R$ {premiacao.sena.valorPago} </p>
              : <p> <strong>Valor Acumulado:</strong> {acumulado} </p>
          }
          <div className="btnFooter">
            {
              definirUrls()
            }
            {
              
              concurso !== 1 ?
                <IonButton href={prev}>Anterior</IonButton>  :

                <IonButton disabled>Anterior</IonButton>
            }
            <IonButton href={next}>Próximo</IonButton>
            
          </div>

        </IonContent>
      </IonPage>
    )
}
  
  export default ConcursoMega;