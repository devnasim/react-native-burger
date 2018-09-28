import React from 'react';
import { 
	StyleSheet,
	View,
	Text,
	PanResponder,
  Animated,
  Image
} from 'react-native';

export default class App extends React.Component {
	constructor(props){
		super(props);

		this.state = {
      canvas: this.props.item, 
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1) //Step 1
		};
  }
  
  componentWillMount(){
    this.panResponder = PanResponder.create({    //Step 2
			onStartShouldSetPanResponder : () => true,
			onPanResponderMove : Animated.event([null,{ //Step 3
				dx : this.state.pan.x,
				dy : this.state.pan.y
			}]),
			onPanResponderRelease: (e, gesture) => {
        if (this.props.isDropZone(gesture)) {
          Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 100
        }).start(() =>{
          this.setState({
            showDraggable: false
        });
        this.props.handleDropZoneCanvas(this.state.canvas);
        }
        
        );
				} else {
					Animated.spring(
						this.state.pan,
						{toValue:{x:0,y:0}}
					).start();
				}
			}
		});
  }


  
  handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, 30, 30);
  }

	render(){
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
		return (
				<View>
          {this.state.showDraggable && (
            <Animated.View 
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.circle]}
            >
            <Image  
            style={{width: 60, height: 60, resizeMode:"contain"}} 
            source={this.props.item.image}
            />
          </Animated.View>
        )}
        </View>
		);
	}
}

let CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
  circle: {
    // backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    margin:10,
  }
});

