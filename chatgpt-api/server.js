import { Configuration, OpenAIApi  } from 'openai'
import {createRequire} from 'module'
const require = createRequire(import.meta.url) 
const express = require('express')
const app = express()
const PORT = 1337

app.use(express.json())
app.use(express.static('public'))
app.use(require('cors')())

require('dotenv').config()

const openAI_SECRET_KEY = process.env.OPEN_AI_SECRET_KEY

const configuration = new Configuration({
    apiKey: openAI_SECRET_KEY
})
const openai = new OpenAIApi(configuration)

async function sendPrompt(input) {
    const model = 'gpt-3.5-turbo'
    const messages = [
        {
            "role": 'system',
            "content": 'You are a very helpful assistant'
        },
        {
            "role": 'user',
            "content": 'you are an expert in social media ads writing. your goal is to give me the best most convincing facebook-ads possible, so the reader or customer is convinced to buy the product. the prompt provided by me contains all the necessary instructions and detail the product has. your return  should be formatted clearly and optimized for user interactions. only provide me with the with text belonging to the facebook. dont add other information out of the context. '
        },
        {
            "role": 'assistant',
            "content": 'Sure, Id would be happy to help you write a convincing Facebook ad for your product.'
        },
        {
            "role": "user",
            "content": input
        }
    ]

    const completion = await openai.createChatCompletion({
        model,
        messages
    })
    console.log(completion.data.choices)
    return completion.data.choices
}

//routes
app.post('/api', async (req, res) => {
    const {prompt} = req.body 
    const answer = await sendPrompt(prompt)
    res.status(200).json({
        'message': answer
    })
})

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))