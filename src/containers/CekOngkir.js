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
      selectedOption:''
    }
    this.handleChange = this.handleChange.bind(this)
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

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(selectedOption)
      this.setState({selectedOption: selectedOption})
    }
  }

  render() {
    // const {} = this.props
    const { selectedOption } = this.state;

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
        <h1>From: {selectedOption.name}{selectedOption && `(${selectedOption.id})`} </h1>
        {/*<Loader/>*/}
        <Async
          onChange={this.handleChange}
          labelKey="name"
          valueKey="id"
          name="form-field-name"
          value={selectedOption}
          loadOptions={getOptions}
        />

      </div>
    )
  }
}

export default CekOngkir