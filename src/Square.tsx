import { Grid, Box, IconButton, Button } from "@mui/material";
import React from 'react'
// import { PanoramaFishEye, Close } from "@mui/icons-material";

type Props = {
	value: number,
	onClick: () => void
}

export default function Square({value, onClick}: Props) {
	// console.log("value", props.value)
	return (
		<Button onClick={onClick} sx={{ height: 50, width: 50 }} variant="outlined">
			{
				value > 0 && (value == 1 ? 'X' : 'O')
			}
		</Button>
	);
}