import React from 'react';
import { StyleSheet, View , Text, ScrollView, Image} from 'react-native';
import Canvas from 'react-native-canvas';
import { Col, Row, Grid } from "react-native-easy-grid";
import {sortBy} from 'lodash';


import DragableObject from './components/DragableObject';
// import { stores } from './components/store';
const image0 = require('./assets/burger/bread-top.png');
const image1 = require('./assets/burger/other.png');
const image2 = require('./assets/burger/green-leaf.png');
const image3 = require('./assets/burger/tomato-slice.png');
const image4 = require('./assets/burger/item.png');
const image5 = require('./assets/burger/chesse.png');
const image6 = require('./assets/burger/chicken.png');
const image7 = require('./assets/burger/bread-bottom.png');

const   images = [
	{ id:0, name:'bread Top', image:image0 },
	{ id:1, name:'other', image:image1 },
	{ id:2, name:'green Leaf', image:image2 },
	{ id:3, name:'tomato slice', image:image3},
	{ id:4, name:'item', image:image4 },
	{ id:5, name:'chesse', image:image5 },
	{ id:6, name:'chicken', image:image6 },
	{ id:7, name:'bread bottom', image:image7 },
]
export default class App extends React.Component {
	constructor(){
		super();
		this.state={    //Step 1
			dropZoneValues  : null,
			dropZoneCanvas: [],
		}
	}


	isDropZone = (gesture) => {     //Step 2
		var dz = this.state.dropZoneValues;
		console.log(dz, gesture);
		return gesture.moveY < 110;
	}

	setDropZoneValues(event){      //Step 1
		this.setState({
			dropZoneValues : event.nativeEvent.layout
		});
	}



	handleDropZoneCanvas = (canvas) =>{
		console.log(canvas);
		const newCanvas= this.state.dropZoneCanvas.concat(canvas);
		this.setState({ dropZoneCanvas:newCanvas });
		
	}

	render(){
		const burger = sortBy(this.state.dropZoneCanvas, ['id']);
		console.log(burger)
		return (
			<View style={styles.mainContainer}>
			<View style={styles.dropZone} onLayout={this.setDropZoneValues.bind(this)}>
			  {burger.map((item)=>(
					 <Image  style={{width: 100, height: 20, resizeMode:"stretch"}} source={item.image}/>
				))}
			</View>
			<View style={styles.ballContainer} />
			<View style={styles.row}>
			<ScrollView horizontal style={{paddingVertical: 20}}>
					{images.map(item=>(
							<DragableObject
							key={item.id}
							isDropZone={this.isDropZone}
							handleDropZoneCanvas={this.handleDropZoneCanvas}
							item={item}
						/>
				))} 
			</ScrollView>
			</View>
		</View>
		);
	}
}

let CIRCLE_RADIUS = 10;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  ballContainer: {
    height:200
  },
  row: {
    flexDirection: "row"
  },  
  dropZone: {
    height: 250,
		backgroundColor: "#fff",
		justifyContent:'center',
		alignItems:'center',
		flexDirection: "column"
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    fontWeight: "normal"
	},
	circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  }
});



// let styles = StyleSheet.create({
//   container:{
// 		flex: 1,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		marginTop:30
// 	},

// 	topRow:{
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		backgroundColor:'red',
// 		width:300
// 	},
// 	bottomRow:{
// 		paddingTop:200
// 	}
// });



