const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');

const organizationForAuthRoutes = require('./routes/organizationLogin');

const openaiRoutes = require('./routes/openai');

const usersRoutes = require('./routes/users');

const activitiesRoutes = require('./routes/activities');

const categoriesRoutes = require('./routes/categories');

const contactsRoutes = require('./routes/contacts');

const dealsRoutes = require('./routes/deals');

const email_campaignsRoutes = require('./routes/email_campaigns');

const leadsRoutes = require('./routes/leads');

const reportsRoutes = require('./routes/reports');

const tasksRoutes = require('./routes/tasks');

const tenantsRoutes = require('./routes/tenants');

const rolesRoutes = require('./routes/roles');

const permissionsRoutes = require('./routes/permissions');

const tenantRoutes = require('./routes/tenant');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Jonzey CRM',
      description:
        'Jonzey CRM Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.enable('trust proxy');

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/activities',
  passport.authenticate('jwt', { session: false }),
  activitiesRoutes,
);

app.use(
  '/api/categories',
  passport.authenticate('jwt', { session: false }),
  categoriesRoutes,
);

app.use(
  '/api/contacts',
  passport.authenticate('jwt', { session: false }),
  contactsRoutes,
);

app.use(
  '/api/deals',
  passport.authenticate('jwt', { session: false }),
  dealsRoutes,
);

app.use(
  '/api/email_campaigns',
  passport.authenticate('jwt', { session: false }),
  email_campaignsRoutes,
);

app.use(
  '/api/leads',
  passport.authenticate('jwt', { session: false }),
  leadsRoutes,
);

app.use(
  '/api/reports',
  passport.authenticate('jwt', { session: false }),
  reportsRoutes,
);

app.use(
  '/api/tasks',
  passport.authenticate('jwt', { session: false }),
  tasksRoutes,
);

app.use(
  '/api/tenants',
  passport.authenticate('jwt', { session: false }),
  tenantsRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  rolesRoutes,
);

app.use(
  '/api/permissions',
  passport.authenticate('jwt', { session: false }),
  permissionsRoutes,
);

app.use(
  '/api/tenant',
  passport.authenticate('jwt', { session: false }),
  tenantRoutes,
);

app.use(
  '/api/openai',
  passport.authenticate('jwt', { session: false }),
  openaiRoutes,
);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes,
);

app.use('/api/org-for-auth', organizationForAuthRoutes);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
