import { useCallback, useMemo, useState } from 'react';

function App() {
  const originUrl = useMemo(()=>'https://reqres.in/api/users/2', []);
  const proxyUrl = useMemo(()=>'http://localhost:9090/api/users/2', []);

  const [originResult, setOriginResult] = useState('');
  const [proxyResult, setProxyResult] = useState('');

  const getFetch = useCallback((url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error);
    });
  },[]);

  const onClickHandler = async (e) => {
    const { name } = e.target;
    if( name === "origin") {
      const result = await getFetch(originUrl);
      setOriginResult(JSON.stringify(result.data, null, 2));
    
    }else{
      const result = await getFetch(proxyUrl);
      setProxyResult(JSON.stringify(result.data, null, 2));
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <div style={{"border": "2px solid red", width:"50%"}}>
          <button name='origin' type='button' onClick={onClickHandler}>send to `{originUrl}`</button>
          <pre>{originResult && originResult}</pre>
        </div>
        <hr />
        <div style={{"border": "2px solid blue", width:"50%"}}>
          <button name='proxy' type='button' onClick={onClickHandler}>send to `{proxyUrl}`</button>
          <pre>{proxyResult && proxyResult}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
