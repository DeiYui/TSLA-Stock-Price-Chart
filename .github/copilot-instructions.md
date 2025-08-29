# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a React application built with Vite for displaying TSLA stock charts. The application includes:

- Four time frame buttons: hourly, daily, weekly, monthly
- A line chart showing stock prices over time using Recharts
- API integration with https://chart.stockscan.io/candle/v3/TSLA/{timeFrame}/NASDAQ
- Use `close` field for stock price values and `date` field for timestamps

Please follow these guidelines:
- Use functional components with React hooks
- Implement proper error handling for API calls
- Use responsive design principles
- Follow modern React best practices
- Use Recharts for visualization components
