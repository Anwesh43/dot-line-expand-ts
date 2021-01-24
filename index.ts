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