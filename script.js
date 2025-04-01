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
