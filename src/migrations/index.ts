import * as migration_20250928_142454_Users from './20250928_142454_Users';

export const migrations = [
  {
    up: migration_20250928_142454_Users.up,
    down: migration_20250928_142454_Users.down,
    name: '20250928_142454_Users'
  },
];
