import axios from "axios";

const api =  axios.create({
  baseURL: "http://localhost:4848/api/",
  responseType: "json"
});

export const getItems = async() => {
    const response = await api.get('/menu/getItems')
    return response
}

export const getCategories = async () => {
    try {
        const response = await api.get("/menu/getCategories")
        return response;    
    } catch (error) {
        console.error(error)
    }
}

export const checkOffer = async (data:any) => {
    try {
        const response = await api.post("/order/checkOffer",data)
        return response;
    } catch (error) {
        console.error(error)
    }
}

export const createOrder = async (data: any) => {
    try {
        const response = await api.post("/order/create", data);
        return response;
    } catch (error) {
        console.error(error)
    }
}