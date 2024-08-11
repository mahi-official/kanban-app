import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

render() {

	return (
	<div>
	<Child name = "sachin"></Child>
	</div>
	)
}
}

class Child extends React.Component{
	constructor(props){
		super(props);
		this.state = {
		name: "kapil"
		};
	}
	static getDerivedStateFromProps(props, state) {
		if(props.name !== state.name){
			return{
				name: props.name
			};
		}
		return state;
	}

	render(){
	return (
		<div> My name is {this.state.name }</div>
	)
	}
}

export default App;
