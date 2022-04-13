import SearchBar from './components/SearchBar';
import Movielist from './components/Movielist';
import React, {useEffect, useState, useRef} from 'react';
import axios from "axios"
import { BASE_URL } from "./assets/baseUrl"
import { Routes, Route } from 'react-router-dom'
import Add from './components/Add';
import Edit from './components/Edit';
import Nav from './components/Nav';
import Favorites from './components/Favorites';
import Mypagination  from './components/Mypagination';
import Login from './components/Login';


function App() {

  const admin = useRef(null)

  const [chanced, setChanced] = useState(true)

  function getUsers(){
    axios.get(BASE_URL +"/users")
        .then((response) => {
            setUsers(response.data)
        })
        .catch((error) => {
            console.log(error.response)
        })
  }

  function getMovies(){
    axios.get(BASE_URL +"/movies")
        .then((response) => {
            setMovies(response.data)
        })
        .catch((error) => {
            console.log(error.response)
        })
  }

  useEffect(() => {
    getUsers()
    getMovies()
  }, [])

  const [loginFormular, setzeLoginFormular] = useState({
    username: "",
    passwort: ""
  })

  function loginEingeben(event) {
      setzeLoginFormular((currentState) => {
          return {
              ...currentState,
              [event.target.name]: event.target.value
          }
      })
  }

  function fomularLeeren() {
    setzeLoginFormular({
        username: "",
        passwort: ""
    })
}

  function logOut() {
    admin.current = null
    fomularLeeren()
    setLoginStatus(false)
}

  const [movies, setMovies] = useState([])
  const [users, setUsers] = useState([])
  const [loginStatus, setLoginStatus] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [gewuechteList, setGewuechteList] = useState([])
  const [myFavorites, setMyFavorites] = useState([])

    // nach Update von Favorites
 

  useEffect(() => {
    // Favorites
    let favoritesString = localStorage.getItem("favorites") 
    if (favoritesString != null) {
      const favoritesArray = JSON.parse(favoritesString)
      setMyFavorites(favoritesArray)
    } else  {
      favoritesString = JSON.stringify(myFavorites)
      localStorage.setItem("favorites", favoritesString)
    }
  }, [])

  useEffect(() => { 
    setTimeout(() => {
      const favoritesString = JSON.stringify(myFavorites)
      localStorage.setItem("favorites", favoritesString)
    }, 100);     
  }, [myFavorites])


  const sortedMovies= movies.sort((a,b) =>{
    return a.id < b.id ? 1 : a.id > b.id ? -1 : 0
  })

  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [moviesProPages] = useState(3)

  function handleShowAlert(){
    setShowAlert(true)
    setTimeout(()=>{
      setShowAlert(false)
    },5000)
  }

  function addToFavorites(movie){
    const favoritesString = JSON.stringify(myFavorites)
    localStorage.setItem("favorites", favoritesString)
    setMyFavorites((currentState)=>{
      const control = currentState.filter((ele)=>{
        return movie.id === ele.id
      })
      if(control.length > 0){
        return currentState    
      }else{
        return [...currentState, movie]
      }
    })
  }

  function deleteFromFavorites(id){
    setMyFavorites((currentState)=>{
      const newFavorites = currentState.filter((movie)=>{
        return movie.id !== id
      })
      return newFavorites
    })
  }

  useEffect(() => {
      axios.get(BASE_URL +"/movies")
          .then((response) => {
              setMovies(response.data)
          })
          .catch((error) => {
              console.log(error.response)
          })
  }, [chanced])

  function deleteMovie(id) {
    axios.delete(BASE_URL+"/movies/"+id)
        .then((response) => {
            setMovies((currentState) => {
                const newArray = currentState.filter((ele) => {
                    return id !== ele.id
                })
                return newArray
            })
        }).then(()=>{
          handleShowAlert()
        })
  }

  function editMovie(id, movie){
    axios.put(BASE_URL+"/movies/"+id, movie)
      .then((response) => {
          setMovies((currentState) => {
              const newList = currentState.filter((ele)=>{
                return id === ele.id ? response.data : ele
              })
              return newList
          })
          setChanced((currentState)=>!currentState)
      }).then(()=>{
        handleShowAlert()
      })
  }

  //für Änderrung searchText
  function searchMovie(event) {
    setSearchText(event.target.value)
    setCurrentPage(1)
  }

  //Search Function
  useEffect(() => {
      setGewuechteList(()=>{
        const gewuechteList = movies.filter((movie)=>{
          return movie.name.toLowerCase().indexOf(searchText.toLowerCase()) !==-1
        })
        return gewuechteList
      })
  }, [searchText])

  function addMovie(movie){
    axios.post(BASE_URL+"/movies",movie)
    .then((response) => {
        setMovies((currentState) => {
            return [...currentState, response.data]
        })
    })
    .then(()=>{
      handleShowAlert()
    })
  }


  //Pagination
  const indexOfLastMovie = currentPage * moviesProPages
  const indexOfFirstMovie = indexOfLastMovie - moviesProPages
  const currentMovies = searchText === "" ? movies.slice(indexOfFirstMovie, indexOfLastMovie) : gewuechteList.slice(indexOfFirstMovie, indexOfLastMovie)

  return (
    <div className="App">
      <Nav loginStatus={loginStatus} logOut={logOut} />
      <Routes>
        <Route path="/" element={<> 
          <SearchBar searchMovie={searchMovie} />
          <Movielist movies={currentMovies}  //.length == 0 ? movies : gewuechteList gewuechteList.length == 0 ? movies : gewuechteList
                 deleteMovie={deleteMovie}
                 showAlert={showAlert}
                 addToFavorites={addToFavorites}
                 loginStatus={loginStatus}
          />
          <Mypagination movies={searchText === "" ? movies : gewuechteList} setCurrentPage={setCurrentPage} 
                        moviesProPages={moviesProPages} currentPage={currentPage} currentMovies={currentMovies}/>
        </>} />
        <Route path="/add"  element={<Add addMovie={addMovie}/>} />
        <Route path="/edit/:id"  element={<Edit movies={movies} editMovie={editMovie} />} />
        <Route path="/favoriten"  element={<Favorites  liste={myFavorites} deleteFromFavorites={deleteFromFavorites} />} />
        <Route path="/login"  element={<Login admin={admin} users={users} loginFormular={loginFormular}  
                              loginEingeben={loginEingeben}  setLoginStatus={setLoginStatus} fomularLeeren ={fomularLeeren}/>} />
      </Routes>
      
    </div>
  );
}

export default App;
