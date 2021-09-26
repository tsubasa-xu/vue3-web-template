import vue from '@vitejs/plugin-vue'

const path = require("path")
const dotenv = require("dotenv")

if (process.env.NODE_ENV) {
  const envPath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    throw result.error;
  }
  const envConfig = result.parsed;
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

export default ({ mode }) => {
  let conf = {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
      }
    },
  };
  if (mode === 'development') {
    conf['server'] = {
      host: '0.0.0.0',
      port: 8000,
      proxy: {
      },
    };

  }
  else if (mode === 'production') {
    conf['logLevel'] = 'error'
  }
  return conf
}
