import { TenantConfig } from '../domain/saas/tenant.config';

const defaultId = 'default';

export const SAAS_CONFIG: TenantConfig = {
  id: defaultId,
  business: {
    name: "Ro's Pruebas",
    ownerName: 'Rosi',
    instagram: 'ros.peluqueros',
    facebook: 'ros.peluqueros',
    currency: 'EUR',
    currencySymbol: '€',
    opinionsUrl:
      'https://www.google.com/search?client=ubuntu-sn&hs=l6U&sca_esv=f4f4d625b74d76fe&channel=fs&tbm=lcl&sxsrf=AE3TifM_mpB4Ebr-Yc9SHHYNBnaIBQxHOw:1761821391581&q=Ro%27s+Peluqueros+Rese%C3%B1as&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxK2MDIytTQ1NDYyMDO2NDExMrcw3MDI-IpRIihfvVghIDWntLA0tSi_WCEotTj18MbE4kWsOKUACtvZTFAAAAA&rldimm=8225951320639442781&hl=es-ES&sa=X&ved=2ahUKEwjWv8-R4MuQAxUEUaQEHZEqAEAQ9fQKegQIRRAF&biw=1600&bih=778&dpr=1.2#lkt=LocalPoiReviews',
  },
  theme: {
    colors: {
      primary: '#e673B4',
      primaryLight: '#e673B4',
      primaryLighter: '#fce8ed',
      primaryDark: '#d4708f',
      secondary: '#aca7a3',
      accent: '#ef51aA',
      background: '#ffffff',
      backgroundSecondary: '#f0f4f8',
      text: '#3d4a56',
      border: '#cbd5e0',
      secondaryDark: '#3d4a56',
      secondaryLight: '#8a9ba8',
      backgroundSection: '#e8eff5',
      backgroundCalendar: '#EA76B8',
      backgroundAccent: '#e88fa7',
      borderAccent: '#f5c5d4',
      textPink: '#dc5b7d',
    },
    fonts: {
      main: "'Roboto', sans-serif",
      headings: "'Montserrat', sans-serif",
    },
  },
  database: {
    collections: {
      appointments: '/appointments',
      barberSelection: '/business/barbers',
      barbers: '/business/barbers/barber',
      contactInfo: '/business/contactInfo',
      schedule: '/business/schedule',
      exceptions: '/business/schedule/exceptions',
      reservedSlots: '/business/schedule/reservedSlots',
      services: '/services',
    },
    storage: {
      general: '/data/',
    },
  },
  features: {
    enableOnlineBooking: true,
    enableReviews: true,
    enableGallery: true,
    maintenanceMode: false,
    enableSms: true,
  },
};
