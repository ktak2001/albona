import React from 'react'
import { User } from 'firebase/auth'

export default function Home({ user }: { user: User }) {
	return (
		<div>
			Home
		</div>
	)
}