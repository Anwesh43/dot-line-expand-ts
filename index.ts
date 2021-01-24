const parts : number = 4 
const w : number = window.innerWidth 
const h : number = window.innerHeight 
const scGap : number = 0.02 / parts 
const strokeFactor : number = 90 
const lines : number = 5  
const ballFactor : number = 8.9 
const lineFactor : number = 1.8 
const delay : number = 20 
const backColor : string = "#bdbdbd"
const colors : Array<string> = [
    "#f44336",
    "#4A148C",
    "#880E4F",
    "#6200EA",
    "#01579B"
] 

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r, 0, 2 * Math.PI)
        context.fill()
    }

    static drawLineDotExpand(context : CanvasRenderingContext2D, scale : number) {
        const sc1 : number = ScaleUtil.divideScale(scale, 0, parts)
        const sc2 : number = ScaleUtil.divideScale(scale, 1, parts)
        const sc3 : number = ScaleUtil.divideScale(scale, 2, parts)
        const gap : number = h / lines 
        const lSize : number = gap / lineFactor 
        const r : number = gap / ballFactor 
        for (var j = 0; j < lines; j++) {
            const sf : number = ScaleUtil.sinify(sc2)
            context.save()
            context.translate(w / 2, h - gap * j)
            DrawingUtil.drawLine(context, 0, -lSize * sc3, 0, -lSize * sc1)
            DrawingUtil.drawCircle(context, (-w * 0.5 - r) * (1 - sf), gap - r, r)
            context.restore()
        }
    }

    static drawLDENode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.fillStyle = colors[i]
        DrawingUtil.drawLineDotExpand(context, scale)
    }
}