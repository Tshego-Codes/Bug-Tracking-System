const primaryButtons = document.querySelectorAll("nav .btn.primary");

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