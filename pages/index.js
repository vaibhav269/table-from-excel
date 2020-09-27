import excelToJson from 'convert-excel-to-json';
import Table from '../components/Table';

class Index extends React.Component {
  state = {
    data: [],
    headers: ['Mobile', 'Earning Id', 'Earning']
  }

  selectFile = (e) => {
    var reader = new FileReader();

    reader.onload = (evt) => {
      let base64String = btoa(String.fromCharCode(...new Uint8Array(evt.target.result)));
      this.setState({
        data: excelToJson({
          source: base64String,
          columnToKey: {
            A: 'mobile',
            B: 'earning_id',
            C: 'earning'
          },
          header: {
            rows: 1
          }
        }).Sheet1
      })
    }
    reader.readAsArrayBuffer(e.target.files[0]);
  }

  render() {
    let {data,headers} = this.state;
    return (
      <div className="container">
        <div className="row no-gutters">
          <div className="col-12">
            <div className = "m-2">
              <input type="file" onChange={this.selectFile} />
            </div>
            <div>
              {
                (data.length > 0)?
                  <Table headers = {headers} data = {data}/>
                :
                <p className = "text-center"> Select a file to view it's data </p>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Index;