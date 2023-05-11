/* script for all the facebook data that is submitted */

// gather all the user inputs
const sendPromptBtn = document.getElementById("send-prompt");

sendPromptBtn.addEventListener("click", function() {
    //change clicked button style
    sendPromptBtn.style.backgroundColor = "#c9c9c9";
    sendPromptBtn.style.cursor = "not-allowed";
    sendPromptBtn.textContent = "Prompt was send!";
    sendPromptBtn.style.boxShadow = "none";
    sendPromptBtn.style.transform = "none";

    // switch prompt response container visibility
    const waiting_text = document.querySelector(".warning-text-container");
    const warning_text = document.querySelector(".waiting-prompt-container");
    const prompt_response = document.querySelector(".all-prompt-responses-container");

        waiting_text.classList.add('disabled');
        warning_text.classList.add('disabled');
        prompt_response.classList.add('active');

   
    console.log(my_prompt + "this is the prompt")
    // sendPrompt(my_prompt)
    // selectPrompt(my_prompt)

  });

 
// chat gpt prompt request section
/* let prompt = null
    let prompts = []
    function selectPrompt(promptChoice){
        prompt = promptChoice
        prompts.push(prompt)
        console.log(prompt)  
    } */
    
    async function sendPrompt() {
         // get input values
        const documentName = document.getElementById("document-name").value;
        const productName = document.getElementById("product-name").value;
        const productDescription = document.getElementById("product-description").value;
        const productReason = document.getElementById("product-reason").value;
        const productAudience = document.getElementById("product-target").value;
        const productDiscount = document.getElementById("product-discount").value;
        const language = document.querySelector(".language-input").value;
    
        const my_prompt = `
        Document Name: ${documentName}
        Product Name: ${productName}
        Product Description: ${productDescription}
        Product Reason: ${productReason}
        Product Audience: ${productAudience}
        Product Discount: ${productDiscount}
        Ads Language: ${language}
        Instructions: "your goal is with the information above to write facebook-ads. use all the parameters given above to create good and appropriate faacebook-ads"
      `;

        console.log("It's working!")
        let request = `${my_prompt}. Please provide the prompt with no confirmation or intro, just give me the prompt starting with "Response: " on the top as a headline but begin your text in the second line.`
        // prompts.forEach(prompt => {
        //    request += `${prompt} `
        // })

        // request += `Please provide the prompt with no confirmation or intro, just give me the prompt starting with "Response: " on the top as a headline but begin your text in the second line.`
         console.log(request + "this is the request")

            try {
            const res = await fetch('http://localhost:1337/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'prompt': request })
            })
            const response = await res.json()
            const content = response.message[0].message.content;
            factory.innerHTML = `<p>${content}</p>`;
        } catch (err) {
            console.log(err.message)
        } 
        
    }

     // get id to display response
     const factory = document.getElementById('gpt-response')

