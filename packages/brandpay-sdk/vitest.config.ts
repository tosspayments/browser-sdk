import { defineProject, mergeConfig } from 'vitest/config';
import baseConfig from '../../vitest.config';

export default mergeConfig(
  baseConfig,
  defineProject({
    test: {
      environment: 'happy-dom',
      setupFiles: ['./vitest.setup.ts'],
    },
  })
);
