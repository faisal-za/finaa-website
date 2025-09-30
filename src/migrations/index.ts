import * as migration_20250928_142454_Users from './20250928_142454_Users';
import * as migration_20250930_130456 from './20250930_130456';

export const migrations = [
  {
    up: migration_20250928_142454_Users.up,
    down: migration_20250928_142454_Users.down,
    name: '20250928_142454_Users',
  },
  {
    up: migration_20250930_130456.up,
    down: migration_20250930_130456.down,
    name: '20250930_130456'
  },
];
