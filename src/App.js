import React, { useState, useEffect, useCallback, useContext, useMemo, useRef, useReducer, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const UserContext = createContext();
const initialState = { count: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
};

const useServices = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    setServices([
      { title: 'Diagnostyka komputerowa', description: 'Nowoczesny sprzęt – odczyt błędów, eliminacja problemów.' },
      { title: 'Naprawy mechaniczne', description: 'Silnik, zawieszenie, hamulce – ogarniemy wszystko.' },
      { title: 'Serwis klimatyzacji', description: 'Napełnianie, odgrzybianie, szczelność układu.' },
      { title: 'Diagnostyka komputerowa', description: 'Nowoczesny sprzęt – odczyt błędów, eliminacja problemów.' },
    ]);
  }, []);

  return services;
};

function Heading() {
  return (
    <header>
      <div className="up-logo">
        <h1 className="logo">
          <Link to="/">Piękny <span>wóz</span></Link>
        </h1>
        <nav>
          <ul className="up-menu">
            <li><Link to="/">Start</Link></li>
            <li><Link to="/repairs">Moje naprawy</Link></li>
            <li><Link to="/new">Nowa wizyta</Link></li>
            <li><Link to="/profile">Mój profil</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function ServiceList({ services }) {
  return (
    <section className="services">
      <div className="container services-grid">
        {services.map((s, i) => (
          <div className="service-card" key={i}>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Home() {
  const services = useServices();

  return (
    <>
      <section className="hero">
        <div className="container">
          <h2>Witaj w warsztacie Piękny wóz!</h2>
          <p>Zadbamy o Twoje auto – szybko, profesjonalnie<br />i z najlepszą jakością na rynku!</p>
          <Link to="/new" className="btn-primary">Umów nową wizytę</Link>
        </div>
      </section>
      <ServiceList services={services} />
    </>
  );
}

function Profile() {
  const { user } = useContext(UserContext);
  return <h2>Witaj, {user}! To jest Twój profil.</h2>;
}

function Repairs() {
  return <h2>Lista Twoich napraw</h2>;
}

function NewVisit() {
  const formRef = useRef();
  const [form, setForm] = useState({ Marka: '', Model: '', plateNumber: '', Owner: '', Notatka: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formularz dodany:', form);
    setForm({ Marka: '', Model: '', plateNumber: '', Owner: '', Notatka: '' });
    formRef.current.reset();
  };

  return (
    <div className="new-visit-container">
      <h1>Aby umówić wizyte proszę uzupełnić formularz</h1>
      <form className="add-car-form" onSubmit={handleSubmit} ref={formRef}>
        {['Marka', 'Model', 'Numer rejestracyjny', 'Właściciel', 'Notatka'].map(field => (
          <label key={field}>{field}: <input required value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} /></label>
        ))}
        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer-wrapper">
        <ul>
          <li><Link to="/regulamin">Regulamin warsztatu</Link></li>
        </ul>
        <ul className="footer-links">
          <li><Link to="/kontakt">Kontakt</Link></li>
        </ul>
      </div>
    </footer>
  );
}

function Regulamin() {
  return (
    <section className="kontakt-section">
      <div className="container">
        <h1>Regulamin warsztatu</h1>
        <p>Zapoznaj się z zasadami korzystania z naszych usług:</p>
        <ul>
          <li>Umówione wizyty prosimy odwoływać z 24h wyprzedzeniem.</li>
          <li>Gwarancja na wykonaną usługę wynosi 6 miesięcy.</li>
          <li>Nie ponosimy odpowiedzialności za rzeczy pozostawione w pojeździe.</li>
          <li>Płatność możliwa gotówką lub kartą po wykonaniu usługi.</li>
        </ul>
        <p>Dziękujemy za przestrzeganie regulaminu. Ułatwia nam to świadczenie usług na najwyższym poziomie!</p>
      </div>
    </section>
  );
}

function Kontakt() {
  return (
    <section className="kontakt-section">
      <div className="container">
        <h1>Dane kontaktowe warsztatu</h1>
        <p>Masz pytania? Skontaktuj się z nami:</p>

        <ul>
          <li><strong>Adres:</strong> ul. Mechaników 12, 00-001 Warszawa</li>
          <li><strong>Telefon:</strong> +48 123 456 789</li>
          <li><strong>Email:</strong> kontakt@pieknywoz.pl</li>
          <li><strong>Godziny otwarcia:</strong> Pon-Pt 8:00–18:00</li>
        </ul>

        <p>Zapraszamy również do odwiedzenia naszego warsztatu osobiście lub kontaktu za pośrednictwem formularza online!</p>
      </div>
    </section>
  );
}
function NotFound() {
  return <h2>404 - Nie znaleziono</h2>;
}

function App() {
  const [user] = useState('Jan Kowalski');
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <div className="App">
          <Heading />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/repairs" element={<Repairs />} />
            <Route path="/new" element={<NewVisit />} />
            <Route path="/regulamin" element={<Regulamin />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;