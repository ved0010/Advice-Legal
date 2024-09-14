// // Example POST method implementation:
// async function postData(url = "", data = {}) { 
//     const response = await fetch(url, {
//       method: "POST", headers: {
//         "Content-Type": "application/json", 
//       }, body: JSON.stringify(data),  
//     });
//     return response.json(); 
//   }
  
//   sendButton.addEventListener("click", async ()=>{ 
//     questionInput = document.getElementById("questionInput").value;
//     document.getElementById("questionInput").value = "";
//     document.querySelector(".right2").style.display = "block"
//     document.querySelector(".right1").style.display = "none"

//     question1.innerHTML = questionInput;
//     question2.innerHTML = questionInput;

//     // Get the answer and populate it! 
//     let result = await postData("/api", {"question": questionInput})
//     solution.innerHTML = result.answer
// })


// Function to create a chat session
async function createChatSession(apiKey, externalUserId) {
  const response = await fetch('https://api.on-demand.io/chat/v1/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey
    },
    body: JSON.stringify({
      pluginIds: [],
      externalUserId: externalUserId
    })
  });

  const data = await response.json();
  return data.data.id; // Extract session ID
}

// Function to submit a query using the session ID
async function submitQuery(apiKey, sessionId, query) {
  const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey
    },
    body: JSON.stringify({
      endpointId: 'predefined-openai-gpt4o',
      query: query,
      pluginIds: ['plugin-1712327325', 'plugin-1713962163', 'plugin-1726226353'],
      responseMode: 'sync'
    })
  });

  const data = await response.json();
  return data;
}

// Example usage
(sendButton.addEventListener("click", async ()=>{ 
  // alert("hello")
  const apiKey = '2LhBcHO6KClY2c1vSKwnKrUFPRj7Kxwg';
  const externalUserId = '<replace_external_user_id>';
  const query = document.getElementById("questionInput").value;
  document.querySelector(".right2").style.display = "block"
    document.querySelector(".right1").style.display = "none"

    question1.innerHTML = questionInput;
    question2.innerHTML = questionInput;

  try {
    const sessionId = await createChatSession(apiKey, externalUserId);
    const response = await submitQuery(apiKey, sessionId, query);
    // console.log(response);
    solution.innerHTML = JSON.stringify(response.data.answer);
  } catch (error) {
    console.error('Error:', error);
  }
}))();
