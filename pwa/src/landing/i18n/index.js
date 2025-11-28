import esMX from './es-MX.json';
import enUS from './en-US.json';
import pam from './pam.json';

export const translations = {
  'es-MX': esMX,
  'en-US': enUS,
  'pam': pam,
};

export const supportedLanguages = [
  { code: 'es-MX', name: 'Español (México)' },
  { code: 'en-US', name: 'English (US)' },
  { code: 'pam', name: 'Pame (Ñhä)' },
];