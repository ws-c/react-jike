import BarChart from "./components/BarChart"
const Home = () => {
  return (
    <>
      <BarChart 
      title={'三大框架满意度'}
      xData={['vue','react','angular']}
      sData={[300,400,500]}
      />
    </>
  )
}

export default Home