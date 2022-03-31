import IndexRuns from "./runs/IndexRuns"
const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<h2>Home Page</h2>
			<IndexRuns />
		</>
	)
}

export default Home
