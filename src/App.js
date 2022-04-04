import React, { useState } from "react";
import {
  useSelector,
  useDispatch,
  ReactReduxContext,
  Provider,
} from "react-redux";
import { Stage, Layer, Group, Line, Circle } from "react-konva";
import {
  setXYCordinatesOfNodeA,
  setXYCordinatesOfNodeB,
  setXYCordinatesOfNodeC,
  getLinePoints, setRatio, setXYCordinatesOfNodeCBasedOnOffset, getMovableLineYCordinate, setYcordinateOfMovableNode
} from "../src/features/movableNodesSlice";
import ButtonComponent from './components/ButtonComponent'
import useGeometrics from "./customHooks/useGeometrics";

const App = () => {
  const { distanceBetween2Points, getLineAngle, getTranslatePoint } = useGeometrics();
  const linePoints = useSelector(getLinePoints);
  const getMovableLineYCordinateFromRedux = useSelector( getMovableLineYCordinate );
  const dispatch = useDispatch()
  const [ dragStartPos, setDragStartPos ] = useState( [] )
  const a = distanceBetween2Points( [ linePoints.x1, linePoints.y1 ], [ linePoints.x1, linePoints.y2 ] ) / 15
  const b = distanceBetween2Points( [ linePoints.x1, linePoints.y2 ], [ linePoints.x2, linePoints.y2 ] ) / 15
  const c = Math.sqrt( a * a + b * b )
  const d = distanceBetween2Points( [ linePoints.x3, linePoints.y3 ], [ linePoints.x3, linePoints.y2 ] ) / 15
  const e = distanceBetween2Points( [ linePoints.x2, linePoints.y2 ], [ linePoints.x3, linePoints.y2 ] ) / 15
  const f = Math.sqrt( d * d + e * e )
  const [ ratioBetweenTwoLines, setRatioBetweenTwoLines ] = useState( ( c / f ) );

  const dragStartRed = ( e ) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    setDragStartPos( [ x, y ] );
    dispatch(
      setXYCordinatesOfNodeA({
        xPos: x,
        yPos: y,
      })
    );
  };
  const dragMoveRed = ( e ) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    const offset_y = ( y - dragStartPos[ 1 ] )
    console.log( 'offset_y', offset_y )
    dispatch(
      setXYCordinatesOfNodeA( {
        xPos: x,
        yPos: y,
      } )
    );
    dispatch(
      setXYCordinatesOfNodeCBasedOnOffset( {
        offset_y: offset_y
      } )
    );

  };

  const dragEndRed = ( e ) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    const YcordinateOfMovableNodes = getMovableLineYCordinateFromRedux
    dispatch(
      setXYCordinatesOfNodeA( {
        xPos: x,
        yPos: y,
      } )
    );
    dispatch(
      setYcordinateOfMovableNode( {
        YcordinateOfMovableNodes: YcordinateOfMovableNodes
      } )
    );
  }
  const dragStartMoveEndGreen = ( e ) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    dispatch(
      setXYCordinatesOfNodeB({
        xPos: x,
        yPos: y,
      })
    );
    dispatch( setRatio( 
      ratioBetweenTwoLines
     ) )
  };
  const dragStartBlack = ( e ) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    setDragStartPos( [ x, y ] );
    dispatch(
      setXYCordinatesOfNodeC( {
        xPos: x,
        yPos: y,
      })
    );
  };
  const dragMoveBlack = ( e ) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    const offset_y = ( y - dragStartPos[ 1 ] )
    dispatch(
      setXYCordinatesOfNodeC( {
        xPos: x,
        yPos: y,
      } )
    );
    dispatch(
      setXYCordinatesOfNodeCBasedOnOffset( {
        offset_y: offset_y
      } )
    );
  };
  const dragEndBlack = ( e ) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    const YcordinateOfMovableNodes = getMovableLineYCordinateFromRedux
    dispatch(
      setXYCordinatesOfNodeC( {
        xPos: x,
        yPos: y,
      } )
    );
    dispatch(
      setYcordinateOfMovableNode( {
        YcordinateOfMovableNodes: YcordinateOfMovableNodes
      } )
    );
  }


  return (
    <>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            style={{ backgroundColor: "#f7e5e5" }}
            height={window.innerHeight}
            width={window.innerWidth}
          >
            <Provider store={store}>
              <Layer>
                <Group>
                  <Line
                    points={[
                      linePoints.x1,
                      linePoints.y1,
                      linePoints.x2,
                      getMovableLineYCordinateFromRedux 
                    ]}
                    stroke="#777777"
                    strokeWidth={2}
                  />
                  <Line
                    points={[
                      linePoints.x2,
                      getMovableLineYCordinateFromRedux,
                      linePoints.x3,
                      linePoints.y3,
                    ]}
                    stroke="#777777"
                    strokeWidth={2}
                  />
                  <Circle
                    x={linePoints.x1}
                    y={linePoints.y1}
                    radius={10}
                    fill="red"
                    draggable
                    onDragStart={ ( e ) => {
                      dragStartRed( e )
                    } }
                    onDragMove={ ( e ) => {
                      dragMoveRed( e )
                    } }
                    onDragEnd={ ( e ) => dragEndRed( e ) }
                  />
                  <Circle
                    x={ linePoints.x2 }
                    y={ getMovableLineYCordinateFromRedux }
                    radius={10}
                    fill="green"
                    draggable
                    onDragStart={ ( e ) => dragStartMoveEndGreen( e ) }
                    onDragMove={ ( e ) => dragStartMoveEndGreen( e ) }
                    onDragEnd={ ( e ) => dragStartMoveEndGreen( e ) }
                  />
                  <Circle
                    x={linePoints.x3}
                    y={linePoints.y3}
                    radius={10}
                    fill="black"
                    draggable
                    onDragStart={ ( e ) => {
                      dragStartBlack( e )

                    } }
                    onDragMove={ ( e ) => {
                      dragMoveBlack( e )
                    } }
                    onDragEnd={ ( e ) => dragEndBlack( e ) }
                  />
                </Group>
              </Layer>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
      <ButtonComponent />
    </>
  );
};

export default App;
