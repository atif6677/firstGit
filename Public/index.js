const API_BASE_URL = 'http://localhost:3000/api/users';

async function handleFormSubmit(event) {
  event.preventDefault();

  const username = event.target.username.value;
  const email = event.target.email.value;
  const phone = event.target.phone.value;

  const userDetails = {
    username,
    email,
    phone,
  };

  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Success:', data.message);
      showUserOnScreen(data.user);
      event.target.reset();
    } else {
      console.error('Error:', data.message || 'Failed to add user. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
}

function showUserOnScreen(userDetails) {
  console.log('Attempting to display user:', userDetails);
  const parentElem = document.getElementById('listOfitems');

  const originalEmailFromForm = document.getElementById('email').getAttribute('data-original-email');
  if (originalEmailFromForm && originalEmailFromForm !== userDetails.email) {
    const oldChildElem = document.getElementById(originalEmailFromForm);
    if (oldChildElem) {
      oldChildElem.parentNode.removeChild(oldChildElem);
      console.log('Removed old list item for email:', originalEmailFromForm);
    }
  }

  let childElem = document.getElementById(userDetails.email);

  if (childElem) {
    childElem.querySelector('span').textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`;
    console.log('Updated existing user item:', userDetails.email);
  } else {
    childElem = document.createElement('li');
    childElem.id = userDetails.email;
    // Removed all Tailwind classes here to ensure no styling interference
    parentElem.appendChild(childElem);
    console.log('Created new user item and appended:', userDetails.email);
  }

  // Ensure content is set clearly
  childElem.innerHTML = `
    <span>${userDetails.username} - ${userDetails.email} - ${userDetails.phone}</span>
    <div>
      <button class="delete-btn">Delete</button>
      <button class="edit-btn">Edit</button>
    </div>
  `;

  // Attach event listeners
  const deleteButton = childElem.querySelector('.delete-btn');
  if (deleteButton) {
    deleteButton.onclick = () => handleDelete(userDetails.email, childElem);
  }

  const editButton = childElem.querySelector('.edit-btn');
  if (editButton) {
    editButton.onclick = () => handleEdit(userDetails);
  }
  console.log('User item content set and buttons attached for:', userDetails.email);
}

async function handleDelete(email, listItem) {
  try {
    const response = await fetch(`${API_BASE_URL}/${email}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Success:', data.message);
      if (listItem && listItem.parentNode) {
        listItem.parentNode.removeChild(listItem);
      }
    } else {
      console.error('Error:', data.message || 'Failed to delete user.');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

async function handleEdit(userDetails) {
  document.getElementById('username').value = userDetails.username;
  document.getElementById('email').value = userDetails.email;
  document.getElementById('phone').value = userDetails.phone;

  document.getElementById('email').setAttribute('data-original-email', userDetails.email);
  document.getElementById('email').readOnly = true;

  const submitButton = document.querySelector('#userForm button[type="submit"]');
  submitButton.textContent = 'Update User';
  submitButton.onclick = (event) => handleUpdateFormSubmit(event, userDetails.email);
}

async function handleUpdateFormSubmit(event, originalEmail) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const newEmail = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  const userDetails = {
    username,
    email: newEmail,
    phone
  };

  try {
    const response = await fetch(`${API_BASE_URL}/${originalEmail}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Success:', data.message);
      showUserOnScreen(data.user);
      resetFormAndButton();
    } else {
      console.error('Error:', data.message || 'Failed to update user. Please try again.');
    }
  } catch (error) {
    console.error('Error updating form:', error);
  }
}

function resetFormAndButton() {
  document.getElementById('userForm').reset();
  document.getElementById('email').readOnly = false;
  document.getElementById('email').removeAttribute('data-original-email');

  const submitButton = document.querySelector('#userForm button[type="submit"]');
  submitButton.textContent = 'Submit';
  submitButton.onclick = (event) => handleFormSubmit(event);
}

async function fetchAndDisplayUsers() {
  console.log('Frontend: Attempting to fetch users...');
  try {
    const response = await fetch(API_BASE_URL);
    console.log('Frontend: Received response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text(); // Get raw text if JSON parsing fails
      console.error('Frontend: Fetch response not OK. Status:', response.status, 'Body:', errorText);
      // Fallback message if backend doesn't send proper JSON on error
      console.error('Error:', 'Failed to load users. ' + (errorText || ''));
      return; // Stop execution if response is not OK
    }

    const users = await response.json();
    console.log('Frontend: Users data received:', users);

    const listOfItems = document.getElementById('listOfitems');
    if (listOfItems) {
      listOfItems.innerHTML = ''; // Clear existing list
      if (users && users.length > 0) {
        users.forEach(user => showUserOnScreen(user));
        console.log(`Frontend: Displayed ${users.length} users.`);
      } else {
        console.log('Frontend: No users found or empty array received. List will remain empty.');
      }
    } else {
      console.error('Frontend: Element with ID "listOfitems" not found in the DOM.');
    }
  } catch (error) {
    console.error('Frontend: Error fetching users:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayUsers);
