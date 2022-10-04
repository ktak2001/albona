import {useState, useEffect} from 'react';
import Board from "./Board";
import { Grid, Box, IconButton } from "@mui/material";
import { PanoramaFishEye, Close } from "@mui/icons-material";

export default function Game() {
	const [states, setStates] = useState({
		history: [
			{
				squares: Array(9).fill(null)
			}
		],
		stepNumber: 0,
		xIsNext: true
	})
	const [current, setCurrent] = useState({
		squares: Array(9).fill(null)
	});
	const [winner, setWinner] = useState(null);
	const { history, stepNumber, xIsNext } = states;
	useEffect(() => {
		setCurrent(history[stepNumber]);
	}, [history, stepNumber])
	useEffect(() => {
		setWinner(calculateWinner(current.squares));
	}, [current])

	const handleClick= (i) => {
		const changedHist = history.slice(0, stepNumber + 1);
		const squares = changedHist[changedHist.length - 1].squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = xIsNext ? "X" : "O";
		setStates({
			history: changedHist.concat([
				{
					squares
				}
			]),
			stepNumber: changedHist.length,
			xIsNext: !xIsNext
		});
	}

	const moves = history.map((_, move) => {
		// console.log("move", move)
		const jumpTo = (step) => {
			setStates({
				...states,
				stepNumber: step,
				xIsNext: (step % 2) === 0
			});
		}
		const desc = move ?
			'Go to move #' + move :
			'Go to game start';
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		);
	});
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
	};

	let status;
	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
	}

	// console.log("current squares", current.squares)
	return (
		<Box sx={{ width: "100%" }} >
			<Grid xs={12} sx={{ justifyContent: 'center', display: 'flex', fontSize: '30px', paddingY: 2 }} item >
				Tic-Tac-Toe
			</Grid>
			<Grid xs={12} sx={{ justifyContent: 'center', display: 'flex', paddingBottom: 2 }} item >
				<Board
					squares={current.squares}
					onClick={i => handleClick(i)}
				/>
			</Grid>
			<Grid container item xs={12} sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'center' }} >
				<Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex'}} >
					{status}
				</Grid>
				<Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex' }} >
					<ol>{moves}</ol>
				</Grid>
			</Grid>
		</Box>
	);
}