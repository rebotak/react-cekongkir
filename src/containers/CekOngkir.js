import React, {Component} from 'react';
// import {load as loadPeople} from '../reducers/people';
import {connect} from 'react-redux';
import Loader from '../components/Loader';
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
      modal: false,
      name: '',
      mountedPage: 1,
      gender: '',
      birth_year: '',
      eye_color: '',
      hair_colo: ''
    };
    // this.toggle = this.toggle.bind(this);
  }

  componentDidMount(){
    // let query = new URLSearchParams(this.props.location.search);
    // let currentPage = query.get('page');
    // if (currentPage) {
    //   this.setState({mountedPage: Number(currentPage)});
    //   this.props.loadPeople(currentPage);
    // }else{
    //   this.props.loadPeople(1)
    // }
  }

  render() {

    // const {} = this.props;
    // const {} = this.state;

    return (
      <div className="cek-ongkir">
        <h1>halo</h1>
        <Loader/>
      </div>
    );
  }
}

export default CekOngkir;