import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const response = await fetch('https://api.groq.com/openai/v1/models', {
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
    }
  });
  const data = await response.json();
  console.log(data.data.map(d => d.id).join('\n'));
}

main();
