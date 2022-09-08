import axiosConfig from "./axiosConfig";

class AxiosService{
    getAllItems(){
        return axiosConfig.get("Items/GetAllItems")
    }
    register(data){
        return axiosConfig.post("Authenticate/register",data)
    }
    login(data){
        return axiosConfig.post("Authenticate/login",data)
    }
    getCategoryItems(data){
        return axiosConfig.get(`Items/GetCategoryItems?category=${data}`)
    }    
    
}
export default new AxiosService();