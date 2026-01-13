import { Routes, Route, HashRouter } from "react-router-dom";
import MainPage from "./main-page/MainPage.tsx";
import './App.scss';

export default function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                </Routes>
          </HashRouter>
        </div>
    )
};
