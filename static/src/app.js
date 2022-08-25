import page from './lib/page.mjs';
import { addRender } from './middlewares/render.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';


import * as users from './api/users.js'
import { addLogout } from './middlewares/logout.js';
import { addSession } from './middlewares/session.js';
import { registerView } from './views/register.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
window.users = users;
const main = document.getElementById('main');

page(addSession());
page(addLogout());
page(addRender(main))
page('/index.html', '/');
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/games', catalogView);
page('/create', createView);
page('/games/:id', detailsView);
page.start();


