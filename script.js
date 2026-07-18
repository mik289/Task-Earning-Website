// Sample Task Database Array
const tasks = [
    { id: 1, title: "Complete Marketing Survey", reward: 1.50, description: "Share your opinions on consumer electronic products.", completed: false },
    { id: 2, title: "Watch Promotional Video", reward: 0.45, description: "Watch a short 30-second video clip to completion.", completed: false },
    { id: 3, title: "App Beta Testing", reward: 3.00, description: "Download the partner app and submit UI feedback.", completed: false },
    { id: 4, title: "Subscribe to Newsletter", reward: 0.25, description: "Sign up using a verified email address.", completed: false }
];

// App State
let userBalance = 0.00;

// DOM Elements
const taskListEl = document.getElementById('task-list');
const balanceDisplayEl = document.getElementById('balance-display');
const modalEl = document.getElementById('withdrawal-modal');
const withdrawBtn = document.getElementById('withdraw-btn');
const closeModalBtn = document.querySelector('.close-modal');
const confirmWithdrawBtn = document.getElementById('confirm-withdrawal');

// Initialize Dashboard and Render Tasks
function renderTasks() {
    taskListEl.innerHTML = ''; // Clear existing DOM entries
    
    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = `task-card ${task.completed ? 'completed' : ''}`;
        
        card.innerHTML = `
            <div class="task-info">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </div>
            <div class="task-action">
                <span class="task-reward">+$${task.reward.toFixed(2)}</span>
                <button class="btn-primary" ${task.completed ? 'disabled' : ''} onclick="claimTask(${task.id})">
                    ${task.completed ? 'Claimed' : 'Complete'}
                </button>
            </div>
        `;
        taskListEl.appendChild(card);
    });
}

// Handle Task Completion Event
window.claimTask = function(taskId) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1 && !tasks[taskIndex].completed) {
        // Mocking an asynchronous server validation delay
        alert(`Redirecting to task: "${tasks[taskIndex].title}"... Simulating task action completion.`);
        
        // Complete the task and add earnings
        tasks[taskIndex].completed = true;
        userBalance += tasks[taskIndex].reward;
        
        // Update display view State
        updateBalanceDisplay();
        renderTasks();
    }
};

// Update Header Balance UI text
function updateBalanceDisplay() {
    balanceDisplayEl.textContent = `Balance: $${userBalance.toFixed(2)}`;
}

// Modal Interactivity Logic
withdrawBtn.addEventListener('click', () => {
    modalEl.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modalEl.style.display = 'none';
});

// Close modal if clicking outside the main dialog container
window.addEventListener('click', (e) => {
    if (e.target === modalEl) {
        modalEl.style.display = 'none';
    }
});

// Handle Payout submission rules
confirmWithdrawBtn.addEventListener('click', () => {
    const selectedMethod = document.getElementById('payout-method').value;
    
    if (userBalance < 10.00) {
        alert(`Insufficient funds. You need at least $${(10.00 - userBalance).toFixed(2)} more to cash out via ${selectedMethod.toUpperCase()}.`);
    } else {
        alert(`Success! Your withdrawal request for $${userBalance.toFixed(2)} via ${selectedMethod.toUpperCase()} has been submitted.`);
        userBalance = 0.00;
        updateBalanceDisplay();
        modalEl.style.display = 'none';
    }
});

// Start application runtime load
renderTasks();
updateBalanceDisplay();
