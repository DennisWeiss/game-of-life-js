(() => {

    const startBtn = document.getElementById('start')
    const canvas = document.getElementById('game-of-life')
    const canvasContext = canvas.getContext('2d')

    const width = 280
    const height = 140

    const scale = 10

    const initializeGrid = (width, height, liveChance) => {
        const grid = []
        for (let i = 0; i < width; i++) {
            const row = []
            for (let j = 0; j < height; j++) {
                row.push(Math.random() < liveChance)
            }
            grid.push(row)
        }
        return grid
    }

    let grid = initializeGrid(width, height, 0)


    const drawGrid = grid => {
        canvasContext.fillStyle = 'black'
        canvasContext.fillRect(0, 0, scale * width, scale * height)
        canvasContext.fillStyle = 'white'
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j]) {
                    canvasContext.fillRect(scale * i, scale * j, scale, scale)
                }
            }
        }
    }

    drawGrid(grid)

    const onClickCanvas = event => {
        const i = Math.floor(event.offsetX / scale)
        const j = Math.floor(event.offsetY / scale)
        grid[i][j] = !grid[i][j]
        drawGrid(grid)
    }

    canvas.onclick = onClickCanvas

    const gameOfLifeUpdate = () => {
        const newGrid = []
        for (let i = 0; i < width; i++) {
            const newRow = []
            for (let j = 0; j < height; j++) {
                if (grid[i][j]) {
                    console.log(i, j)
                }
                let neighborCount = 0
                for (let k = i - 1; k <= i + 1; k++) {
                    for (let l = j - 1; l <= j + 1; l++) {
                        if ((k !== i || l !== j) && k >= 0 && l >= 0 && k < width && l < width && grid[k][l]) {
                            neighborCount++
                        }
                    }
                }
                newRow.push(!grid[i][j] && neighborCount === 3 || grid[i][j] && neighborCount >= 2 && neighborCount <= 3)
            }
            newGrid.push(newRow)
        }
        grid = newGrid
    }

    const update = () => {
        gameOfLifeUpdate()
        drawGrid(grid)
    }

    let running = false

    startBtn.onclick = event => {
        if (!running) {
            setInterval(update, 80)
            running = true
        }
    }


})()