import axiosConfig from "./axiosConfig";

class AxiosService {
    getAllItems() {
        return axiosConfig.get("Items/GetAllItems")
    }
    register(data) {
        return axiosConfig.post("Authenticate/register", data)
    }
    login(data) {
        return axiosConfig.post("Authenticate/login", data)
    }
    getCategoryItems(data) {
        return axiosConfig.get(`Items/GetCategoryItems?category=${data}`)
    }
    getUserDetails(data) {
        return axiosConfig.get(`User/GetUserDetails?username=${data}`)
    }

    getSelectedItem(data) {
        return axiosConfig.get(`Items/GetSelectedItem?id=${data}`);
    }

    createWishListItem(data) {
        return axiosConfig.post("WishList/createWishListItem", data);
    }

    getWishList(data) {
        return axiosConfig.post("WishList/getWishList", data);
    }

    getWishListContent(data) {
        return axiosConfig.post("WishList/getWishListContent", data);
    }

    GetUserOrders(data) {
        return axiosConfig.get(`Orders/GetUserOrders?username=${data}`);
    }

    deleteWishListItem(data) {
        return axiosConfig.delete("WishList/deleteWishListItem", { data: data });
    }

    createOrder(data) {
        return axiosConfig.post("Orders/CreateOrder", data);
    }

    UpdateUser(data) {
        debugger
        return axiosConfig.put(`User/UpdateUser?id=${data.id}`, data);
    }

    GetAllOrders() {
        return axiosConfig.get("Orders/GetAllOrders");
    }
    CompleteOrder(data) {
        return axiosConfig.post(`Orders/CompleteOrder?orderID=${data}`)
    }
    UpdateItem(data) {
        return axiosConfig.put(`Items/UpdateItem?id=${data.itemID}`, data);
    }
    CreateItem(data) {
        return axiosConfig.post(`Items/CreateItem`, data);
    }
    DeleteItem(data) {
        return axiosConfig.post(`Items/DeleteItem`, data);
    }

    async SaveImage(data) {
        return axiosConfig.post(`Items/SaveImage`, data);
    }
}
export default new AxiosService();