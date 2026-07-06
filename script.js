/* Lesson Cards */
function toggleLesson(card)
{
  if (typeof card === "string")
  {
    card = document.getElementById(card);
  }
  card.classList.toggle("open");
}

function stopBubble(e) // stops the encryption card from closing when using the Caesar Cipher interactive, which is why I implemented this code. 
{
  e.stopPropagation();
}

/* Terminal Typewriter Animation */
const terminalCommands = [
  "scanning network",
  "checking firewall",
  "encrypting sensitive data",
  "analyzing phishing emails",
  "running security audits",
  "verifying SQL queries",
];

let cmdIndex = 0;
let charIndex = 0;

  function typeWriter()
  {
    const target = document.getElementById("typewriter");
    if (!target) return;
    const command = terminalCommands[cmdIndex];
    if(charIndex < command.length)
    {
      target.textContent += command.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 100);
    }
    else 
    {
      setTimeout(() => {
        target.textContent = "";
        charIndex = 0;
        cmdIndex = (cmdIndex + 1) % terminalCommands.length;
        typeWriter();
      }, 1500);
    }
  }

  /* Caesar Cipher */
  function caesarCipher(text, shift)
  {
    return text.replace(/[a-zA-Z]/g, char => {
      return String.fromCharCode(
        ((char.charCodeAt(0) -65 + shift) % 26) + 65
      );
    });
    }

    function updateCipher(e) 
    {
      e.stopPropagation();
      const shift = Number(document.getElementById("cipher-shift").value);
      const plainText = document.getElementById("plain-text").value.toUpperCase();
      document.getElementById("shift-num").textContent = shift;
      document.getElementById("cipher-output").textContent = caesarCipher(plainText, shift);
    }

    /* Phishing Simulator */
    
      const phishingEmails = [
     {
        from:"security@ama0n-supp0rt.com",
        subject: "Urgent: Account Suspension Notice",
        body: "Your account will be disabled within 24 hours, Verify immediately to keep account.",
        phish: true
     },   
    {
      from:"notifications@google.com",
      subject: "New Sign-In Detected",
      body: " A login was detected from a new device. If this was you, no action is needed. If not, please secure your account.",
      phish:false
    },
    {
      from:"support@microsoft.com",
      subject: "Password changed",
      body: "Your password was changed successfully.",
      phish:false
    },
    {
      from:"Your-bank-security-alert.co",
      subject:"Unusual activity detected",
      body:"Click here immediately to secure your account and keep your funds safe.",
      phish:true
    },
    {
      from:"paypal-verificaation.net",
      subject:"Verify Paymet Information for Your Account",
      body: "Verify your payment information or else it can result in account deletion.",
      phish:true
    }
  ];
    let currentEmail = 0;

    function loadPhish()
    {
        const email = phishingEmails[currentEmail];
        document.getElementById("phishFrom").textContent = email.from;
        document.getElementById("phishSubject").textContent = email.subject;
        document.getElementById("phishBody").textContent = email.body;
        const result = document.getElementById("phishResult");
        result.className = "phish-result";
        result.textContent = "";
    }

    function judgePhish(e, answer)
    {
      e.stopPropagation();
      const email = phishingEmails[currentEmail];
      const result = document.getElementById("phishResult");
      result.classList.add("show");
      result.classList.remove("correct","incorrect"); // fixed a bug where changing the answer to correct answer will not update the colors
      if(answer === email.phish)
      {
        result.textContent = "Correct Answer! Good catch"
        result.classList.add("correct");
      }
      else{
        result.textContent = "Incorrect... Check the sender address, urgency, or any suspicious links.";
        result.classList.add("incorrect");
      }

    }

    function nextPhish(e)
    {
      e.stopPropagation();
      currentEmail++;
      if(currentEmail >= phishingEmails.length)
      {
        currentEmail = 0;
      }
      loadPhish();
    }

   /* Firewall Demo */ 
   function testFirewall(e)
   {
    e.stopPropagation();
    const port = Number(document.getElementById("fwPort").value);
    const result = document.getElementById("fw-result");
    const allowed = [80,443,25];
    result.classList.remove("allow", "deny");
    if(allowed.includes(port))
    {
      result.textContent = `ACCESS ALLOWED TO PORT ${port}`;
      result.classList.add("allow");
    }
    else{
      result.textContent = `BLOCKED TO PORT ${port}`;
      result.classList.add("deny");
    }
    result.classList.add("show"); 
   }

/*SQL Injection*/
function checkSQL() 
{
    const user = document.getElementById("sqlUser").value;
    const pass = document.getElementById("sqlPass").value;
    const result = document.getElementById("sqlResult");
    const input = `${user} ${pass}`.toUpperCase();
    const attacks = ["' OR", "--", ";", "DROP", "SELECT", "UNION"];
    const detected = attacks.some(attack => input.includes(attack));
    result.className = `sql-result ${detected ? "danger" : "safe"}`;
    result.textContent = detected ? "SQL Injection pattern detected!" : "Input looks safe.";
  }
function injectSQL(value)
{
  document.getElementById("sqlUser").value = value;
  checkSQL();
}

/* Password Strength Checker */
function checkPassword()
{
  const pw = document.getElementById("pwInput").value;
  const rules = [
    {
      label: "At least 8 characters",
      pass: pw.length >= 8
    },
    {
      label: "Contains uppercase letter",
      pass: /[A-Z]/.test(pw)
    },
    {
      label: "Contains lowercase letter",
      pass: /[a-z]/.test(pw)
    },
    {
      label: "Contains number",
      pass: /[0-9]/.test(pw)
    },
    {
      label: "Contains special character",
      pass: /[^A-Z,a-z,0-9]/.test(pw)
    }
  ];
  const score = rules.filter(r => r.pass).length;
  const labels = [ "Very Weak", "Weak", "Fair", "Good", "Strong", "Excellent"];
  document.getElementById("pwLabel").textContent = labels[score];
  const pwBar = document.getElementById("pwBar");
  pwBar.style.width = `${score * 20}%`;
  if (score <= 1) 
  {
    pwBar.style.background = "var(--red)"; 
  }
  else if (score <= 3) 
  {
    pwBar.style.background = "var(--yellow)"; 
  }
  else 
  {
    pwBar.style.background = "var(--green)"; 
  }
  document.getElementById("pwChecks").innerHTML = rules.map(rule => `<div class="pw-check ${rule.pass ? "pass" : ""}">${rule.label}</div>`).join("");
}
function togglePassword() // new function to toggle password visibility for the password interactive 
{
  const input = document.getElementById("pwInput");
  const button = document.getElementById("pwToggleBtn");
  input.type = input.type === "password" ? "text" : "password";
  button.textContent = input.type === "password" ? "Show" : "Hide";
}

/* SHA-256 Hashing Interactive */
async function generateHash()
{
  const input = document.getElementById("hashInput").value;
  if(!input) 
  {
    document.getElementById("hashVal").textContent = "-";
    return;
  }
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  const hash = Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2,"0")).join("");
  document.getElementById("hashVal").textContent = hash;
}

/* Quiz Info */
const quizQuestions = [
  {
    question: "What does HTTPS primarily provide?",
    options: ["Data encryption", "Faster loading", "Better SEO", "Lower bandwidth"],
    answer: 0,
    explanation: "HTTPS encrypts data between the user and the website, ensuring privacy and security."
  },
  {
    question:"Which attack tricks users into revealing their information?",
    options: ["Hashing", "Firewall", "Phishing", "Encryption"],
    answer: 2,
    explanation: "Phishing is a type of social engineering attack that tricks users into revealing their information."
  },
  {
    question: "What is the purpose of a firewall?",
    options: ["Store Passwords", "Encrypt Files", "Create Backups", "Filter Network Traffic"],
    answer: 3,
    explanation: "A firewall monitors and filters incoming and outgoing network traffic based on security rules."
  },
  {
    question:"What does SQL Injection target?",
    options: ["Printers", "Websites and Backend Databases", "Phones", "Routers"],
    answer: 1,
    explanation: "SQL Injection is a code injection technique that targets web apps and their backend databases by inserting malicious SQL statements."
  },
  {
    question:"Which password is the strongest?",
    options: ["password123", "qwerty", "P@ssw0rd!X9", "1234567"],
    answer: 2,
    explanation: "P@ssw0rd!X9 is the strongest because it includes uppercase, lowercase, numbers, and special characters."
  },
  {
    question: "Which is an example of an encryption method",
    options: ["HAHA-256", "BRO-256", "CyberHash-256", "SHA-256"],
    answer: 3,
    explanation: "SHA-256 is a common example of a cryptographic hashing algorithm used in Cybersecurity."
  },
  {
    question: "Which port commonly uses HTTPS?",
    options: ["21", "80", "443", "25"],
    answer: 2,
    explanation: "Port 443 is commonly used for HTTPS traffic, which is encrypted."
  },
  {
    question:"AES is an example of: ",
    options: ["Encryption", "Firewall", "Virus", "Phishing"],
    answer: 0,
    explanation: "AES is a modern high security encryption standard in the Cyber World."
  },
  {
    question:"What exactly is Phishing?",
    options: ["A type of malware", "A malicious technique", "A cyberattack where criminals impersonate a trusted person or organization to trick you into clicking malicious links", "A method criminals use to hack your computer"],
    answer: 2,
    explanation: "Social engineering is when Attackers exploit human psychology/behavior to gain access to confidential information from users."
  },
  {
    question:"What should you do to be safe online?",
    options: ["Clicking unknown links", "Reusing passwords", "Ignoring software updates", "Using Multifactor Authentication (MFA)"],
    answer: 3,
    explanation: "Using Multifactor Authentication (MFA) adds an extra layer of security to your accounts, making it harder for attackers to hack your account."
  }
];

/* Quiz functions */
let quizIndex = 0;
let quizScore = 0; 

function loadQuestion()
{
  const q = quizQuestions[quizIndex];
  document.getElementById("quizQuestion").textContent = q.question;
  document.getElementById("quizNum").textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;
  document.getElementById("quizProgressBar").style.width = `${((quizIndex + 1) / quizQuestions.length) * 100}%`;
  const letters = ["A","B","C","D"];
  document.getElementById("quizOptions").innerHTML = q.options.map((option, index) => `<button class="quiz-option" onclick="selectAnswer(${index})"><strong>${letters[index]}.</strong> ${option}</button>`).join("");
  document.getElementById("quizFeedback").className = "quiz-feedback";
  document.getElementById("quizNext").style.display = "none";
}
function selectAnswer(choice)
{
  const q = quizQuestions[quizIndex];
  const buttons = document.querySelectorAll(".quiz-option");
  buttons.forEach(btn => btn.disabled = true);
  const feedback = document.getElementById("quizFeedback");
  if(choice === q.answer)
  {
    quizScore++;
    document.getElementById("quizScore").textContent = quizScore;
    buttons[choice].classList.add("correct");
    feedback.className = "quiz-feedback correct-fb show";
    feedback.textContent = "Correct! " + q.explanation;
  }
  else {
    buttons[choice].classList.add("wrong");
    buttons[q.answer].classList.add("correct");
    feedback.className = "quiz-feedback wrong-fb show";
    feedback.textContent = "Incorrect..." + q.explanation;
  }
  document.getElementById("quizNext").style.display = "inline-flex";
}
function nextQuiz()
{
  quizIndex++;
  if(quizIndex >= quizQuestions.length)
  {
    finishQuiz();
    return;
  }
  loadQuestion();
}
function finishQuiz() {
  document.getElementById("quizCard").classList.add("hidden");
  document.getElementById("quizEnd").classList.remove("hidden");
  const percent = Math.round((quizScore / quizQuestions.length) * 100);
  document.getElementById("endScore").textContent =
  `Your Score: ${quizScore} / ${quizQuestions.length} (${percent}%)`;
  let msg = "Great work!";
  if (percent >= 90) {
    msg = " Future Cybersecurity EXPERT!! You've mastered the essentials of Cybersecurity!";
  } else if (percent >= 70) {
    msg = "Solid cybersecurity knowledge! Keep Learning!";
  } else if (percent >= 60) {
    msg = "Decent foundation, you still need to learn!";
  } else {
    msg = "Keep practicing and learning! You'll improve with more studying!";
  }
  document.getElementById("endIcon").textContent = icon;
  document.getElementById("endMsg").textContent = msg;
}
function restartQuiz() {
  quizIndex = 0;
  quizScore = 0;
  document.getElementById("quizScore").textContent = "0";
  document.getElementById("quizCard").classList.remove("hidden");
  document.getElementById("quizEnd").classList.add("hidden");
  loadQuestion();
}

/* Initialization */
window.addEventListener("DOMContentLoaded", () => 
{
  typeWriter();
  loadPhish();
  loadQuestion();
});