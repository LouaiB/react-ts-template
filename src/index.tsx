import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import FullLayout from './components/_layout/FullLayout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import appTheme from './configs/appTheme';
import { createStore } from 'redux';
import AllReducers from './store/reducers/_all.reducers';
import { Provider } from 'react-redux';

// <> MUI Theme
const theme = createTheme(appTheme);

// <> Redux Store
const reduxStore = createStore(
	AllReducers,
	// @ts-ignore
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// <> Create React DOM Root
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

// <> Render
root.render(
	<React.StrictMode>
		<Provider store={reduxStore}>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="login" element={<Login />} />
					<Route path="/" element={<FullLayout />}>
						<Route index element={<Homepage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.info);
