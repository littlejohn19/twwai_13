import movieDAO from '../DAO/paramDAO';

function create(context) {
    async function query() {
        let result = movieDAO.query();
        if (result) {
            return result;
        }
    }

    async function get(id) {
        let result = await movieDAO.get(id);
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

        let result = await movieDAO.createNewOrUpdate(toSave);
        if (result) {
            return result;
        }
    }

    async function search(data) {
        let result = await movieDAO.search(data);
        if (result) {
            return result;
        }
    }

    return {
        query: query,
        get: get,
        createNewOrUpdate: createNewOrUpdate,
        search
    };
}

export default {
    create: create
};
