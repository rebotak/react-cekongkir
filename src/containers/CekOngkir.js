import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../components/Loader'
import {Async} from 'react-select'
import axios from 'axios'
import 'react-select/dist/react-select.css'
import {submit as submitOngkir} from '../reducers/cekongkir'
import _ from 'lodash'

@connect(
  (state) => ({
    dataCekOngkir: state.cekongkir.data,
    cekongkirLoading: state.cekongkir.loading,
    cekongkirLoaded: state.cekongkir.loaded,
  }),{
    submitOngkir,
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
    this.props.submitOngkir({
      origin: this.state.selectedOrigin.id,
      originType: 'city',
      destination: this.state.selectedDestination.id,
      destinationType: 'city',
      weight: 1000,
      courier: 'jne:pos:tiki:wahana:jnt:pandu:sicepat',
      length: 0,
      width: 0,
      height: 0,
    })
  }

  render() {
    const {
      dataCekOngkir,
      cekongkirLoading,
      cekongkirLoaded,
    } = this.props
    const {
      selectedOrigin,
      selectedDestination
    } = this.state;
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
      <div className="cek-ongkir container">
        {cekongkirLoading &&
          <Loader/>
        }
        {!cekongkirLoading &&
          <div className="form-ongkir row container">
            <div className="form-origin col-sm-4 d-flex flex-column">
              <span className="text-left">From: {selectedOrigin.name}{selectedOrigin && `(${selectedOrigin.id})`} </span>
              <Async
                className="flex-1"
                onChange={this.handleChangeOrigin}
                labelKey="name"
                valueKey="id"
                name="form-field-name"
                value={selectedOrigin}
                loadOptions={getOptions}
              />
            </div>
            <div className="form-destination col-sm-4 d-flex flex-column">
              <span className="text-left">To: {selectedDestination.name}{selectedDestination && `(${selectedDestination.id})`} </span>
              <Async
                className="flex-1"
                onChange={this.handleChangeDestination}
                labelKey="name"
                valueKey="id"
                name="form-field-name"
                value={selectedDestination}
                loadOptions={getOptions}
              />
            </div>
            <div className="button-wrapper col-sm-4 d-flex align-items-end justify-content-center">
              <button className="btn btn-primary" onClick={this.submitCekOngkir}>Cek Ongkir!</button>
            </div>
          </div>
        }
        {dataCekOngkir && !cekongkirLoading &&
          _.map(dataCekOngkir,ongkos => {
            return (
              <div className="d-block">
                {ongkos.etd}, Rp. {ongkos.value}, {ongkos.service} ({ongkos.description}), Kurir: {ongkos.name}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default CekOngkir
