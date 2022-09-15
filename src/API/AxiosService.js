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
    getUserDetails(data){
        return axiosConfig.get(`User/GetUserDetails?username=${data}`)
    }

    getSelectedItem(data){
        return axiosConfig.get(`Items/GetSelectedItem?id=${data}`);
    }

    createWishListItem(data){
        return axiosConfig.post("WishList/createWishListItem", data);
    }

    getWishList(data){
        return axiosConfig.post("WishList/getWishList", data);
    }

    getWishListContent(data){
        return axiosConfig.post("WishList/getWishListContent", data);
    }

    GetUserOrders(data){
        return axiosConfig.get(`Orders/GetUserOrders?username=${data}`);
    }

    deleteWishListItem(data){
        return axiosConfig.delete("WishList/deleteWishListItem", {data : data});
    }
}
export default new AxiosService();