import React, { Component } from 'react';
import { AppRegistry, View, Text, PanResponder, FlatList, StatusBar } from 'react-native';

export default class Aewsome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      has_gesture   : false,
      pan           : '',
      gestureList   : [],
      gestureGrant  :  0,
      gestureStart  :  0,
      gestureMove   :  0,
      gestureEnd    :  0,
    };
    this.handleRenderItem         = this.handleRenderItem.bind          (this);
    this._onPanResponderGrant     = this._onPanResponderGrant.bind      (this);
    this._onPanResponderReject    = this._onPanResponderReject.bind     (this);
    this._onPanResponderStart     = this._onPanResponderStart.bind      (this);
    this._onPanResponderMove      = this._onPanResponderMove.bind       (this);
    this._onPanResponderEnd       = this._onPanResponderEnd.bind        (this);
    this._onPanResponderRelease   = this._onPanResponderRelease.bind    (this);
    this._onPanResponderTerminate = this._onPanResponderTerminate.bind  (this);
  } // constructor

  // @param flatListItem: {
  //   stateID : int,
  //   moveX   : int,
  //   moveY   : int,
  //   x0      : int,
  //   y0      : int,
  //   dx      : int,
  //   dy      : int,
  //   vx      : int,
  //   vy      : int,
  // }
  handleRenderItem({item}){
    return (
      <View>
        <Text>{item.event.identifier+'; '+item.gesture.numberActiveTouches  }</Text>
        <Text>{item.gesture.moveX   +'; '+ item.gesture.moveY               }</Text>
        <Text>{item.gesture.x0      +'; '+ item.gesture.y0                  }</Text>
        <Text>{item.gesture.dx      +'; '+ item.gesture.dy                  }</Text>
        <Text>{item.gesture.vx      +'; '+ item.gesture.vy                  }</Text>
        <Text>{item.event.target    +'; '+ item.event.timestamp             }</Text>
      </View>
        // <Text>{this.state.stateID }</Text>
        // <Text>{this.state.move    }</Text>
        // <Text>{this.state.pos     }</Text>
        // <Text>{this.state.ds      }</Text>
        // <Text>{this.state.vs      }</Text>
      );
  } //handleRenderItem

  _onPanResponderGrant(evt, gestureState){
    // const new_gesture = Object.assign({}, gestureState);
    this.setState({
      has_gesture : true,
      pan         : gestureState.moveX+',' +gestureState.moveY,
      gestureGrant: this.state.gestureGrant+1,
      // gestureList : [],
      // gestureList : this.state.gestureList.push(new_gesture),
    });
    return true;
  } // _onPanResponderGrant

  _onPanResponderReject(evt, gestureState) { };

  _onPanResponderStart(evt, gestureState) {
    // var newGestureList = this.state.gestureList.slice();  // copies actual state
    // newGestureList.push(gestureState);                    // appends gestureState to gestureList
    // const newGestureList = this.state.gestureList.push(gestureState);
    const new_gestureList = this.state.gestureList.slice();
    new_gestureList.push({
      gesture : gestureState   ,
      event   : evt.nativeEvent,
    });
    // new_gestureList.push({
    //   evt     : evt,
    //   gesture : gestureState,
    // });
    this.setState({
      // stateID : gestureState.stateID,
      pan           : gestureState.moveX+',' +gestureState.moveY,
      gestureStart  : this.state.gestureStart+1,
      gestureList   : new_gestureList,
    });
    return true;
  };

  _onPanResponderMove(evt, gestureState) {
    // const newGestureList = this.state.gestureList.slice();  // copies actual state
    // newGestureList = newGestureList.map(function(gesture){
    //   if    (gesture.stateID == gestureState.stateID) return gestureState;
    //   else                                            return gesture;
    // });
    // const newGestureList = this.state.gestureList.slice().map(function(item){
    //   let has_sameIdentifier = (item.event.identifier == evt.nativeEvent.identifier);
    //   if    (has_sameIdentifier)  return {
    //     gesture : Object.assign({},gestureState   ),
    //     event   : Object.assign({},evt.nativeEvent),
    //   };
    //   else                        return item;
    // });
    this.setState({
      pan         : gestureState.stateID+',' +gestureState.numberActiveTouches,
      gestureMove : this.state.gestureMove+1,
      gestureList : this.state.gestureList,
    });
    return true;
  };

  _onPanResponderEnd(evt, gestureState) {
    // const newGestureList = this.state.gestureList.slice();  // copies actual state
    // newGestureList = newGestureList.filter(function(gesture){
    //   if    (gesture.stateID != gestureState.stateID) return true;
    //   else                                            return false;
    // });
    const newGestureList = this.state.gestureList.filter(function(item){
      return !(item.event.identifier == evt.nativeEvent.identifier);
    });
    this.setState({
      // has_gesture : false,
      pan         : gestureState.moveX+',' +gestureState.moveY,
      gestureEnd  : this.state.gestureEnd+1,
      gestureList : newGestureList,
    });
  };
  
  _onPanResponderRelease(evt, gestureState) {
    this.setState({
      has_gesture : false,
      pan         : 'realeased',
      gestureList : [],
    });
  };
  
  _onPanResponderTerminate(evt, gestureState) {
    this.setState({
      has_gesture : false,
      pan         : 'terminated',
      gestureList : [],
    });
  };

  componentWillMount(){
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture   : () => true,
      onMoveShouldSetPanResponderCapture    : () => true,
      // onStartShouldSetPanResponder          : () => true,
      // onMoveShouldSetPanResponder           : () => true,
      // onShouldBlockNativeResponder          : () => true,  // should
      // onPanResponderTerminationRequest      : () => true,  // should
      onPanResponderGrant                   : this._onPanResponderGrant,
      // onPanResponderReject                  : this._onPanResponderReject,
      onPanResponderStart                   : this._onPanResponderStart,
      onPanResponderMove                    : this._onPanResponderMove,
      onPanResponderEnd                     : this._onPanResponderEnd,
      onPanResponderRelease                 : this._onPanResponderRelease,
      // onPanResponderTerminate               : this._onPanResponderTerminate,
    }); // PanResponder create
  } // ComponentWillMount


  render() {
    return (
      <View
        style={{
          flex            :        1,
          alignItems      : 'center',
          padding         :       30,
          backgroundColor : 'silver',
          // justifyContent  :'center',
        }}
        {...this._panResponder.panHandlers}
      >
        <StatusBar hidden={true}/>
        <Text>{(this.state.has_gesture?'Found a gesture!':'Hello World!')}</Text>
        <Text>{
               this.state.gestureGrant
          +','+this.state.gestureStart
          +','+this.state.gestureMove
          +','+this.state.gestureEnd
        }</Text>
        <Text>{this.state.pan}</Text>
        <FlatList
          data        ={ this.state.gestureList }
          // data        ={[
          //   {
          //     stateID             : 'fafd',
          //     numberActiveTouches : 'fafd',
          //     moveX               : 'fafd',
          //     moveY               : 'fafd',
          //     x0                  : 'fafd',
          //     y0                  : 'fafd',
          //     dx                  : 'fafd',
          //     dy                  : 'fafd',
          //     vx                  : 'fafd',
          //     vy                  : 'fafd',
          //   },
          //   ]}
          renderItem  ={ this.handleRenderItem  }
          keyExtractor={ (item, index)=>index   }
          style       ={{
            borderColor     : 'black',
            backgroundColor :  'gray',
            borderWidth     :       1,
          }}
          />
      </View>
        // <View
        // style={{
        //   flex            :       1,
        //   alignItems      :'center',
        //   paddingTop      :      40,
        //   // justifyContent  :'center',
        // }}>
        // </View>
    );
  }

} // HelloWorldApp

// skip this line if using Create React Native App
AppRegistry.registerComponent('aewsome', () => Aewsome);
