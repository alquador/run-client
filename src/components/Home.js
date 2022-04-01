import IndexRuns from "./runs/IndexRuns"
const Home = (props) => {
	 const { user, msgAlert } = props
	console.log('props in home', props)

	return (
		<>
			<h2>Home Page</h2>
			<IndexRuns  user={user} msgAlert={msgAlert}/>
		</>
	)
}

export default Home
