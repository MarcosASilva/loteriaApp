import React from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonItem, IonLabel } from '@ionic/react'
import './Home.css'



const Inicio: React.FC = () => {
    var loterias = [
        {
            "nome": 'Mega Sena',
            'url': 'megasena'
        },

        {
            "nome": 'Quina',
            'url': 'quina'
        },

        {
            "nome": 'LotoMania',
            'url': 'lotomania'
        }
    ]
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonHeader>
                        <IonTitle>Loteria</IonTitle>
                    </IonHeader>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {
                        loterias.map(l => {
                            return(
                                
                                <IonItem href={l.url} className="loterias">
                                    <IonLabel> {l.nome} </IonLabel>
                                </IonItem>
                                
                            )

                        })
                    }
                </IonList>

            </IonContent>    
        </IonPage>

    )
}

export default Inicio
