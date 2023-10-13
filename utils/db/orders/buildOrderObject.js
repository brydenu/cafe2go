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

    const { columns, values } = buildOrderQuery(data);

    for (let i = 0; i < columns.length; i++) {
        orderObject[columns[i]] = values[i];
    }
    // console.log("orderObject", orderObject);
    return orderObject;
}
