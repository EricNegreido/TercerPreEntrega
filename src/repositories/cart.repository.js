import {CartDto} from '../DTOs/dto.js'

export default class CartsRepository {
    constructor(dao){
        this.dao = dao;

    }

    getCart= async (cid) => {
        const result = await this.dao.getArray(cid);
        const obtained = new CartDto(result);
        return obtained;
    }
    createCart = async () => {
        const result = await this.dao.save();
        return result;
    }

    updateCart = async (id, products) => {
        const result = await this.dao.update(id, products);
        return result
    }
    
}