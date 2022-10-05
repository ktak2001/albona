import Square from "./Square";
import React from 'react'

export type Props = {
	squares: Array<number>,
	onClick: (num: number) => void
}

const Board = ({squares, onClick}: Props) => {
	// console.log(props)
	const renderSquare = (i: number): JSX.Element =>
		<Square
			value={squares[i]}
			onClick={() => onClick(i)}
		/>

	const BoardRow = (i: number) => <div className="board-row">
		{renderSquare(i * 3)}
		{renderSquare(i * 3 + 1)}
		{renderSquare(i * 3 + 2)}
	</div>

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