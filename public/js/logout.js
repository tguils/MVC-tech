const logout = async () => {

    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {

      document.location.replace('/login');
    } else {
      alert('Failed to log out');
    }
  };
  //make sure to add document items in handlbars to coincide with all queryselectors 
  document.querySelector('#logout').addEventListener('click', logout);