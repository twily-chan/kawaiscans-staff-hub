import { INITIAL_STAFF, INITIAL_MASCOT, DATA_VERSION } from './initialData';
import { StaffMember, MascotData } from '../types';

const STAFF_KEY = 'kawai_staff_data';
const MASCOT_KEY = 'kawai_mascot_data';
const VERSION_KEY = 'kawai_data_version';

// Initialize storage with defaults if empty OR if version mismatch
export const initStorage = () => {
  const storedVersion = localStorage.getItem(VERSION_KEY);
  const hasData = localStorage.getItem(STAFF_KEY);

  // If version changed (new deployment) or no data exists, reset to defaults
  if (storedVersion !== DATA_VERSION || !hasData) {
    console.log(`Version mismatch or no data. Resetting to ${DATA_VERSION}`);
    localStorage.setItem(STAFF_KEY, JSON.stringify(INITIAL_STAFF));
    localStorage.setItem(MASCOT_KEY, JSON.stringify(INITIAL_MASCOT));
    localStorage.setItem(VERSION_KEY, DATA_VERSION);
    window.dispatchEvent(new Event('storage'));
  }
};

export const getStaffData = (): StaffMember[] => {
  initStorage();
  const data = localStorage.getItem(STAFF_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveStaffData = (data: StaffMember[]) => {
  localStorage.setItem(STAFF_KEY, JSON.stringify(data));
  // Dispatch a custom event so components can listen to changes if needed across tabs
  window.dispatchEvent(new Event('storage'));
};

export const getMascotData = (): MascotData => {
  initStorage();
  const data = localStorage.getItem(MASCOT_KEY);
  return data ? JSON.parse(data) : INITIAL_MASCOT;
};

export const saveMascotData = (data: MascotData) => {
  localStorage.setItem(MASCOT_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('storage'));
};