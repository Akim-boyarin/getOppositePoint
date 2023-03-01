class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distanceBetweenPoints(pointOne, pointTwo) {
        let { x: x1, y: y1 } = pointOne;
        let { x: x2, y: y2 } = pointTwo;

        let distance = Math.hypot((x2 - x1), (y2 - y1));

        return distance;
    }
    static solveQuadraticEquation(A, B, C) {
        let roots = null;
        let D = B ** 2 - 4 * A * C;

        if (D > 0) {
            let x1 = (-1 * B + D ** 0.5) / (2 * A);
            let x2 = (-1 * B - D ** 0.5) / (2 * A);

            roots = [x1, x2];
        } else if (D === 0) {
            let x = (-1 * B) / (2 * A);

            roots = [x];
        }

        return roots;
    }
    static getOppositePoint(startPoint, circleCenter) {
        let { x: xStart, y: yStart } = startPoint;
        let { x: xCircleCenter, y: yCircleCenter } = circleCenter;

        // радиус окружности
        let radius = Point.distanceBetweenPoints(startPoint, circleCenter);

        // нахожу xToFind - пересечения окружности и прямой y = yStart, отличное от xStart, если точки две
        let Ax = 1;
        let Bx = -2 * xCircleCenter;
        let Cx = xCircleCenter ** 2 + (yStart - yCircleCenter) ** 2 - radius ** 2;
        
        let xRoots = Point.solveQuadraticEquation(Ax, Bx, Cx);
        
        let xToFind = 0;
        if (xRoots.length === 2) {
            xToFind = xRoots.find(x => x !== xStart);
        } else {
            xToFind = xRoots[0];
        }

        // нахожу yToFind - пересечение окружности и прямой x = xToFind, отличное от yStart, если точки две
        let Ay = 1;
        let By = -2 * yCircleCenter;
        let Cy = yCircleCenter ** 2 + (xToFind - xCircleCenter) ** 2 - radius ** 2;

        let yRoots = Point.solveQuadraticEquation(Ay, By, Cy);

        let yToFind = 0;
        if (yRoots.length === 2) {
            yToFind = yRoots.find(y => y !== yStart);
        } else {
            yToFind = yRoots[0];
        }

        let oppositPoint = new Point(xToFind, yToFind);
        return oppositPoint;
    }
}


let A = new Point(2, 3);
let O = new Point(5, 6);

let B = Point.getOppositePoint(A, O);
console.log(B);