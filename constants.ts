import { INITIAL_STAFF } from './utils/initialData';
import { StaffMember } from './types';

// This file is kept for backward compatibility but should be considered deprecated.
// Data is now managed via localStorage in utils/storage.ts
export const STAFF_DATA: StaffMember[] = INITIAL_STAFF;