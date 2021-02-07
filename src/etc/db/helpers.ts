import { ObjectId } from "bson";

export default class MongoDbHelpers {
    public static documentId(id: string) {
        if (id) {
            return new ObjectId(id);
        }
        return null;
    }

    public static filters(model: any) {
        if (!model || !(model instanceof Object)) {
            return null;
        }
        const dbModel: any = {};
        const keys = Object.keys(model);

        for (const key of keys) {
            if (model[key]) {
                dbModel[key] = model[key];
            }
        }

        return Object.keys(dbModel).length ? dbModel : null;
    }
}
