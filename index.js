
function handleFormSubmit(event) {
  event.preventDefault();

  const username = event.target.username.value;
  const email = event.target.email.value;
  const phone = event.target.phone.value;

  const userDetails = {
      email,
      username,
      phone,
  };

  
  localStorage.setItem(userDetails.email, JSON.stringify(userDetails));

  
  showUserOnScreen(userDetails);

  
  event.target.username.value = "";
  event.target.email.value = "";
  event.target.phone.value = "";
}

function showUserOnScreen(userDetails) {
  const parentElem = document.getElementById("listOfitems");

  
  if (document.getElementById(userDetails.email)) {
      alert("This email is already in the list. Please use a different email.");
      return;
  }

  const childElem = document.createElement("li");
  childElem.id = userDetails.email; 
  childElem.textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`;

  
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => {
     
      localStorage.removeItem(userDetails.email);

     
      parentElem.removeChild(childElem);
  };

  
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.onclick = () => {
      
      localStorage.removeItem(userDetails.email);

     
      parentElem.removeChild(childElem);

      const usernameInput = document.querySelector("[name='username']");
      const emailInput = document.querySelector("[name='email']");
      const phoneInput = document.querySelector("[name='phone']");

      usernameInput.value = userDetails.username;
      emailInput.value = userDetails.email;
      phoneInput.value = userDetails.phone;
  };

 
  childElem.appendChild(deleteButton);
  childElem.appendChild(editButton);

  
  parentElem.appendChild(childElem);
}


module.exports = handleFormSubmit;
