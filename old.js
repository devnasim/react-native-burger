import React from 'react';
import { 
	Component,
	StyleSheet,
	View,
	Text,
	PanResponder,
	Animated,
	Dimensions
} from 'react-native';


import DragableObject from './components/DragableObject'


export default class App extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			showDraggable   : true,     //Step 1
			dropZoneValues  : null,
			pan: new Animated.ValueXY()   //Step 1
		};

		this.panResponder = PanResponder.create({    //Step 2
			onStartShouldSetPanResponder : () => true,
			onPanResponderMove           : Animated.event([null,{ //Step 3
				dx : this.state.pan.x,
				dy : this.state.pan.y
			}]),
			onPanResponderRelease           : (e, gesture) => {
				if(this.isDropZone(gesture)){ //Step 1
					this.setState({
						showDraggable : false //Step 3
					});
				}else{
					Animated.spring(
						this.state.pan,
						{toValue:{x:0,y:0}}
					).start();
				}
			}
		});
	}

	isDropZone(gesture){     //Step 2
		var dz = this.state.dropZoneValues;
		return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
	}

	setDropZoneValues(event){      //Step 1
		this.setState({
			dropZoneValues : event.nativeEvent.layout
		});
	}

	render(){
		return (
			<View style={styles.mainContainer}>
				<View 
					onLayout={this.setDropZoneValues.bind(this)}     //Step 2
					style={styles.dropZone}>
					<Text style={styles.text}>Drop me here!</Text>
				</View>

				{this.renderDraggable()}
			</View>
		);
	}

	renderDraggable(){
		return (
			<View style={styles.draggableContainer}>
				<DragableObject/>
				<DragableObject/>
				{/* <Animated.View 
					{...this.panResponder.panHandlers}                       //Step 1
					style={[this.state.pan.getLayout(), styles.circle]}>     
					<Text style={styles.text}>Drag me!</Text>
				</Animated.View> */}
			
			</View>
		);
	}
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
	mainContainer: {
		flex    : 1
	},
	dropZone    : {
		height         : 150,
		backgroundColor:'#2c3e50'
	},
	text        : {
		marginTop   : 25,
		marginLeft  : 5,
		marginRight : 5,
		textAlign   : 'center',
		color       : '#fff'
	},
	draggableContainer: {
		position    : 'absolute',
		top         : Window.height/1.2 - CIRCLE_RADIUS,
		left        : Window.width/2 - CIRCLE_RADIUS,
	},
	circle      : {
		backgroundColor     : '#1abc9c',
		width               : CIRCLE_RADIUS*2,
		height              : CIRCLE_RADIUS*2,
		borderRadius        : CIRCLE_RADIUS
	}
});

