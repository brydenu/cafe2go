import buildOrderQuery from "./buildOrderQuery";

export default function buildOrderObject(data) {
  const orderObject = { user_id: data.user_id };
  if (data.user_id === 1) {
    orderObject["guest_name"] = data.guestName;
  }

  const { columns, values } = buildOrderQuery(data);

  for (let i = 0; i < columns.length; i++) {
    orderObject[columns[i]] = values[i];
  }
  // console.log("orderObject", orderObject);
  return orderObject;
}
