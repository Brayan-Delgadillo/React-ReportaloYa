import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Reportes from './components/Reportes';
import Inicio from './components/Inicio';
import Formulario from './components/Formulario';
import ReportesColegios from './components/ReportesColegios';
import ReportesGrados from './components/ReportesGrados';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/reportes-colegios" element={<ReportesColegios />} />
          <Route path="/reportes-grados" element={<ReportesGrados />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;