import { Grid, Box, IconButton, Button } from "@mui/material";
// import { PanoramaFishEye, Close } from "@mui/icons-material";

export default function Square(props) {
	// console.log("value", props.value)
	return (
		<Button onClick={props.onClick} sx={{ height: 30, width: 30 }} variant="outlined">
			{props.value}
		</Button>
	);
}