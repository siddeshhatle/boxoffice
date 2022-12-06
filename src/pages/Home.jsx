import React, { useState } from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';

const Home = () => {

  const[input, setInput] = useLastQuery();
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
      <SearchInput type="text" placeholder="Search For Something" onChange={onInputChange} onKeyDown={onKeyDown} value={input} /> 
      <RadioInputsWrapper>
        <div>
          <CustomRadio label="Shows" id="show-search" value="shows" onChange={onRadioChange} checked={isShowsSearch}/>
        </div>

        <div>
          <CustomRadio label="Actors" id="actors-search" value="people" onChange={onRadioChange} checked={!isShowsSearch}/>
        </div>


      </RadioInputsWrapper> 
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>Search</button>
      </SearchButtonWrapper>
      
      {
        renderResults()
      }
    </MainPageLayout>
  )
}

export default Home