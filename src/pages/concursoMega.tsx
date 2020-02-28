import * as React from 'react';
import { RouteComponentProps } from 'react-router';

const App: React.FC<RouteComponentProps> = ({match : {params}}) => {
   const  [concurso,setConcurso] = React.useState()
    React.useEffect(() => {
        setConcurso(params) 
        console.log(concurso['id']);
        
    })
    return (
        <p>
            
        </p>
    )
}
  
  export default App;