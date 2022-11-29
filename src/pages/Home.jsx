import React, { useState } from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';

const Home = () => {

  const[input, setInput] = useState('');
  const [results, setResult] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isShowsSearch = searchOption === 'shows'; 

  const onInputChange = ev => {
    setInput(ev.target.value);
  }

  const onSearch = () => {
    
    apiGet(`/search/${searchOption}?q=${input}`).then(results => {
      setResult(results);
    });
  }


  const onRadioChange = (ev) => {
    setSearchOption(ev.target.value);
  }

  // console.log(searchOption);

  const onKeyDown = ev => {
    if(ev.keyCode === 13){
      onSearch();
    }
  }

  const renderResults = () => {
    if(results && results.length === 0){
      return <div>No results found</div>
    }

    if(results && results.length > 0){
      return results[0].show ?
      <ShowGrid data={results} /> 
      // results.map( (item)=><div key={item.show.id}>{item.show.name}</div>) 
      :
      <ActorGrid data={results} />
      // results.map( (item)=>(<div key={item.person.id}>{item.person.name}</div>)); 

    }

    return null;
  }

  return (
    <MainPageLayout>
      <input type="text" placeholder="Search For Something" onChange={onInputChange} onKeyDown={onKeyDown} value={input} /> 
      <div>

      <label htmlFor="show-search">
        Shows 
        <input id="show-search" type="radio" value="shows" onChange={onRadioChange} checked={isShowsSearch} />
      </label>

      <label htmlFor="actors-search">
        Actors 
        <input id="actors-search" type="radio" value="people" onChange={onRadioChange} checked={!isShowsSearch} />
      </label>

      </div> 
      <button type="button" onClick={onSearch}>Search</button>
      {
        renderResults()
      }
    </MainPageLayout>
  )
}

export default Home