export const updateItem = (item,prop) => ({...item,...prop});
export const updateData = (data,update) => data.map((item)=> item.id === update.id ? update : item);
