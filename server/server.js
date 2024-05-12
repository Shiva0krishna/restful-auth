import LlamaAI from 'llamaai';


const apiToken = 'LL-hJvxxcDeEqowaeSh4T1lwZmprJgWDkwQIskWVqdE2SV506yh3pLCw4k717swINT0';
const llamaAPI = new LlamaAI(apiToken);

const api = {
  "model": "llama-70b-chat",
  "messages": [
    {"role": "user", "content": "Make a summary of my last e-mail", "login":"shivakrishna9752@gmail.com"},
  ],
  "functions": [
    {
        "name": "get_email_summary",
        "description": "Get the current value of emails",
        "parameters": {
            "type": "object",
        "properties": {
            "value": {
                "type": "integer",
                "description": "Quantity of emails"
            },
            "login": {
                "type": "string",
                "description": "login"
            }
        },
        "required": ["value","login"]
        }
    }
  ],
}

llamaAPI.run(api)
  .then(response => {
    console.log(response.choices[0].message);
  })
  .catch(error => {
    console.error(error);
  });
