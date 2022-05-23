exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: "heropy",
      age: 45,
      email: 'thesecon@gmail.com'
    })
  }
}