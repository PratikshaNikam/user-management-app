import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        setData({ msg: err.response?.data?.msg || 'Unauthorized' });
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <div>
      <h2>Profile</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
