export default function ExpandedComponent ({ data }) {
  return (
    <div className='expandedComponent'>
      <table>
        <tr>
          <td className='table-header'>Name</td>
          <td>{data.name}</td>
        </tr>
        <tr>
          <td className='table-header'>Owner</td>
          <td>{data.owner}</td>
        </tr>
        <tr>
          <td className='table-header'>Description</td>
          <td>{data.description}</td>
        </tr>
      </table>
    </div>
  )
}
