import request from './config'
const clients = {
    get_clients: (params) => request.get('/client/all', {params}),
    post_order: (data) => request.post('/order', data),
    delete_order: (id, user_id) => request.delete(`/client?client_id=${id}&owner_id=${user_id}`),
    update_oder: (data) => request.put("/order", data),
}

export default clients;