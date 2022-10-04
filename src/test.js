import {useState, useEffect} from 'react'

const Square = (props) => {
	return (
		<button className='square' onClick={props.onClick}>
			{props.value}
		</button>
	);
}

const Board = (props) => {
	// console.log(props)
	const renderSquare = i =>
	<Square
		value={props.squares[i]}
		onClick={() => props.onClick(i)}
	/>

	const BoardRow = i => <div className="board-row">
		{renderSquare(i * 3)}
		{renderSquare(i * 3 + 1)}
		{renderSquare(i * 3 + 2)}
	</div>

	console.log([...Array(3).keys()])

	return (
		<div>
			Hello World
			{
				[...Array(3).keys()].map(i => {
					return (
					BoardRow(i))})
			}
		</div>
	);
} 

const calculateWinner = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

export default function Game() {
	const [state, setState] = useState({
		history: [
			{
				squares: Array(9).fill(null)
			}
		],
		stepNumber: 0,
		xIsNext: true,
	})
	const { history, stepNumber, xIsNext } = state;
	const current = history[stepNumber];
	const winner = calculateWinner(current.squares);

	const handleClick= (i) => {
		const changedHist = history.slice(0, stepNumber + 1);
		const squares = changedHist[changedHist.length - 1].squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = xIsNext ? "X" : "O";
		setState({
			history: changedHist.concat([
				{
					squares: squares
				}
			]),
			stepNumber: changedHist.length,
			xIsNext: !xIsNext
		});
	}

	const jumpTo = (step) => {
		setState({
			...state,
			stepNumber: step,
			xIsNext: (step % 2) === 0
		});
	}
	const moves = history.map((step, move) => {
		const desc = move ?
			'Go to move #' + move :
			'Go to game start';
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		);
	});

	let status;
	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board
					squares={current.squares}
					onClick={i => handleClick(i)}
				/>
			</div>
			<div className="game-info">
				<div>{status}</div>
				<ol>{moves}</ol>
			</div>
		</div>
	);
}