
const useGeometrics = () => {
    const geometric = require( "geometric" );
    const distanceBetween2Points = ( node1, node2 ) => {
        console.log( node1, node2 )
        if ( node1 && node2 ) return geometric.lineLength( [ node1, node2 ] );
    }

    const getLineAngle = ( nodes ) => geometric.lineAngle( nodes );

    const getTranslatePoint = ( point, angle, distance ) => geometric.pointTranslate( point, angle, distance );

    const pathMidPoint = ( node1, node2 ) => { if ( node1 && node2 ) return geometric.lineMidpoint( [ node1, node2 ] ); }

    const getRotatedVector = ( vector, origin, diffAngle ) => {
        diffAngle = diffAngle * ( Math.PI / 180 );
        const rotationMatrix = [
            [ Math.cos( diffAngle ), -Math.sin( diffAngle ) ],
            [ Math.sin( diffAngle ), Math.cos( diffAngle ) ]
        ];
        const rotatedNodeCoords = matrixTimesVector( rotationMatrix, [ vector[ 0 ] - origin[ 0 ], vector[ 1 ] - origin[ 1 ] ] );
        return [ rotatedNodeCoords[ 0 ] + origin[ 0 ], rotatedNodeCoords[ 1 ] + origin[ 1 ] ];

    }
    const getScaledVector = ( vector, origin, scaleFactors ) => {
        return [ origin[ 0 ] + ( vector[ 0 ] - origin[ 0 ] ) * scaleFactors[ 0 ], origin[ 1 ] + ( vector[ 1 ] - origin[ 1 ] ) * scaleFactors[ 1 ] ];

    }

    const getDisplacedVector = ( vector, offset ) => {
        return [ vector[ 0 ] + offset[ 0 ], vector[ 1 ] + offset[ 1 ] ];

    }
    const matrixTimesVector = ( matrix, vector ) => {
        let result = [ 0, 0 ];
        if ( !Array.isArray( matrix ) || !Array.isArray( vector ) )
            return undefined;
        matrix.forEach( ( row, indexRow ) => {
            if ( !Array.isArray( row ) )
                return undefined;
            if ( row.length != vector.length )
                return undefined;
            row.forEach( ( element, indexColumn ) => {
                result[ indexRow ] += matrix[ indexRow ][ indexColumn ] * vector[ indexColumn ]
            } );
        } );
        return result;
    }


    const getShapeExtremesFromModel = ( modelClone, shapeKey ) => {
        let leftestX = null;
        let toppestY = null;
        let rightestX = null;
        let bottomestY = null;
        modelClone.shapes[ shapeKey ].forEach( ( nodeKey ) => {
            const node = modelClone.nodes[ nodeKey ];
            const newExtremes = getNewExtremesFromNodeAndOldExtremes( [ leftestX, toppestY, rightestX, bottomestY ], [ node[ 0 ], node[ 1 ] ] );
            leftestX = newExtremes[ 0 ];
            toppestY = newExtremes[ 1 ];
            rightestX = newExtremes[ 2 ];
            bottomestY = newExtremes[ 3 ];
        } );
        return [ leftestX, toppestY, rightestX, bottomestY ];
    }

    const getNewExtremesFromNodeAndOldExtremes = ( oldExtremes, coords ) => {
        let leftestX = oldExtremes[ 0 ];
        let toppestY = oldExtremes[ 1 ];
        let rightestX = oldExtremes[ 2 ];
        let bottomestY = oldExtremes[ 3 ];
        if ( !leftestX )
            leftestX = coords[ 0 ];
        else {
            if ( coords[ 0 ] < leftestX )
                leftestX = coords[ 0 ];
        }
        if ( !toppestY )
            toppestY = coords[ 1 ];
        else {
            if ( coords[ 1 ] < toppestY )
                toppestY = coords[ 1 ];
        }
        if ( !rightestX )
            rightestX = coords[ 0 ];
        else {
            if ( coords[ 0 ] > rightestX )
                rightestX = coords[ 0 ];
        }
        if ( !bottomestY )
            bottomestY = coords[ 1 ];
        else {
            if ( coords[ 1 ] > bottomestY )
                bottomestY = coords[ 1 ];
        }
        return [ leftestX, toppestY, rightestX, bottomestY ];
    }


    return { distanceBetween2Points, getLineAngle, getTranslatePoint, pathMidPoint, getRotatedVector, matrixTimesVector, getScaledVector, getDisplacedVector, getShapeExtremesFromModel, getNewExtremesFromNodeAndOldExtremes };

}

export default useGeometrics;