// Data structure to represent a move
class Move {
  constructor(move, parent = null) {
    this.move = move;
    this.parent = parent;
  }
}
// Expanding moves
function expandMoves(p) {
  const moves = [];
  // Possible valid moves
  if (p[1] + 2 < 8) {
    if (p[0] - 1 >= 0) moves.push([p[0] - 1, p[1] + 2]);
    if (p[0] + 1 < 8) moves.push([p[0] + 1, p[1] + 2]);
  }
  if (p[0] - 2 >= 0) {
    if (p[1] + 1 < 8) moves.push([p[0] - 2, p[1] + 1]);
    if (p[1] - 1 >= 0) moves.push([p[0] - 2, p[1] - 1]);
  }
  if (p[0] + 2 < 8) {
    if (p[1] + 1 < 8) moves.push([p[0] + 2, p[1] + 1]);
    if (p[1] - 1 >= 0) moves.push([p[0] + 2, p[1] - 1]);
  }
  if (p[1] - 2 >= 0) {
    if (p[0] - 1 >= 0) moves.push([p[0] - 1, p[1] - 2]);
    if (p[0] + 1 < 8) moves.push([p[0] + 1, p[1] - 2]);
  }
  return moves;
}
// Checking if two moves are equal
function equalMoves(move1, move2) {
  return move1[0] === move2[0] && move1[1] === move2[1];
}
// checking is a move is in `visted`
function isVisited(visited, frontMove) {
  for (let i in visited) if (equalMoves(visited[i], frontMove)) return true;
  return false;
}

function knightMoves(source, destination) {
  const queue = [];
  const visited = [];
  const solution = [];

  queue.push(new Move(source));
  // Until Queue is empty
  while (queue.length) {
    let front = queue.shift();
    // Checking and skiping if front is visited already
    if (isVisited(visited, front.move)) continue;
    else visited.push(front.move);
    // Checking if destination
    if (equalMoves(front.move, destination)) {
      while (front) {
        // Backtracking the solution
        solution.unshift(front.move);
        front = front.parent;
      }
    } else {
      expandMoves(front.move).forEach((move) => {
        const child = new Move(move, front);
        queue.push(child);
      });
    }
  }
  // Logging solution
  console.log(`You made it in ${solution.length} moves!  Here's your path:`);
  solution.forEach((move) => console.log(move));
  // For future development
  return solution;
}

knightMoves([1, 0], [1, 7]);
// You made it in 6 moves!  Here's your path:
// [ 1, 0 ]
// [ 0, 2 ]
// [ 1, 4 ]
// [ 0, 6 ]
// [ 2, 5 ]
// [ 1, 7 ]