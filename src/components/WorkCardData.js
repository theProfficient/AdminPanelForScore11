import game1 from "../assets/cricket.jpg"
import game2 from "../assets/snakeLadder.jpg"
import game3 from "../assets/tictactoe1.jpg"
import game4 from "../assets/airHockey1.jpg";

const gamesCardData = [
    {
        imgsrc: game1,
        title:"Cricket",
        view:"/games/cricket",
        Groups:"/games/cricket/Groups"
    },

    {
        imgsrc: game2,
        title:"SnakeLadder",
        view:"/games/snakeLadder",
        Groups:"/games/snakeLadder/Groups"
    },

    {
        imgsrc: game3,
        title:"TicTacToe",
        view:"/TicTacToe",
        Groups:"/games/TicTacToe/Groups"
    },

    {
        imgsrc: game4,
        title:"AirHockey",
        view:"AirHockey",
        Groups:"/games/AirHockey/Groups"
    },

]

export default gamesCardData;