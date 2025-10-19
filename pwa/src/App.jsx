import { useEffect } from 'react'
import Navigation from './Routes/Navigation'
import { useLanguageStore } from './stores/languageStore'
import './App.css'

export default function App() {
  const { initializeLanguage } = useLanguageStore();

  //Inicializar el idioma al cargar la aplicación
  useEffect(() => {
    initializeLanguage();
  }, []);

  return <Navigation />;
}