var express = require('express');
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var fs = require("fs");


app.use(express.static("."))

app.get('/', function (req, res) {
        res.redirect('index.html')
})

server.listen(3000, function () {
        console.log("Server is run");
})

function matrixGenerator(matrixSize, grass, grassEater, predator, hunter, wolf, doctor) {
        var matrix = []
        ////  matrix սարքելու հատված
        for (let i = 0; i < matrixSize; i++) {
                matrix.push([])
                for (let j = 0; j < matrixSize; j++) {
                        matrix[i].push(0)
                }
        }

        // 1 -եր այսինքն խոտեր քցելու հատված մատռիքսում
        for (let i = 0; i < grass; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 1
        }
        //GrassEater 2

        for (let i = 0; i < grassEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 2
        }
        //3 predator


        for (let i = 0; i < predator; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 3
        }
        //4 hunter
        for (let i = 0; i < hunter; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 4
        }
        //5 wolf
        for (let i = 0; i < wolf; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 5
        }
        //6 doctor
        for (let i = 0; i < doctor; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 6
        }

        return matrix
}

matrix = matrixGenerator(20, 15, 10, 10, 10, 11, 5)

io.sockets.emit('send matrix', matrix)

grassArr = []
grassEaterArr = []
predatorArr = []
hunterArr = []
wolfArr = []
doctorArr = []

Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Hunter = require("./hunter")
Wolf = require("./wolf")
Doctor = require("./doctor")


function AddCharr(a) {

        let x = Math.floor(Math.random() * matrix[0].length)
        let y = Math.floor(Math.random() * matrix.length)

        matrix[y][x] = a

        if (a == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
        } else if (a == 2) {
                var grEat = new GrassEater(x,y)
                grassEaterArr.push(grEat)
        } else if (a == 3) {
                var pre = new Predator(x,y)

                predatorArr.push(pre)
        } else if (a == 4) {
                var hunterArr = new Hunter(x,y)
                hunterArr.push(hunter)
        } else if (a == 5) {
                var wolf = new Wolf(x,y)
                wolfArr.push(wolf)
        } else if (a == 6) {
                var doctor = new Doctor(x,y)
                doctorArr.push(doctor)
        }

}

function createObject() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if (matrix[y][x] == 2) {
                                let grEat = new GrassEater(x, y)
                                grassEaterArr.push(grEat)
                        } else if (matrix[y][x] == 3) {
                                let pre = new Predator(x, y)
                                predatorArr.push(pre)
                        } else if (matrix[y][x] == 4) {
                                let hunt = new Hunter(x, y)
                                hunterArr.push(hunt)

                        } else if (matrix[y][x] == 5) {
                                let wolf = new Wolf(x, y)
                                wolfArr.push(wolf)

                        } else if (matrix[y][x] == 6) {
                                let doctor = new Doctor(x, y)
                                doctorArr.push(doctor)

                        }


                }
        }
        io.sockets.emit('send matrix', matrix)
}

function game() {
        for (let i in grassArr) {
                grassArr[i].mul()
        }


        for (let i in grassEaterArr) {
                grassEaterArr[i].eat()
        }



        for (let i in predatorArr) {
                predatorArr[i].eat()

        }

        for (let i in hunterArr) {
                hunterArr[i].eat()
        }
        for (let i in wolfArr) {
                wolfArr[i].eat()
        }
        io.sockets.emit('send matrix', matrix)

}



setInterval(game, 400)
var weath;

function Winter() {
        weath = "winter"
        io.sockets.emit("Winter", weath)
}
function Autumn() {
        weath = "autumn"
        io.sockets.emit("Autumn", weath)
}
function Summer() {
        weath = "summer"
        io.sockets.emit("Summer", weath)
        console.log(weath);

}
function Spring() {
        weath = "spring"
        io.sockets.emit("Spring", weath)
}

io.on('connection', function (socket) {
        createObject()
        socket.on("winter", Winter);
        socket.on("autumn", Autumn);
        socket.on("summer", Summer);
        socket.on("spring", Spring);




        socket.on("send button", AddCharr)

})


var statistic = {}



setInterval(function () {
        statistic.grass = grassArr.length
        statistic.grassEater = grassEaterArr.length
        statistic.predator = predatorArr.length
        statistic.hunter = hunterArr.length
        statistic.wolf = wolfArr.length
        statistic.doctor = doctorArr.length

        fs.writeFile("statistics.json", JSON.stringify(statistic), function () {
                console.log("statistics");
        })

}, 400)


