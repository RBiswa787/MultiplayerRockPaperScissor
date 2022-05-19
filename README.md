# Multiplayer Rock Paper Scissor
### Final Project Submission (to Android Club, VITC)

## Screenshots
<div style="display: flex; justify-content: flex-start">
<img src="https://github.com/RBiswa787/MultiplayerRockPaperScissor/blob/master/assets/img1.png" alt="not available" style="height: 27%; width:32%;margin-right:2%"/>

<img src="https://github.com/RBiswa787/MultiplayerRockPaperScissor/blob/master/assets/img3.png" alt="not available" style="height: 27%; width:32%;"/>

<img src="https://github.com/RBiswa787/MultiplayerRockPaperScissor/blob/master/assets/img2.png" alt="not available" style="height: 27%; width:32%;"/>

<img src="https://github.com/RBiswa787/MultiplayerRockPaperScissor/blob/master/assets/img4.png" alt="not available" style="height: 27%; width:32%;"/>

<img src="https://github.com/RBiswa787/MultiplayerRockPaperScissor/blob/master/assets/img5.png" alt="not available" style="height: 27%; width:32%;"/>
</div>

## Demo
https://youtu.be/uLAfD-t8YzQ

## Description
* A classic rock, paper and scissors game
* Any two remote players can enter a game room and play the game
* Server capable of handling multiple games being played across multiple rooms simultaneously
* Graceful shutdown when a player leaves room
* Latency less than 30ms

## Working
* Uses socket.io to implement real time communication.
* Player 1 opens a room with any room code.
* Sends room code to Player 2.
* Player 2 joins room with given room code. Once both players present in room, game starts.
* Server maintains an instance of game logic against the room code and broadcasts state of game to all sockets belonging to a room. While, each client emits player’s choice to the server. Game logic is entirely handled on server side and client maintains only the present state of game.


