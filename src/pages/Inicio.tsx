import React from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonItem, IonLabel, IonCard, IonCardTitle, IonCardHeader, IonCardContent } from '@ionic/react'
import './Home.css'
import megasenaImg from '../assets/megasena.png'
import quinaImg from '../assets/quina.png'
import lotomaniaImg from '../assets/lotomania.jpg'



const Inicio: React.FC = () => {
    var loterias = [
        {
            "nome": 'Mega Sena',
            'url': 'megasena',
            'imageUrl': megasenaImg
            
        },

        {
            "nome": 'Quina',
            'url': 'quina',          
            'imageUrl': quinaImg
        },

        {
            "nome": 'LotoMania',
            'url': 'lotomania',
            'imageUrl': lotomaniaImg
        }
    ]
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonHeader>
                        <IonTitle className="titulo">Loteria</IonTitle>
                    </IonHeader>
                </IonToolbar>
            </IonHeader>
            <IonContent>
               
                    {
                        loterias.map((l,key) => {
                            return(
                                
                                <IonCard href={l.url} key={key}>
                                    <IonCardHeader>
                                    <img src={l.imageUrl} className="cardImage" alt='' />
                                   
                                    </IonCardHeader>
                           <IonCardContent>
                           <IonCardTitle> {l.nome} </IonCardTitle>
                           </IonCardContent>
                                </IonCard>
                                
                            )

                        })
                    }

            </IonContent>    
        </IonPage>

    )
}

export default Inicio
