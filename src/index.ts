import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';

import SessionConfig from './config/Session';

// Models
import './models/Users';
import './models/Books';
import './models/Media';
import './models/Calendar';

// Routes'
import AuthRoutes from './routes/AuthRoutes';
import UsersRoutes from './routes/UsersRoutes';
import BooksRoutes from './routes/BooksRoutes';
import CalendarRoutes from './routes/CalendarRoutes';
import ConstantsRoutes from './routes/ConstantsRoutes';
import ContactRoutes from './routes/ContactRoutes';

const app = express();

// PORT
app.set('port', process.env.PORT || 8443);

// SETTINGS
app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.json());
app.use(session({
    secret: SessionConfig.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: app.get('env') === 'production' ? true : false }
}));

// ROUTES
app.use('/', AuthRoutes);
app.use('/', UsersRoutes);
app.use('/', BooksRoutes);
app.use('/', CalendarRoutes);
app.use('/', ConstantsRoutes);
app.use('/', ContactRoutes);

const server = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

export default server;