const apiKey = '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'; // Remplacez par votre clé API

async function sendMessage() {
  const userInput = document.getElementById('userInput').value;
  if (userInput.trim() === '') return;

  const chatbox = document.getElementById('chatbox');

  // Affiche le message de l'utilisateur
  const userMessage = document.createElement('p');
  userMessage.className = 'user-text';
  userMessage.innerHTML = `<span>${userInput}</span>`;
  chatbox.appendChild(userMessage);

  // Efface le champ de saisie
  document.getElementById('userInput').value = '';

  // Appelle l'API OpenAI pour obtenir une réponse
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userInput }]
    })
  });

  const data = await response.json();
  const botReply = data.choices[0].message.content;

  // Affiche la réponse du bot
  const botMessage = document.createElement('p');
  botMessage.className = 'bot-text';
  botMessage.innerHTML = `<span>${botReply}</span>`;
  chatbox.appendChild(botMessage);

  // Fait défiler vers le bas pour afficher le dernier message
  chatbox.scrollTop = chatbox.scrollHeight;
}
