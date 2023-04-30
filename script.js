var socket = io()

var side = 30

function setup() {

        createCanvas(20 * side, 20 * side)

}

socket.on("Winter", function (data) {
        weath = data;
})
socket.on("Summer", function (data) {
        weath = data;

})
socket.on("Autumn", function (data) {
        weath = data;

})
socket.on("Spring", function (data) {
        weath = data;

})


var weath = "spring";

function nkarel(matrix) {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                if (weath == "spring") {
                                        fill("green")
                                } else if (weath == "summer") {
                                        fill("yellow")
                                } else if (weath == "autumn") {
                                        fill("aqua")
                                } else if (weath == "winter") {
                                        fill("white")
                                }

                        } else if (matrix[y][x] == 2) {
                                fill("yellow")
                        }
                        else if (matrix[y][x] == 3) {
                                fill("red")
                        } else if (matrix[y][x] == 4) {
                                fill("orange")

                        } else if (matrix[y][x] == 5) {
                                fill("blue")
                        } else if (matrix[y][x] == 6) {
                                fill("white")
                        }
                        else {
                                fill("gray")
                        }
                        rect(x * side, y * side, side, side)

                }
        }




}



socket.on('send matrix', nkarel)

function Winter() {
        socket.emit("winter")
}
function Summer() {
        socket.emit("summer")
}
function Autumn() {
        socket.emit("autumn")
} function Spring() {
        socket.emit("spring")
}


const ButtonForAddChar = document.getElementsByClassName("button")


ButtonForAddChar[0].addEventListener('click', function () {
        socket.emit("send button", 1)
})
ButtonForAddChar[1].addEventListener('click', function () {
        socket.emit("send button", 2)
})
ButtonForAddChar[2].addEventListener('click', function () {
        socket.emit("send button", 3)
})
ButtonForAddChar[3].addEventListener('click', function () {
        socket.emit("send button", 4)
})
ButtonForAddChar[4].addEventListener('click', function () {
        socket.emit("send button", 5)
})
ButtonForAddChar[5].addEventListener('click', function () {
        socket.emit("send button", 6)
})