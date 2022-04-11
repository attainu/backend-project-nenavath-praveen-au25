import logo from './logo.svg';
import './App.css';
import {data} from './data';

function App() {
  return (
    <div>
      {data.map((data,key)=>{
        return(
          <div>
            <div>
              {data.name}
            </div>
            <p>{data.rating}</p>
            <p>{data.release}</p>

          </div>

        );
      })}
    </div>
  );
}

export default App;
