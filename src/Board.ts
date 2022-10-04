import Square from "./Square";
import React from 'react'

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

	// console.log([...Array(3).keys()])

	return (
		<div>
			{
				[...Array(3).keys()].map(i => {
					return (
						BoardRow(i))
				})
			}
		</div>
	);
};

export default Board;