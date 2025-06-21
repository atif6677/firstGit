const Users = require('../models/userModels');

// Function to add a new user
const addUser = async (req, res) => {
  try {
    const { username, email, phone } = req.body; // Extract data from request body
    
    // Create a new user record in the database
    const newUser = await Users.create({
      username,
      email,
      phone
    });

    console.log('User added successfully:', newUser.toJSON());
    // Send a success response back to the client with the new user data
    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    // Handle unique constraint error (e.g., duplicate email)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }
    // Send a generic error response for other issues
    res.status(500).json({ message: 'Failed to add user', error: error.message });
  }
};

// Function to get all users
const getAllUsers = async (req, res) => {
  try {
    // Fetch all user records from the database
    const users = await Users.findAll();
    console.log('All users fetched successfully.');
    // Send the list of users as a JSON response
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    // Send an error response
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

// Function to delete a user by email
const deleteUser = async (req, res) => {
  try {
    const { email } = req.params; // Get email from URL parameters
    
    // Delete the user from the database where email matches
    const deletedRows = await Users.destroy({
      where: { email: email }
    });

    if (deletedRows > 0) {
      console.log('User deleted successfully:', email);
      // Send a success response
      res.status(200).json({ message: 'User deleted successfully.' });
    } else {
      console.log('User not found for deletion:', email);
      // Send a 404 if no user was found with the given email
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    // Send an error response
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};

// Function to update a user by email
const updateUser = async (req, res) => {
  try {
    const { email } = req.params; // Get email from URL parameters (original email for lookup)
    const { username, newEmail, phone } = req.body; // New data, including potentially a new email

    // Update the user record in the database
    const [updatedRows] = await Users.update(
      { username, email: newEmail || email, phone }, // Use newEmail if provided, otherwise keep original
      { where: { email: email } }
    );

    if (updatedRows > 0) {
      console.log('User updated successfully:', email);
      // Fetch the updated user to send back in the response
      const updatedUser = await Users.findOne({ where: { email: newEmail || email } });
      // Send a success response
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } else {
      console.log('User not found for update:', email);
      // Send a 404 if no user was found with the given email
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    // Handle unique constraint error if newEmail conflicts
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Another user with this email already exists.' });
    }
    // Send a generic error response for other issues
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  deleteUser,
  updateUser
};
