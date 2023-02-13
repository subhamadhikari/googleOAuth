
import './App.css';
import { useEffect , useState} from 'react';
import jwt_decode from 'jwt-decode';
import clientID from './keys';


function App() {

  const [user,setUser] = useState({});

  function handleCallBack(response){
    console.log("Encoded jwt id"+response.credential)
    let userObject = jwt_decode(response.credential)
    console.log(userObject)
    setUser(userObject)
    document.getElementById('signInDiv').hidden = true
  }

  useEffect(() => {
    // global google
    console.log("id"+clientID)
    google.accounts.id.initialize({
      client_id:clientID,
      callback:handleCallBack
    })

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {theme:"outline",size:"large"}
    )

    google.accounts.id.prompt();
  }, [])

  function handleSignOut(e){
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }
  

  return (
    <div className="App">
      <div id='signInDiv'></div>
      {
        Object.keys(user).length != 0 &&
        <button onClick={(e)=>{handleSignOut(e)}}>Sign Out</button>
      }
      
      {user && (
        <div>
          <img src={user.picture}/>
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
