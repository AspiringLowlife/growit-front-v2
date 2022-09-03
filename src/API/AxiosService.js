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
}
export default new AxiosService();