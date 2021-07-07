import Multiselect from 'multiselect-react-dropdown';

export default function SearchBar ({ handleClear, handleSearch, setName, multiselectRef, onSelect, onRemove }) {
  const langList = [
    {
      label: 'JavaScript',
      value: 'javascript'
    },
    {
      label: 'Python',
      value: 'python'
    },
    {
      label: 'Java',
      value: 'java'
    },
    {
      label: 'Go',
      value: 'go'
    },
    {
      label: 'Ruby',
      value: 'ruby'
    },
    {
      label: 'TypeScript',
      value: 'typeScript'
    },
    {
      label: 'C++',
      value: 'cpp'
    },
    {
      label: 'PHP',
      value: 'php'
    },
    {
      label: 'C#',
      value: 'c#'
    },
    {
      label: 'C',
      value: 'c'
    },
    {
      label: 'HTML',
      value: 'html'
    }]

  return (
    <div className='searchBar'>
      <div className='row input-row'>
        <span className='search-input'>
          <label for='name'>Repository Name</label>
          <input
            type='text'
            id='name'
            onChange={(e) => {setName(e.target.value)}}/>
        </span>
        <span className='filter-input'>
          <span>Languages</span>
          <Multiselect
          id='multi-select'
          ref={multiselectRef}
          options={langList}
          displayValue='label'
          placeholder="All"
          hidePlaceholder={true}
          onSelect={onSelect}
          onRemove={onRemove}
          closeOnSelect={false}
          style={{
            chips: {
              background: '#f8ffe5',
              color: '#3f3f3f',
              height: '30px',
              border: 'none',
              'border-radius': '50px',
              padding: '.5% 1% .5% 1%'
            },
            option: {
              color: '#3f3f3f',
            },
            searchBox: {
              width: '40vw',
              'min-height': '35px',
              'border-color': '#c8c8c8',
              'border-radius': '4px'
            }
          }}
          avoidHighlightFirstOption={true}
          customCloseIcon={<span className='del-button'>&nbsp; &times;</span>}/>
        </span>
      </div>
      <div className='row button-row'>
        <span
        className='button'
        id='clear-button'
        title='Clear all input'
        onClick={handleClear}>
          Clear
        </span>
        <span
        className='button'
        id='search-button'
        title='Search for corresponding repositories'
        onClick={handleSearch}>
          Search
        </span>
      </div>
    </div>
  )
}
