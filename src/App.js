import React, {Component} from 'react';
import Home from './components/frontend/home/Home';
import Carousel from './components/frontend/container/Carousel'
import Menu from './components/frontend/container/Menu';
import Footer from './components/frontend/container/Footer';
import Helpers from './components/frontend/helpers/Helpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider: []
    };
  }
  async componentDidMount(){
    try{
      Helpers.getSliders((sliders) => {
        this.setState({
          slider: sliders
        })
      }) 
    }catch(error){
        console.log(error)
    }
  }
  render(){
    return (
      <div style={{backgroundColor: '#F1F4F7'}}>
        <Menu />
        <Carousel slider={this.state.slider}/>
        <Home />
        <Footer />
      </div>
    );
  }
}

export default App;
