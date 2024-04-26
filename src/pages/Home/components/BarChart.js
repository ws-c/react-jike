import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const BarChart = ({title, xData, sData, style={ width: '400px', height: '300px' }}) => {
  // 使用useRef创建一个对DOM元素的引用
  const chartRef = useRef(null)
  useEffect(() => {
    // 1. 生成实例
    const myChart = echarts.init(chartRef.current)
    // 2. 准备图表参数
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: sData,
          type: 'bar'
        }
      ]
    }
    // 3. 渲染参数
    myChart.setOption(option)
  }, [xData, sData, title])

  return (
    <div>
      <div ref={chartRef} style={style}/>
    </div >
  )
}

export default BarChart