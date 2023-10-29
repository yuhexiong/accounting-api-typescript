const swaggerOption = {
  info: {
    title: 'Accounting Document',
    version: '1.0.0',
    description: 'Accounting For Record Consumption',
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  baseDir: `${__dirname}/../..`,

  filesPattern: ['./src/**/*.ts', './src/**/*.js'],

  swaggerUIPath: `${process.env.SWAGGER_MOUNT_PATH}`,
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
      description: "Local Server"
    },
  ]
};

export default swaggerOption;
