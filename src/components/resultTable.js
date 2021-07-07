import DataTable from 'react-data-table-component'
import ExpandedComponent from './expandedComponent'

export default function ResultTable ({ result, searchState }) {
  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true
    },
    {
      name: 'Language',
      selector: 'language',
      sortable: true
    },
    {
      name: 'Number of Stars',
      selector: 'stars',
      sortable: true
    }
  ]
  return (
    <div className='resultTable'>
    {
      result.length === 0?
      <div>No results found</div> :
      <DataTable
        columns={columns}
        data={result}
        pagination={true}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    }
    </div>
  )
}
