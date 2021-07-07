import Header from './components/header'
import SearchBar from './components/searchBar'
import ResultTable from './components/resultTable'

import React, { useState, useEffect } from 'react'
import { Octokit } from "@octokit/rest"
import './App.css'

require('dotenv').config()
const token = process.env.AUTH_TOKEN

function App() {
  const [name, setName] = useState('')
  const [languages, setLanguages] = useState([]) //[] means all
  const [result, setResult] = useState([])
  const [endSearch, setEndSearch] = useState(false)
  const [searchState, setSearchState] = useState('none') //none, searching, done

  const multiselectRef = React.useRef()

  const handleClear = () => {
    let e = document.getElementById('name')
    e.value = ''
    multiselectRef.current.resetSelectedValues()
    setName('')
    setLanguages([])
  }

  const handleSearch = async () => {
    setSearchState('searching')
    setResult([])
    if (name === '') {
      alert('Repository name has to be filled in order to search.')
    }
    const octokit = new Octokit({
      auth: token
    });

    const q_lang = []
    languages.forEach((lang, i) => {
      q_lang.push('+language:' + lang.value)
    });

    const q = `q=${name}${q_lang}`
    const sort = 'stars'
    const per_page = 100
    let result_pre = []
    let page = 1
    const res = await octokit.rest.search.repos({
      q,
      sort,
      per_page,
      page
    })

    const count = res.data.total_count
    res.data.items.forEach((item, i) => {
      if (item.name.toLowerCase().includes(name.toLowerCase())) {
        const newElement = {
          id: result.length,
          name: item.name,
          language: item.language,
          stars: item.watchers_count.toString(),
          owner: item.owner.login,
          description: item.description,
          link: item.html_url
        }
        result_pre.push(newElement)
      }
    })

    if (count > 100) {
      const getCnt = Math.ceil((count - 100) / 100)
      for (let i = 1; i <= getCnt; i++) {
        page = i + 1
        const res = await octokit.rest.search.repos({
          q,
          sort,
          per_page,
          page
        })

        res.data.items.forEach((item, i) => {
          if (item.name.toLowerCase().includes(name.toLowerCase())) {
            const newElement = {
              id: result.length,
              name: item.name,
              language: item.language,
              stars: item.watchers_count.toString(),
              owner: item.owner.login,
              description: item.description,
              link: item.html_url
            }
            result_pre.push(newElement)
          }
        })
        if (i === getCnt) {
          setResult(result_pre)
        }
      }
    }
    else {
      setResult(result_pre)
    }
    setSearchState('done')
  }

  const onSelect = (selectedList, selectedItem) => {
    setLanguages(selectedList)
  }

  const onRemove = (selectedList, removedItem) => {
    setLanguages(selectedList)
  }

  return (
    <div className="App">
      <Header />
      <SearchBar
      handleClear={handleClear}
      handleSearch={handleSearch}
      setName={setName}
      multiselectRef={multiselectRef}
      onSelect={onSelect}
      onRemove={onRemove}/>
      {
        searchState === 'none' ?
        <div className='resultTable'>Haven't searched yet</div> :
        searchState === 'searching' ?
        <div className='resultTable'>Collecting data... please wait</div> :
        <ResultTable
        result={result}
        searchState={searchState}/>
      }
    </div>
  );
}

export default App;
