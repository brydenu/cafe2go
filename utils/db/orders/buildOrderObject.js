import buildOrderQuery from "./buildOrderQuery";

export default function buildOrderObject(data) {
    const orderObject = { user_id: data.user_id };
    if (data.user_id === 1) {
        orderObject["guest_name"] = data.guestName;
    }

    if (!!data.favorite_id) {
        const keys = Object.keys(data);
        const values = Object.values(data);

        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === "favorite_id") {
                continue;
            }
            orderObject[keys[i]] = values[i];
        }

        return orderObject;
    }

    console.log("in boo, data", data);
    const buildableData = !!data?.favorite_id ? { drink: data } : data;
    const { columns, values } = buildOrderQuery(buildableData);

    for (let i = 0; i < columns.length; i++) {
        orderObject[columns[i]] = values[i];
    }
    // console.log("orderObject", orderObject);
    return orderObject;
}
