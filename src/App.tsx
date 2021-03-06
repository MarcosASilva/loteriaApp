import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ConcursoMega from './pages/concursoMega';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Inicio from './pages/Inicio';
import Quina from './pages/Quina';
import ConcursoQuina from './pages/concursoQuina';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/megasena" component={Home} exact={true} />
        <Route path="/quina" component={Quina} exact={true} />
      

        <Route path="/home" component={Inicio} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path='/concurso/:id' component={ConcursoMega} exact={true} />
        <Route path='/concursoQ/:id' component={ConcursoQuina} exact={true} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
