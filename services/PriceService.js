import {PriceModel} from "../models/PriceModel.js";

export const PriceService = {
    async createPrice(body) {
        return PriceModel.create(body)
    }
}
