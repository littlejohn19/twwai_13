import paramDAO from '../DAO/paramDAO';

function create(context) {
    async function query() {
        let result = paramDAO.query();
        if (result) {
            return result;
        }
    }

    async function get(id) {
        let result = await paramDAO.get(id);
        if (result) {
            return result;
        }
    }

    async function getLast() {
        let result = await paramDAO.getLast();
        if (result) {
            return result;
        }
    }

    async function createNewOrUpdate(data) {

        let toSave = {};

        if (data.air) {
            const { air } = data;

            air.forEach(item => {
                if (item.id === 1) {
                    toSave.temp = item.value;
                }
                if (item.id === 2) {
                    toSave.pressure = item.value;
                }
                if (item.id === 3) {
                    toSave.humidity = item.value;
                }
            });
            toSave.extraParam = data.extraParam;
        }

        if (data.temp && data.humidity && data.pressure) {
            toSave = data;
        }

        let result = await paramDAO.createNewOrUpdate(toSave);
        if (result) {
            return result;
        }
    }

    async function search(data) {
        let result = await paramDAO.search(data);
        if (result) {
            return result;
        }
    }

    return {
        query: query,
        get: get,
        createNewOrUpdate: createNewOrUpdate,
        search,
        getLast
    };
}

export default {
    create: create
};
