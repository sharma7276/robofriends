import React, {Component} from 'react';
import CardList from '../Components/cardlist';
import Scroll from '../Components/scroll';
import SearchBox from '../Components/searchbox';
import './app.css';
import ErrorBoundry from '../Components/ErrorBoundry';

class App extends Component  {
	constructor(){
		super()
		this.state={
			robots : [],
			searchfield: ' '
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> response.json())
			.then(users=>this.setState({robots:users}));
		}
	
	onSearchChange=(event)=>{
		this.setState({searchfield: event.target.value})
	}	
	
	render(){
		const {robots,searchfield}=this.state;
		const filteredRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})

	return (!robots.length)?
		<h1 className="title">Loading</h1>:
		(
			<div className='tc'>
				<h1 className="f1 title">Robofriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
				<ErrorBoundry>
					<CardList robots={filteredRobots} />
					</ErrorBoundry>
				</Scroll>
			</div>
		);
	
	
	}
	
}

export default App;