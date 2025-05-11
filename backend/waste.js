export const getData = async () => {

const response = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
    method: 'POST',
    headers: {
      "Authorization": "Bearer ACCESS_TOKEN",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "aggregateBy": [{
        "dataTypeName": "com.google.step_count.delta"
      }],
      "bucketByTime": { "durationMillis": 86400000 }, // 1 day
      "startTimeMillis": Date.now() - 7 * 86400000,    // 7 days ago
      "endTimeMillis": Date.now()
    })
  });
  
  const data = await response.json();
  console.log(data);

};