// Select all the labels using your class name
const labels = document.querySelectorAll(".stat-lbl");

labels.forEach((label, index) => {
    // 1. Get the current text and remove any accidental whitespace at the ends
    let text = label.innerText.trim();
    
    // 2. Capitalize the first letter and attach the rest of the original string
    let capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
    
    // 3. Apply the logic based on the index
    if (index === 0) {
        // For the first card, just apply the capitalized text
        label.innerText = capitalizedText;
    } else {
        // For all other cards, append " Tickets" to the end
        label.innerText = `${capitalizedText} Tickets`;
    }
});

// style the issue tracker heading

let issueCardHeading = document.querySelector(".top-bar h1");

issueCardHeading.textContent = "Summary of Tickets";
issueCardHeading.style.color = "white";
issueCardHeading.style.fontSize = "30px";

//



let statNum = document.getElementsByClassName("stat-num");

for (let i = 0; i < statNum.length; i++) {
    statNum[i].style.color = "black";
    statNum[i].style.fontSize = "35px";
}

//stat labels

let statLabels = document.getElementsByClassName("stat-lbl");
for (let i = 0; i < statLabels.length; i++) {
    statLabels[i].style.color = "darkGray";
    statLabels[i].style.fontSize = "25px";
}


// Select the container using its ID
let statsBar = document.getElementById("stats-bar");

// Change the grid layout to exactly 2 columns of equal width
if (statsBar) {
    statsBar.style.gridTemplateColumns = "repeat(2, 1fr)";
    statsBar.style.gap = "20px";
}

if (statsBar && statsBar.firstElementChild) {
    // 1. Keep the 2-column layout for the container
    statsBar.style.gridTemplateColumns = "repeat(2, 1fr)";

    // 2. Target the first card and make it span full width
    statsBar.firstElementChild.style.gridColumn = "1 / -1";
}

// stat card styling

let statCard = document.querySelectorAll(".stat-card");

statCard.forEach(card => {
    card.style.padding = "30px 10px"
    card.style.display = "flex"
    card.style.alignItems = "center";
    card.style.gap = "20px"
    card.style.minHeight = "100px";

})


// Select all the statistic cards
statCard.forEach((card, index) => {
    // 1. Target the specific elements inside the card
    const numberEl = card.querySelector(".stat-num"); 
    const labelEl = card.querySelector(".stat-lbl");   

    // 2. Store the original values so we can revert them later
    // We grab the text right away before any hovering happens
    const originalLabelText = labelEl ? labelEl.innerText : "";
    
    // 3. Handle the Hover State (Mouse Enter)
    card.addEventListener("mouseenter", () => {
        // Reduce background opacity (using rgba for white at 70% opacity)
        card.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        card.style.outline = "3px solid white";
        card.style.outlineOffset = "-3px";
        // Change text and number colors to dark blue
        if(numberEl){
            numberEl.style.opacity = 0;
        }
        if (labelEl) {
            labelEl.style.color = "white"; 
            labelEl.style.fontSize = "25px";
            // Check if it is the first card (Index 0)
            if (index === 0) {
                labelEl.innerText = "View All Tickets";
            } else {
                labelEl.innerText = `View ${originalLabelText}`;
            }
        }
    });

    // 4. Handle the Default State (Mouse Leave)
    card.addEventListener("mouseleave", () => {
        // Revert the background color back to solid white
        card.style.backgroundColor = "rgb(255, 255, 255)";

        numberEl.style.display = "flex";

        // Revert the colors (empty string gives control back to your CSS file)
        if (numberEl) numberEl.style.opacity = 100;
        if (labelEl) {
            labelEl.style.color = "gray";
            labelEl.style.fontSize = "25px";

            // Put the original text back
            labelEl.innerText = originalLabelText; 
        }
    });
});




// Select all elements that have both 'btn' and 'primary' classes

const primaryButtons = document.querySelectorAll(".btn.primary");

primaryButtons.forEach(button => {
    // 1. Apply the default static styles
    button.innerText = "+ Quick Add Ticket";
    button.style.fontWeight = "bold";
    button.style.backgroundColor = "transparent"; 
    button.style.color = "white";
    button.style.padding = "20px";
    button.style.border = "none"; 
    button.style.boxShadow = "inset 0 0 0 2px white"; 
    
    // Add a smooth transition so the hover effect doesn't snap instantly
    button.style.transition = "all 0.3s ease";

    // 2. Handle the Hover State (Mouse Enter)
    button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "white";
        button.style.color = "black";
    });

    // 3. Handle the Default State (Mouse Leave)
    button.addEventListener("mouseleave", () => {
        // Revert back to the styles we set in step 1
        button.style.backgroundColor = "transparent";
        button.style.color = "white";
    });
});