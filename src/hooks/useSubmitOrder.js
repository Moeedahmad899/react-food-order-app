import { useMutation } from "@tanstack/react-query";
import { submitOrders } from "../api/orders";


export function useSubmitOrder(){
    return useMutation({
        mutationFn: submitOrders
    })
}