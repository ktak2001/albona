import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material'
import { Menu, AccountCircle } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import {getAuth, signOut} from 'firebase/auth'

export default function NavBar({user}) {
	const auth = getAuth()
	console.log('auth', auth)
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<Menu />
					</IconButton>
					<Button component={Link} sx={{ flexGrow: 1 }} to='/' color='secondary' >
						Home
					</Button>
					{
						!user && (
							<>
							<Button
								component={Link}
								color="inherit"
								to='/login'
							>
								Login
							</Button>
							<Button
								component={Link}
								color="inherit"
								to='/register'
							>
								Register
							</Button>
						</>
						)
					}
					{
						user && (
							<>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								// onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
								<Button onClick={() => signOut(auth)}>
									Log Out
								</Button>
							</>
						)
					}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
