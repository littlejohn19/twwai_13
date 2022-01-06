import paramEndpoint from './param.endpoint';
import userEndpoint from './user.endpoint';

const routes = function (app) {
    paramEndpoint(app);
    userEndpoint(app);
};

export default routes;
