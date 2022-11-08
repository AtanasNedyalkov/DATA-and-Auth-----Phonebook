function attachEvents() {
 document.getElementById("btnCreate").addEventListener("click", handleCreateRecord)
 document.getElementById("btnLoad").addEventListener("click", onLoadRecord)


 function handleCreateRecord(){
    const personEl = document.getElementById("person")
    const phoneEl = document.getElementById("phone")

    createRecord(personEl.value, phoneEl.value)
    personEl.value = "";
    phoneEl.value = "";
 }

    function  renderRecord(data){
      const ul = document.getElementById("phonebook")
      ul.innerHTML = "";
      Object.values(data).forEach(rec =>{
        const li = document.createElement("li");
        li.textContent = `${rec.person}: ${rec.phone}`;
        li.setAttribute("data-id", rec._id);
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.addEventListener("click", handleDelete);
        li.appendChild(btn)
        ul.appendChild(li)

      });
    }
    function handleDelete(e){
        const li = e.target.parentElement;
        const id = li.getAttribute("data-id")
        deleteRecord(id)
        li.remove();
        

    }
    async function onLoadRecord(){
        const url = `http://localhost:3030/jsonstore/phonebook`;
        const response = await fetch(url);
        const data = await response.json();
        return renderRecord(data);
    }
    async function createRecord(person, phone){
        const url = `http://localhost:3030/jsonstore/phonebook`;
        const body = {
            person,
            phone
        }
        const header =  getHeader("POST", body)
        const response = await fetch(url,header)
        const data = response.json();
        onLoadRecord();
        return data;
    }
    async function deleteRecord(id){
        const url  = `http://localhost:3030/jsonstore/${id}`;
        const header = getHeader("DELETE", null);
        const response = await fetch(url, header);
        const data = response.json();
        return data;
        
    }
    function getHeader(method,body){
        return {
            method: `${method}`,
            header: {
                "Content type": "application/jason"
            },
            body: JSON.stringify(body)
        }
    }
}

attachEvents();