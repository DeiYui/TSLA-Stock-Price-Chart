import { useState, useEffect, useCallback, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'
import './App.css'

function App() {
  const [stockData, setStockData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTimeFrame, setActiveTimeFrame] = useState('daily')
  const [selectedPoint, setSelectedPoint] = useState(null)

  const timeFrames = useMemo(() => [
    { key: 'hourly', label: 'Hourly' },
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' }
  ], [])

  // Memoized chart dimensions
  const chartDimensions = useMemo(() => ({
    height: window.innerWidth < 414 ? 320 : window.innerWidth < 768 ? 380 : 550,
    margin: {
      top: 20,
      right: window.innerWidth < 414 ? 15 : window.innerWidth < 768 ? 20 : 40,
      left: window.innerWidth < 414 ? 35 : window.innerWidth < 768 ? 40 : 60,
      bottom: window.innerWidth < 414 ? 50 : window.innerWidth < 768 ? 60 : 80,
    }
  }), [])

  // Optimized chart click handler with debouncing
  const handleChartClick = useCallback((data, event) => {
    // Clear any existing timeout
    if (window.chartClickTimeout) {
      clearTimeout(window.chartClickTimeout)
    }
    
    window.chartClickTimeout = setTimeout(() => {
      if (data && data.activePayload && data.activePayload[0]) {
        setSelectedPoint(data.activePayload[0].payload)
      }
    }, 50) // 50ms debounce
  }, [])

  // Clear selected point when mouse leaves chart
  const handleMouseLeave = useCallback(() => {
    if (window.chartClickTimeout) {
      clearTimeout(window.chartClickTimeout)
    }
    setTimeout(() => {
      setSelectedPoint(null)
    }, 100)
  }, [])

  const fetchStockData = async (timeFrame) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.get(`https://chart.stockscan.io/candle/v3/TSLA/${timeFrame}/NASDAQ`)
      
      if (response.data && response.data.candles && response.data.candles.length > 0) {
        // Log để debug dữ liệu
        console.log('Raw API data:', response.data.candles.slice(0, 3))
        
        // Transform data for Recharts với validation
        const transformedData = response.data.candles
          .filter(item => item && item.close && item.date) // Lọc dữ liệu lỗi
          .map(item => {
            const price = parseFloat(item.close)
            const date = new Date(item.date)
            
            // Kiểm tra dữ liệu hợp lệ
            if (isNaN(price) || isNaN(date.getTime())) {
              console.warn('Invalid data:', item)
              return null
            }
            
            return {
              date: date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: '2-digit', 
                year: '2-digit' 
              }),
              price: price,
              timestamp: item.date
            }
          })
          .filter(item => item !== null) // Loại bỏ dữ liệu null
        
        console.log('Transformed data:', transformedData.slice(0, 3))
        setStockData(transformedData)
      } else {
        setError('No data available for this timeframe')
      }
    } catch (err) {
      setError(`Failed to fetch data: ${err.message}`)
      console.error('Error fetching stock data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStockData(activeTimeFrame)
  }, [activeTimeFrame])

  const handleTimeFrameChange = (timeFrame) => {
    setActiveTimeFrame(timeFrame)
    setSelectedPoint(null) // Clear selected point when changing timeframe
  }

  return (
    <div className="app">
      <div className="header">
        <h1>TSLA Stock Price Chart</h1>
        <div className="time-frame-buttons">
          {timeFrames.map(({ key, label }) => (
            <button
              key={key}
              className={`time-frame-btn ${activeTimeFrame === key ? 'active' : ''}`}
              onClick={() => handleTimeFrameChange(key)}
              disabled={loading}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-info">
          <p className="data-count">
            Showing {stockData.length} data points • Hover over the chart to see details
            {selectedPoint && (
              <span className="selected-info"> • Selected: {selectedPoint.date} - ${selectedPoint.price.toFixed(2)}</span>
            )}
          </p>
        </div>
        
        {loading && (
          <div className="loading">
            <p>Loading stock data...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>Error: {error}</p>
          </div>
        )}

        {!loading && !error && stockData.length > 0 && (
          <div style={{ 
            width: '100%', 
            minWidth: window.innerWidth < 414 ? '100%' : 'min(1200px, 100vw)',
            maxWidth: '100%',
            overflowX: 'hidden'
          }}>
            <ResponsiveContainer width="100%" height={chartDimensions.height}>
              <LineChart
                data={stockData}
                margin={chartDimensions.margin}
                onClick={handleChartClick}
                onMouseLeave={handleMouseLeave}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: window.innerWidth < 414 ? 8 : window.innerWidth < 768 ? 10 : 12 }}
                  angle={window.innerWidth < 414 ? -70 : window.innerWidth < 768 ? -60 : -45}
                  textAnchor="end"
                  height={window.innerWidth < 414 ? 50 : window.innerWidth < 768 ? 60 : 80}
                  interval={activeTimeFrame === 'hourly' ? Math.max(Math.floor(stockData.length / (window.innerWidth < 414 ? 6 : window.innerWidth < 768 ? 10 : 20)), 0) : 
                           activeTimeFrame === 'daily' ? Math.max(Math.floor(stockData.length / (window.innerWidth < 414 ? 5 : window.innerWidth < 768 ? 8 : 15)), 0) :
                           Math.max(Math.floor(stockData.length / (window.innerWidth < 414 ? 4 : window.innerWidth < 768 ? 6 : 10)), 0)}
                />
                <YAxis 
                  label={{ 
                    value: 'Price ($)', 
                    angle: -90, 
                    position: 'outside',
                    offset: window.innerWidth < 414 ? -25 : window.innerWidth < 768 ? -30 : -40,
                    style: { 
                      textAnchor: 'middle', 
                      fontSize: window.innerWidth < 414 ? '10px' : window.innerWidth < 768 ? '12px' : '14px' 
                    }
                  }}
                  domain={['dataMin - 5', 'dataMax + 5']}
                  width={window.innerWidth < 414 ? 35 : window.innerWidth < 768 ? 40 : 60}
                  tickFormatter={(value) => window.innerWidth < 414 ? `$${Math.round(value)}` : window.innerWidth < 768 ? `$${value.toFixed(0)}` : `$${value.toFixed(2)}`}
                  tick={{ fontSize: window.innerWidth < 414 ? 8 : window.innerWidth < 768 ? 10 : 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
                  labelFormatter={(label) => `Date: ${label}`}
                  contentStyle={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  cursor={{ stroke: '#2563eb', strokeWidth: 1, strokeDasharray: '5 5' }}
                  wrapperStyle={{ outline: 'none' }}
                  animationDuration={100}
                  isAnimationActive={true}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ 
                    r: 5, 
                    fill: '#1d4ed8', 
                    stroke: '#ffffff',
                    strokeWidth: 2
                  }}
                  name="TSLA Price"
                  connectNulls={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
