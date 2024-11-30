const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const gadgetDisplay = document.getElementById('gadgetDisplay'); // Gadget display container

let isHandlingGeneralQuestion = true; // Track whether the bot is handling a general question
let budget = localStorage.getItem('budget') || ''; // Retrieve the budget from localStorage (if it exists)
let category = localStorage.getItem('category') || ''; // Retrieve the category from localStorage
let brand = localStorage.getItem('brand') || ''; // Retrieve the brand from localStorage
let selectedProduct = JSON.parse(localStorage.getItem('selectedProduct')) || null; // Retrieve the selected product from localStorage

function saveToLocalStorage() {
    localStorage.setItem('budget', budget);
    localStorage.setItem('category', category);
    localStorage.setItem('brand', brand);
    if (selectedProduct) {
        localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    }
}

// Array of products with details (laptops, smartphones, tablets)
const products = [
    {
        name: "Gaming Laptop by MSI",
        brand: "MSI",
        category: "laptop",
        specs: "Intel Core i7, 16GB RAM, NVIDIA RTX 3060, 144Hz Display",
        storage: "1TB SSD",
        price: 52000,
        images: [
            "https://via.placeholder.com/150?text=MSI+1",
            "https://via.placeholder.com/150?text=MSI+2",
            "https://via.placeholder.com/150?text=MSI+3"
        ]
    },
    {
        name: "Acer Swift 5",
        brand: "Acer",
        category: "laptop",
        specs: "Intel Core i5-1035G1, 8GB RAM, 14-inch Full HD Display",
        storage: "256GB SSD",
        price: 70000,
        images: [
            "https://via.placeholder.com/150?text=Acer+Swift+5+1",
            "https://via.placeholder.com/150?text=Acer+Swift+5+2",
            "https://via.placeholder.com/150?text=Acer+Swift+5+3"
        ]
    },
    {
        name: "Dell XPS 13 (2023)",
        brand: "Dell",
        category: "laptop",
        specs: "Intel Core i5-1035G1, 8GB RAM, 13.4-inch Full HD Display",
        storage: "256GB SSD",
        price: 72799.44,
        images: [
            "https://via.placeholder.com/150?text=Dell+XPS+13+1",
            "https://via.placeholder.com/150?text=Dell+XPS+13+2",
            "https://via.placeholder.com/150?text=Dell+XPS+13+3"
        ]
    },    
    {
        name: "Ultrabook by HP",
        brand: "HP",
        category: "laptop",
        specs: "Intel Core i5, 8GB RAM, Intel Iris Graphics, 60Hz Display",
        storage: "512GB SSD",
        price: 48000,
        images: [
            "https://via.placeholder.com/150?text=HP+1",
            "https://via.placeholder.com/150?text=HP+2",
            "https://via.placeholder.com/150?text=HP+3"
        ]
    },
    {
        name: "MacBook Pro",
        brand: "Apple",
        category: "laptop",
        specs: "M1 Chip, 16GB RAM, Retina Display",
        storage: "1TB SSD",
        price: 120000,
        images: [
            "https://via.placeholder.com/150?text=Mac+1",
            "https://via.placeholder.com/150?text=Mac+2",
            "https://via.placeholder.com/150?text=Mac+3"
        ]
    },
    {
        name: "Samsung Galaxy S23",
        brand: "Samsung",
        category: "smartphone",
        specs: "Qualcomm Snapdragon 8 Gen 2, 8GB RAM, 120Hz AMOLED Display",
        storage: "256GB",
        price: 45000,
        images: [
            "https://via.placeholder.com/150?text=Samsung+1",
            "https://via.placeholder.com/150?text=Samsung+2",
            "https://via.placeholder.com/150?text=Samsung+3"
        ]
    },
    {
        name: "Tecno Spark 8 Pro",
        brand: "Tecno",
        category: "smartphone",
        specs: "MediaTek Helio G85, 4GB RAM, 6.6-inch Full HD+ Display",
        storage: "64GB, expandable",
        price: 7000,
        images: [
            "https://via.placeholder.com/150?text=Tecno+Spark+8+Pro+1",
            "https://via.placeholder.com/150?text=Tecno+Spark+8+Pro+2",
            "https://via.placeholder.com/150?text=Tecno+Spark+8+Pro+3"
        ]
    },
    {
        name: "Xiaomi Redmi Note 11",
        brand: "Xiaomi",
        category: "smartphone",
        specs: "Qualcomm Snapdragon 680, 4GB RAM, 6.43-inch AMOLED Display",
        storage: "64GB, expandable",
        price: 8000,
        images: [
            "https://via.placeholder.com/150?text=Xiaomi+Redmi+Note+11+1",
            "https://via.placeholder.com/150?text=Xiaomi+Redmi+Note+11+2",
            "https://via.placeholder.com/150?text=Xiaomi+Redmi+Note+11+3"
        ]
    },    
    {
        name: "iPhone 15",
        brand: "Apple",
        category: "smartphone",
        specs: "A17 Bionic Chip, 6GB RAM, Super Retina XDR Display",
        storage: "128GB",
        price: 85000,
        images: [
            "https://via.placeholder.com/150?text=Apple+1",
            "https://via.placeholder.com/150?text=Apple+2",
            "https://via.placeholder.com/150?text=Apple+3"
        ]
    },
    {
        name: "Apple iPad Pro 11",
        category: "tablet",
        specs: "Apple M1 Chip, 8GB RAM, 11-inch Liquid Retina Display",
        storage: "128GB",
        price: 29999,
        images: [
            "https://via.placeholder.com/150?text=Apple+iPad+Pro+1",
            "https://via.placeholder.com/150?text=Apple+iPad+Pro+2",
            "https://via.placeholder.com/150?text=Apple+iPad+Pro+3"
        ]
    },
    {
        name: "Samsung Galaxy Tab S7",
        brand: "Samsung",
        category: "tablet",
        specs: "Qualcomm Snapdragon 865+, 6GB RAM, 11-inch TFT Display",
        storage: "128GB",
        price: 25000,
        images: [
            "https://via.placeholder.com/150?text=Samsung+Tab+S7+1",
            "https://via.placeholder.com/150?text=Samsung+Tab+S7+2",
            "https://via.placeholder.com/150?text=Samsung+Tab+S7+3"
        ]
    },
    {
        name: "Lenovo Tab P11 Pro",
        brand: "Lenovo",
        category: "tablet",
        specs: "Qualcomm Snapdragon 730G, 6GB RAM, 11.5-inch OLED Display",
        storage: "128GB",
        price: 21000,
        images: [
            "https://via.placeholder.com/150?text=Lenovo+Tab+P11+Pro+1",
            "https://via.placeholder.com/150?text=Lenovo+Tab+P11+Pro+2",
            "https://via.placeholder.com/150?text=Lenovo+Tab+P11+Pro+3"
        ]
    },
    {
        name: "Huawei MediaPad M5",
        brand: "Huawei",
        category: "tablet",
        specs: "Kirin 960, 4GB RAM, 10.8-inch 2K Display",
        storage: "64GB",
        price: 18000,
        images: [
            "https://via.placeholder.com/150?text=Huawei+MediaPad+M5+1",
            "https://via.placeholder.com/150?text=Huawei+MediaPad+M5+2",
            "https://via.placeholder.com/150?text=Huawei+MediaPad+M5+3"
        ]
    },
    {
        name: "Microsoft Surface Go 3",
        brand: "Microsoft",
        category: "tablet",
        specs: "Intel Pentium Gold 6500Y, 4GB RAM, 10.5-inch PixelSense Display",
        storage: "64GB SSD",
        price: 22999,
        images: [
            "https://via.placeholder.com/150?text=Microsoft+Surface+Go+3+1",
            "https://via.placeholder.com/150?text=Microsoft+Surface+Go+3+2",
            "https://via.placeholder.com/150?text=Microsoft+Surface+Go+3+3"
        ]
    }
];

// Function to update the gadget display dynamically
function updateGadgetDisplay(productName) {
    const product = products.find(p => p.name === productName);

    if (product) {
        gadgetDisplay.innerHTML = `
            <div class="gadget-display">
                <div class="gadget-images">
                    <img src="${product.images[0]}" alt="${product.name} Image 1">
                    <img src="${product.images[1]}" alt="${product.name} Image 2">
                    <img src="${product.images[2]}" alt="${product.name} Image 3">
                </div>
                <div class="gadget-details">
                    <h3 class="gadget-name">${product.name}</h3>
                    <div class="gadget-specs">
                        <div class="spec-item"><strong>Brand:</strong> ${product.brand}</div>
                        <div class="spec-item"><strong>Specs:</strong> ${product.specs}</div>
                        <div class="spec-item"><strong>Storage:</strong> ${product.storage}</div>
                        <div class="spec-item"><strong>Price:</strong> ₱${product.price}</div>
                    </div>
                </div>
            </div>
        `;
    } else {
        gadgetDisplay.innerHTML = `
            <div class="gadget-display">
                <p class="gadget-not-found">Product not found. Please try another gadget.</p>
            </div>
        `;
    }
}

function loadChatHistory() {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatbox.innerHTML = '';
    chatHistory.forEach(message => {
        addMessage(message.sender, message.text, false);
    });
}

window.addEventListener('load', () => {
    loadChatHistory();
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    if (chatHistory.length === 0) {
        resetChat();
    }
});

function saveToLocalStorage(sender, text) {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.push({ sender, text });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Add message to chatbox
function addMessage(sender, text, save = true) {
    const message = document.createElement('p');
    message.className = sender;
    message.textContent = text;
    chatbox.appendChild(message);
    chatbox.scrollTop = chatbox.scrollHeight;

    if (save) saveToLocalStorage(sender, text);
}

sendBtn.addEventListener('click', handleUserInput);

function handleUserInput() {
    const userText = userInput.value.trim();
    if (userText === '') return;

    addMessage('user', userText);
    userInput.value = '';

    if (isHandlingGeneralQuestion) {
        handleGeneralQuestion(userText);
    } else {
        handleProductFlow(userText);
    }
}

function handleUserInput() {
        const userText = userInput.value.trim();
        if (userText === '') return;

        addMessage('user', userText);
        userInput.value = '';

        if (isHandlingGeneralQuestion) {
            handleGeneralQuestion(userText);
        } else {
            handleProductFlow(userText);
        }
    }

    // Handle product flow based on user input
    function handleProductFlow(userText) {
        if (step === 0) {
            budget = parseInt(userText);
            if (isNaN(budget) || budget <= 0) {
                botReply("Please enter a valid budget amount in Philippine pesos (₱).");
            } else {
                botReply("Got it! Now, what product category are you interested in? (laptop, smartphone, or tablet)");
                step++;
            }
        } else if (step === 1) {
            category = userText.trim().toLowerCase();
            if (category !== "laptop" && category !== "smartphone" && category !== "tablet") {
                botReply("Please choose a valid category: laptop, smartphone, or tablet.");
            } else {
                botReply("Which brand are you interested in?");
                step++;
            }
        } else if (step === 2) {
            brand = userText.trim().toLowerCase();
            const filteredProducts = products.filter(product => product.category === category && product.brand.toLowerCase() === brand);
        
            if (filteredProducts.length === 0) {
                botReply("Sorry, no products found for that brand in this category. Please try again.");
            } else {
                const recommendedProduct = filteredProducts[0]; // Get the first product from the filtered list
        
                // Check if the product's price is within the user's budget
                if (recommendedProduct.price > budget) {
                    botReply(
                        `Sorry, the ${recommendedProduct.name} is priced at ₱${recommendedProduct.price}, which exceeds your budget of ₱${budget}. Please choose another gadget that matches your budget.`
                    );
                } else {
                    botReply(
                        `I recommend the ${recommendedProduct.name}.\n\n` +
                        `Here's a breakdown of the specs:\n` +
                        `- **Brand**: ${recommendedProduct.brand} - a trusted name in the ${category} industry.\n` +
                        `- **Specs**: ${recommendedProduct.specs} - designed for optimal performance in ${category} tasks.\n` +
                        `- **Storage**: ${recommendedProduct.storage} - ample space for all your apps, games, and media.\n` +
                        `- **Price**: ₱${recommendedProduct.price} - within your budget of ₱${budget}.\n\n` +
                        `This ${recommendedProduct.category} is an excellent choice if you're looking for a device that combines performance, reliability, and fits within your budget.`
                    );
        
                    updateGadgetDisplay(recommendedProduct.name); // Display the gadget details
                }
            }
            step = 0; // Reset after product is displayed
        }    
    }

function botReply(text) {
    const typing = showTypingAnimation();

    setTimeout(() => {
        typing.remove();
        typeTextLetterByLetter(text);
    }, 1000);
}

function showTypingAnimation() {
    const typing = document.createElement('p');
    typing.className = 'bot typing';
    typing.innerHTML = 'Typing<span>.</span><span>.</span><span>.</span>';
    chatbox.appendChild(typing);
    chatbox.scrollTop = chatbox.scrollHeight;
    return typing;
}

function typeTextLetterByLetter(text) {
    const message = document.createElement('p');
    message.className = 'bot';
    chatbox.appendChild(message);

    let index = 0;
    const interval = setInterval(() => {
        message.textContent += text[index];
        index++;
        if (index === text.length) clearInterval(interval);
    }, 50);
}

function resetChat() {
    // Clear localStorage
    localStorage.removeItem('chatHistory');

    // Reset the chatbot variables
    step = 0;
    budget = 0;
    category = '';
    brand = '';
    isHandlingGeneralQuestion = false;

    // Clear the chatbox
    chatbox.innerHTML = '';

    // Send the bot's initial message
    botReply("Hi, I'm your gadget assistant! Would you tell me your budget for the gadget that your looking for?");
}

