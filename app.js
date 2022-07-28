const dimensionRange = document.getElementById('myRange')
const display = document.getElementById('display')
const colour = document.getElementById('colourPicker')
let mode = 'fixed'
const randomColour = document.getElementById('randomColour')
randomColour.addEventListener('click',handleClick)



//Change Container display size
let dimension = dimensionRange.value
let paintColour = colour.value
let headClr = document.getElementById('etch')
const showRange = document.querySelector('.rangeDisplay')

function clearCanvas(){
    const canv = document.querySelector('.canvas')
    canv.remove()
}

function drawCanvas(dimension){
    showRange.innerText = `Size: ${dimension} x ${dimension}`
    const canvas = document.createElement('div')
    canvas.classList.add('canvas')
    canvas.style.gridTemplateColumns = `repeat(${dimension},1fr)`
    canvas.style.gridTemplateRows = `repeat(${dimension},1fr)`

    for(let i = 1; i <= (dimension*dimension); i++)
    {
        grid = document.createElement('div')
        grid.classList.add('gridItem')
        canvas.appendChild(grid)
    }
        display.appendChild(canvas)
        const grids = document.querySelectorAll('.gridItem')
        grids.forEach(grid => grid.addEventListener('mousedown',changeColor))
        grids.forEach(grid => grid.addEventListener('mouseover',changeColor))
    }

inputs = document.querySelectorAll('input')
inputs.forEach(input => input.addEventListener('input',handleClick))

function handleClick(event){
    if(this.name === "range"){
        dimension = dimensionRange.value
        clearCanvas()
        drawCanvas(dimension)
    }
    if(this.id === 'randomColour'){
        mode = 'rainbow'
    }
    else{
        mode = 'fixed'
        paintColour = colour.value
    }

}

    const reset = document.getElementById('eraser')
    reset.addEventListener('click', (event) =>{
        const grids = document.querySelectorAll('.gridItem')
        grids.forEach(grid => grid.style.backgroundColor = "var(--clr-frame)")
    })

    let mouseFlag = false
    let colourMode = "fixed"
    document.body.onmousedown = () => mouseFlag = true
    document.body.onmouseup = () => mouseFlag = false


    function changeColor(e){ 
        if(e.type === "mouseover" && !mouseFlag) return
        headClr.style.color = `${paintColour}`
        if(mode === 'rainbow'){
            const RandomR = Math.floor(Math.random()*256)
            const RandomG = Math.floor(Math.random()*256)
            const RandomB = Math.floor(Math.random()*256)
            const RandomRGB = `rgb(${RandomR},${RandomG},${RandomB})`
            paintColour = RandomRGB
        }  
        e.target.style.backgroundColor = `${paintColour}`
    }

    drawCanvas(dimension)