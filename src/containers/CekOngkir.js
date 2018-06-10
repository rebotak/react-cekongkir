import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../components/Loader'
import {Async} from 'react-select'
import axios from 'axios'
import 'react-select/dist/react-select.css' 

@connect(
  (state) => ({
    // peopleData: state.people.data,
    // peopleLoading: state.people.loading,
    // peopleLoaded: state.people.loaded,
    // peopleList: state.people.list,
  }),{
    // loadPeople,
  }
)

class CekOngkir extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOrigin:'',
      selectedDestination:''
    }
    this.handleChangeOrigin = this.handleChangeOrigin.bind(this)
    this.handleChangeDestination = this.handleChangeDestination.bind(this)
    this.submitCekOngkir = this.submitCekOngkir.bind(this)
  }

  componentDidMount(){
    // let query = new URLSearchParams(this.props.location.search)
    // let currentPage = query.get('page')
    // if (currentPage) {
    //   this.setState({mountedPage: Number(currentPage)})
    //   this.props.loadPeople(currentPage)
    // }else{
    //   this.props.loadPeople(1)
    // }  
  }

  handleChangeOrigin(selectedOption) {
    this.setState({ selectedOrigin:'' });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(selectedOption)
      this.setState({selectedOrigin: selectedOption})
    }
  }

  handleChangeDestination(selectedOption) {
    this.setState({ selectedDestination:'' });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(selectedOption)
      this.setState({selectedDestination: selectedOption})
    }
  }
  submitCekOngkir(){
    axios.post(`https://api.zuragan.com/api/v1/pub/ongkir/domestic-costs?sort=asc`,{
      origin: 151,
      originType: 'city',
      destination: 501,
      destinationType: 'city',
      weight: 1000,
      courier: 'jne:pos:tiki:wahana:jnt:pandu:sicepat',
      length: 0,
      width: 0,
      height: 0,
    })
  }

  render() {
    // const {} = this.props
    const { selectedOrigin, selectedDestination } = this.state;
    const getOptions = (input) => {
      return axios.get(`https://api.zuragan.com/api/v1/pub/cities`,{
          params:{
            q:input,
            min_char: 3,
            type:'city'
          }
        })
        .then((response) => {
          let result = response.data.data.data
          console.log(result)
          return result;
        })
        .then((result) => {
          return { options: result };
        })
    }

    return (
      <div className="cek-ongkir">
        {/*<Loader/>*/}
        <h1>From: {selectedOrigin.name}{selectedOrigin && `(${selectedOrigin.id})`} </h1>
        <Async
          onChange={this.handleChangeOrigin}
          labelKey="name"
          valueKey="id"
          name="form-field-name"
          value={selectedOrigin}
          loadOptions={getOptions}
        />
        <h1>To: {selectedDestination.name}{selectedDestination && `(${selectedDestination.id})`} </h1>
        <Async
          onChange={this.handleChangeDestination}
          labelKey="name"
          valueKey="id"
          name="form-field-name"
          value={selectedDestination}
          loadOptions={getOptions}
        />
        <button onClick={this.submitCekOngkir}>Cek Ongkir!</button>
      </div>
    )
  }
}

export default CekOngkir