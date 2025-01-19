import { useState, useEffect, createContext } from 'react'
import './App.css'
import Loading from './components/Loading/Loading'
import Control from './components/Control'

const LoadingContext = createContext()
const App = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
  }, [])
  return (
    <>
      {/* {(loading ?
        <LoadingContext.Provider value={{loading, setLoading}}>
          <Loading />
        </LoadingContext.Provider> :
        <Control />
        )} */}
        <Control />
    </>
  );
};


export default App
export { LoadingContext }
