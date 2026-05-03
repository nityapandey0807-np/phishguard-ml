const analyzeBtn = document.getElementById("analyzeBtn");
const emailInput = document.getElementById("emailInput");
const inputSection = document.getElementById("input-section");
const resultsSection = document.getElementById("results-section");

const demoSpam = document.getElementById("demoSpam");
const demoSafe = document.getElementById("demoSafe");
const demoEvolution = document.getElementById("demoEvolution");

const tabBody = document.getElementById("tabBody");
const tabHeaders = document.getElementById("tabHeaders");
const tabReasons = document.getElementById("tabReasons");
const bodyContent = document.getElementById("bodyContent");
const headerContent = document.getElementById("headerContent");
const reasonsContent = document.getElementById("reasonsContent");

// Demo examples
const spamExample = `Subject: URGENT: Your Account Has Been Suspended!

Dear Customer,

Your account has been suspended due to suspicious activity. To verify your account and restore access, please click the link below and enter your password.

Verify Account: http://secure-bank-login.ru/verify?user=yourname

This is urgent! Failure to verify within 24 hours will result in permanent account closure.

Best regards,
Bank Security Team`;

const suspiciousExample = `Subject: Important Update Required

Hello,

We need you to verify your account information. Please click here to login and update your details.

Login: http://paypal-secure.com/login

If you don't verify, your account may be limited.

Thanks,
PayPal Team`;

const safeExample = `Subject: Meeting Reminder

Hi Team,

Just a reminder that our weekly standup meeting is scheduled for tomorrow at 10 AM in the conference room.

Agenda:
- Project updates
- Blockers discussion
- Next week's goals

Please come prepared with your updates.

Thanks,
Project Manager`;

// Phishing Evolution Demo
const evolutionExamples = [
  {
    title: "Phase 1: Basic Spam (1990s)",
    email: `Subject: FREE MONEY!!!

Dear Friend,

You have won $1,000,000! Click here to claim your prize!

http://freemoney.com/claim

Congratulations!
Lottery Team`
  },
  {
    title: "Phase 2: Social Engineering (2000s)",
    email: `Subject: Your Package is Waiting

Hello,

Your package from Amazon is waiting for delivery. Please confirm your address by clicking the link below.

Confirm Delivery: http://amazon-delivery.com/confirm

Thank you,
Amazon Shipping`
  },
  {
    title: "Phase 3: Advanced Phishing (2010s)",
    email: `Subject: Security Alert: Unusual Activity Detected

Dear Valued Customer,

We detected unusual activity on your account. For your security, please verify your identity immediately.

Secure Login: https://secure-bankofamerica-login.com/verify

If you don't verify within 24 hours, your account will be temporarily suspended.

Best regards,
Bank of America Security Team`
  },
  {
    title: "Phase 4: Modern Spear Phishing (2020s)",
    email: `Subject: Updated Project Timeline - Action Required

Hi [Your Name],

As discussed in our last meeting, I've updated the project timeline. Please review the attached document and provide your feedback by EOD.

Project_Update_2024.pdf

Click here to download: http://company-sharepoint.com/projects/update?id=12345&user=[yourid]

Thanks,
[Colleague's Name]
Project Manager`
  }
];

let evolutionIndex = 0;

const resetBtn = document.getElementById("resetBtn");

// Demo button handlers
demoSpam.addEventListener("click", () => {
  emailInput.value = spamExample;
});

demoSuspicious.addEventListener("click", () => {
  emailInput.value = suspiciousExample;
});

demoSafe.addEventListener("click", () => {
  emailInput.value = safeExample;
});

demoEvolution.addEventListener("click", () => {
  const current = evolutionExamples[evolutionIndex];
  emailInput.value = `${current.title}\n\n${current.email}`;
  evolutionIndex = (evolutionIndex + 1) % evolutionExamples.length;
  
  // Update button text to show next phase
  const nextIndex = (evolutionIndex + 1) % evolutionExamples.length;
  demoEvolution.textContent = `💥 ${evolutionExamples[nextIndex].title.split(':')[0]} (Next)`;
});

// Reset button handler
resetBtn.addEventListener("click", () => {
  resultsSection.classList.add("hidden");
  inputSection.classList.remove("hidden");
  emailInput.value = "";
});

analyzeBtn.addEventListener("click", async () => {
  if (emailInput.value.trim() === "") {
    alert("Please paste email content first!");
    return;
  }

  // Send to backend
  const response = await fetch("/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: emailInput.value })
  });

  const data = await response.json();

  // Show results
  inputSection.classList.add("hidden");
  resultsSection.classList.remove("hidden");

  // Update risk level
  const percentage = data.score;
  const riskCircle = document.getElementById("riskCircle");
  const riskLabel = document.getElementById("riskLabel");
  const confidenceScore = document.getElementById("confidenceScore");
  const riskScore = document.getElementById("riskScore");
  
  document.getElementById("riskPercentage").innerText = percentage + "%";
  
  // Remove previous classes
  riskCircle.classList.remove('safe', 'suspicious', 'phishing');
  
  // Determine risk level and apply appropriate styling
  let riskClass, riskText;
  if (percentage < 30) {
    riskClass = 'safe';
    riskText = 'SAFE';
  } else if (percentage < 70) {
    riskClass = 'suspicious';
    riskText = 'SUSPICIOUS';
  } else {
    riskClass = 'phishing';
    riskText = 'PHISHING';
  }
  
  riskCircle.classList.add(riskClass);
  riskLabel.innerText = riskText;
  confidenceScore.innerText = "ML Confidence: " + data.confidence + "%";
  riskScore.innerText = (percentage / 10).toFixed(1) + "/10";
  
  // Update analysis content
  document.getElementById("analysisContent").innerText = data.result === "Safe" ? 
    "This email appears to be legitimate based on our comprehensive analysis using machine learning and security rules." : 
    "This email shows multiple indicators of being malicious or suspicious. Please exercise caution.";
  
  // Update indicators
  const indicatorsContainer = document.getElementById("indicatorsContainer");
  indicatorsContainer.innerHTML = "";
  if (data.reasons && data.reasons.length > 0) {
    data.reasons.forEach(reason => {
      const indicator = document.createElement("div");
      indicator.className = "indicator";
      indicator.innerText = reason;
      indicatorsContainer.appendChild(indicator);
    });
  }
  
  // Update reasons list
  const reasonsList = document.getElementById("reasonsList");
  reasonsList.innerHTML = "";
  if (data.reasons && data.reasons.length > 0) {
    data.reasons.forEach(reason => {
      const li = document.createElement("li");
      li.innerText = reason;
      reasonsList.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.innerText = "No specific issues detected.";
    reasonsList.appendChild(li);
  }
});

tabBody.addEventListener("click", () => {
  tabBody.classList.add("active");
  tabHeaders.classList.remove("active");
  tabReasons.classList.remove("active");
  bodyContent.classList.add("active");
  headerContent.classList.remove("active");
  reasonsContent.classList.remove("active");
});

tabHeaders.addEventListener("click", () => {
  tabHeaders.classList.add("active");
  tabBody.classList.remove("active");
  tabReasons.classList.remove("active");
  headerContent.classList.add("active");
  bodyContent.classList.remove("active");
  reasonsContent.classList.remove("active");
});

tabReasons.addEventListener("click", () => {
  tabReasons.classList.add("active");
  tabBody.classList.remove("active");
  tabHeaders.classList.remove("active");
  reasonsContent.classList.add("active");
  bodyContent.classList.remove("active");
  headerContent.classList.remove("active");
});