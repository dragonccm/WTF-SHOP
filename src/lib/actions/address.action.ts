"use server"
import Address from "../models/Address";
const createAddress = async (data: any) => {
    try {
        const newAddress = new Address({
            label: data.label,
            icon: data.icon,
            address: data.address,
            phone: data.phone,
            userId: data.userId
        });
        await newAddress.save();
        return { err: null, res: `đã có ${newAddress}` };
    } catch (error: any) {
        console.error("Error saving user:", error);
        return { err: error.message };
    }
};
const updateAddress = async (data: any) => {
    try {

    } catch (error: any) {
        console.error("Error saving user:", error);
        return { err: error.message };
    }
}
const deleteAddress = async (data: any) => {
    try {

    } catch (error: any) {
        console.error("Error saving user:", error);
        return { err: error.message };
    }
}
const getAddress = async (data: any) => {
    try {

    } catch (error: any) {
        console.error("Error saving user:", error);
        return { err: error.message };
    }
}

export {
    createAddress,
    updateAddress,
    deleteAddress,
    getAddress
};