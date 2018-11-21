import React from 'react'
import { Link } from 'react-router-dom'
import './Player.css'

class Player extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			items: [],
		}
	}

	render() {
		return (
			<div className="Player">
				<div className="Title">
				<span>破车推荐</span>
				</div>
				<div className="Control"></div>
			</div>
		)
	}
}
export default Player