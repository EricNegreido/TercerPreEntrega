import { getProductsService, getProductIdService, addProductService, updateProductService } from "../services/products.services.js";

const getProducts = async (req, res) =>{

    const {page = 1 , limit = 5, sort, query} = req.query;
    try{

        const products = await getProductsService(limit, page, sort, query);
        res.send({status: 'sucess', payload: products});
    }catch(error){
        res.status(500).send({status: 'error', error: error.message})
    }

};
const getProductId = async (req, res) =>{
    const {id} = req.params
    try{
        const products = await getProductIdService(id);
        res.send({status: 'sucess', payload: products});
    }catch(error){
        res.status(500).send({status: 'error', error: error.message})
    }

};

const addProduct = async (req, res) =>{
    const {title, description, price, stock} = req.body
    
    if(!title || !description || !price || !stock){
        return res.status(400).send({status: 'error', error: 'incomplete values'}); 
    }
    try{
        const result = await addProductService({
            title,
            description,
            price,
            stock
        });
        res.status(201).send({status: 'sucess', payload: result}); 

    }catch(error){
        res.status(500).send({status: 'error', error: error.message})
    }
};

const updateProduct = async (req, res) =>{
    const {title, description, price, stock} = req.body

    const {id} = req.params;
    if(!title || !description || !price || !stock){
        return res.status(400).send({status: 'error', error: 'incomplete values'}); 
    }
    
    try{
        const result = await updateProductService(
            id,
            title,
            description,
            price,
            stock
            );
        res.send({status: 'sucess', payload: result});


    }catch(error){
        res.status(500).send({status: 'error', error: error.message})
    }
};

const deleteProduct = async (req, res) =>{
    const {id} = req.params
    try{
        const products = await getProductIdService(id);
        if(products){
            await deleteProductService(id);
            res.send({status: 'sucess', message:'Removed product'});
        }else{
            res.status(404).json({ error: 'Product not found'});
        }
    }catch(error){
        res.status(500).send({status: 'error', error: error.message})
    }

};

export {
    addProduct,
    getProductId,
    getProducts,
    updateProduct,
    deleteProduct
};