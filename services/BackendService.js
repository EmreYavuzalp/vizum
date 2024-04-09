export class BackendService {
  static updatePushToken(UserID, FirebaseToken, DeviceType) {
      // Define the new URL for the request
      const url = 'https://vizum-backend-a7cba54ff087.herokuapp.com/api/setFirebaseToken';

      // Create the request options with adjusted data keys
      const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              UserID, // was uuid
              FirebaseToken, // was token
              DeviceType, // was tokenType
          }),
      };
      console.log("FirebaseToken", FirebaseToken);
      // Return the fetch promise with updated error handling and success logging
      return fetch(url, options)
          .then(response => {
            console.log("response", response);
              if (!response.ok) {
                  throw new Error('Network response was not ok.');
              }
              return response.json(); // Assuming the server responds with JSON
          })
          .then(data => {
              console.log('Success:', data);
              return true; // Indicate success
          })
          .catch((error) => {
              console.error('Error:', error);
              return false; // Indicate failure
          });
  }
}
