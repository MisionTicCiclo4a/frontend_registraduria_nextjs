export const getData = async (token, url) => { 

  const rawResponse = await fetch(url, { 
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
  });
  const data = await rawResponse.json();
  return data
};

export const createData = async(token, url, info) =>{ // Crear data
  const rawResponse = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify(info),
  });
  const content = await rawResponse.json();

}

export const updateData = async(token, url, id, info )=>{ // Actualiza Data
  const rawResponse = await fetch(`${url}/${id}`, {
  method: 'PUT',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, 
  },
  body: JSON.stringify(info),
})
const data = await rawResponse.json();
return data
}

export const deleteData = async(token, url, id)=>{ //Elimina DataF
  const rawResponse=await fetch(`${url}/${id}`, {
  method: 'DELETE',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, 
  },
})
const data = await rawResponse.json();

}