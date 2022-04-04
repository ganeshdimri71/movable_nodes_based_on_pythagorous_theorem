import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getLinePoints, getMovableNodeRatio, setRatio, setXYCordinatesOfNodeBasedOnCordinate, getMovableLineYCordinate } from '../features/movableNodesSlice'
import useGeometrics from "../customHooks/useGeometrics";

const ButtonComponent = () => {
    const { distanceBetween2Points, getLineAngle, getTranslatePoint } = useGeometrics();
    const dispatch = useDispatch()
    const linePoints = useSelector(getLinePoints);
    const ratioBetweenTwoLines = useSelector( getMovableNodeRatio )
    const getMovableLineYCordinateFromRedux = useSelector( getMovableLineYCordinate );
    const a = distanceBetween2Points( [ linePoints.x1, linePoints.y1 ], [ linePoints.x1, linePoints.y2 ] ) / 15
    const b = distanceBetween2Points( [ linePoints.x1, linePoints.y2 ], [ linePoints.x2, linePoints.y2 ] ) / 15
    const c = Math.sqrt( a * a + b * b )
    const d = distanceBetween2Points( [ linePoints.x3, linePoints.y3 ], [ linePoints.x3, linePoints.y2 ] ) / 15
    const e = distanceBetween2Points( [ linePoints.x2, linePoints.y2 ], [ linePoints.x3, linePoints.y2 ] ) / 15
    const f = Math.sqrt( d * d + e * e )
    return (
        <div
            style={{
                position: 'absolute',
                top: '0px'
            }}>
            <div className='d-flex flex-direction-row justify-content-between'>
                <Button className="ms-2 bg-danger"
                >x1: {linePoints.x1}</Button>
                <Button className="ms-2 bg-danger"
                >
                    y1: {linePoints.y1}</Button>
                <Button className="ms-2 bg-success"
                >
                    x2: {linePoints.x2}</Button>
                <Button className="ms-2 bg-success"
                >y2: { getMovableLineYCordinateFromRedux}</Button>
                <Button className="ms-2 bg-dark"
                >
                    x3: {linePoints.x3}</Button>
                <Button className="ms-2 bg-dark"
                >y3: {linePoints.y3}</Button>
                <Button className="ms-2"
                >Ratio between Two lines is { c / f }</Button>
                <Button className="ms-2"
                >a Value { c }</Button>
                <Button className="ms-2"
                >b Value { f }</Button>

                {/* <Button className="ms-2"
                >Ratio between Two lines is { ( linePoints.y2 - linePoints.y1 ) / ( linePoints.y3 - linePoints.y2 ) }</Button> */}
                {/* <Button className="ms-2 bg-danger"
                >x difference: { linePoints.x2 - linePoints.x1 }</Button>
                <Button className="ms-2 bg-black"
                >x difference: { linePoints.x3 - linePoints.x2 }</Button> */}
                {/* <Button className="ms-2 bg-danger"
                >x2 : { ( ratioBetweenTwoLines * linePoints.x3 + linePoints.x1 ) / ( 1 + ratioBetweenTwoLines ) }</Button>
                <Button className="ms-2 bg-black"
                >y2 : { ( ratioBetweenTwoLines * linePoints.y3 + linePoints.y1 ) / ( 1 + ratioBetweenTwoLines ) }</Button> */}
            </div>
        </div>

    )
}

export default ButtonComponent