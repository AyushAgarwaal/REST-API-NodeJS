// create new user schema
const createUserSchema = {
    type: 'object',
    required: ['name', 'email', 'contact', 'password'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email', pattern: "^[a-zA-Z0-9_.+-]+@gmail\\.com$" },
      contact: { type: 'number', minLength: 10, maxLength: 10 },
      password: { type: 'string', minLength: 6 }
    }
  };
  
  // update user svchema
const updateUserSchema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email', pattern: "^[a-zA-Z0-9_.+-]+@gmail\\.com$" },
      contact: { type: 'string', pattern: '^[0-9]{10}$', minLength: 10, maxLength: 10 },
      password: { type: 'string', minLength: 6 }
    }
  };
  
  // delete user schema
  const deleteUserSchema = {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: "string" }
    }
  
  };
  //login schema
  const loginSchema = {
    type: 'object',
    required: ['email', 'password', 'isAdmin'],
    properties: {
  
      email: { type: 'string', format: 'email', pattern: "^[a-zA-Z0-9_.+-]+@gmail\\.com$" },
  
      password: { type: 'string', minLength: 6 },
  
      isAdmin: { type: 'Boolean' }
  
      // adminEmail: { type: 'string', format: 'email' },
  
      // adminPassword: { type: 'string', minLength: 6 }
    }
  };