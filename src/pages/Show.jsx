import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../misc/config';

const Show = () => {
    const { id } = useParams();

    const [show, setShow] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      let isMounted = true;
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(
          
          result => {
            setTimeout(() => {
              if(isMounted){
                setShow(result);
                setIsLoading(false);
              }
            }, 2000);
        }).catch(err => {
          if(isMounted){
            setError(err.message);
            setIsLoading(false);
          }
        });

        return () => {
          isMounted = false;
        }
    }, [id]);
    console.log('show', show);
  
    if(isLoading){
      return <div> Data is Being Loaded...... </div>
    }

    if(error){
      return <div> Error occured : {error} </div>
    }


    return <div>This is Show Page</div>

}

export default Show