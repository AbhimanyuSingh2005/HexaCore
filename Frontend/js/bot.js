const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chat");

// Predefined questions and responses
const predefinedResponses = {
    "how to file an ipr": "To file an IPR, you need to submit an application to the relevant intellectual property office along with all necessary documents.",
    "what is ipr": "IPR stands for Intellectual Property Rights, which are legal rights that protect creations of the mind like inventions, designs, and artistic works.",
    "what is patent": "A patent is an exclusive right granted for an invention, which provides a new way of doing something or offers a new technical solution.",
    "what is copyright": "Copyright is a type of IPR that protects original works of authorship such as literary, musical, and artistic works.",
    "how to check patent status": "You can check the status of a patent by visiting the relevant intellectual property office's online portal and entering the patent number."
};

let userMessage;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chatl", className);
    let chatContent = className === "outgoing" ? <p>${message}</p> : <span><i class="fa-solid fa-robot"></i></span><p>${message}</p>;
    chatLi.innerHTML = chatContent;
    return chatLi;
};

const handleChat = () => {
    userMessage = chatInput.value.trim().toLowerCase();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatInput.value = "";

    setTimeout(() => {
        const incomingChatLi = createChatLi("thinking....", "incoming");
        chatbox.appendChild(incomingChatLi);

        // Generate response based on predefined questions
        const botResponse = predefinedResponses[userMessage] || "I'm sorry, I don't understand your question. Please try asking something else.";
        incomingChatLi.querySelector("p").textContent = botResponse;
    }, 600);
};

sendChatBtn.addEventListener("click", handleChat);