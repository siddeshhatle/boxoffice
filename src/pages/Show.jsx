import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { apiGet } from '../misc/config';


const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS' : {
      return {isloading : false, error: null, show : action.show}
    }

    case 'FETCH_FAIL' : {
      return {...prevState, isloading : false, error : action.error}
    }

    default:
      return prevState;
  }
}

const initialState = {
  show : null,
  isLoading : true,
  error : null,
}

const Show = () => {
    const { id } = useParams();

    const [{ show, isLoading, error }, dispatch] = useReducer(
      reducer,
      initialState
    );

    // const [show, setShow] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
      let isMounted = true;
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(
          
          result => {
            setTimeout(() => {
              if(isMounted){
                dispatch({type: 'FETCH_SUCCESS', show: result});
              }
            }, 0);
        }).catch(err => {
          if(isMounted){
            dispatch({type: 'FETCH_FAIL', error: err.message});
          }
        });

        return () => {
          isMounted = false;
        }
    }, [id]);
    console.log('show', show);
    // console.log('isLoading', isLoading);
    // console.log('error', error);
    // console.log('dispatch', dispatch)
  
    if(isLoading){
      return <div> Data is Being Loaded...... </div>
    }

    if(error){
      return <div> Error occured : {error} </div>
    }


    return <div>

      <ShowMainData image={show.image} name={show.name} rating={show.rating} summary={show.summary} tags={show.genres}/>

      <div>
        <h2>Details</h2>
        <Details status={show.status} network={show.network} premiered={show.premiered}/>
      </div>

      <div>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons}/>
      </div>

      <div>
        <h2>Cast</h2>
        <Cast  cast={show._embedded.cast}/>
      </div>
    </div>

}

export default Show