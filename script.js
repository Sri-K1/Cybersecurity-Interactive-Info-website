/* Lesson Cards */
function toggleLesson(card)
{
  if (typeof card === "string")
  {
    card = document.getElementById(card);
  }
  card.classList.toggle("open");
}

function stopBubble(e)
{
  e.stopPropagation();
}

/* Terminal Typewriter Animation */
const terminalCommands = [
  "scan network",
  "check firewall",
  "encrypt sensitive data",
  "analyze phishing emails",
  "run security audits",
  "verify SQL queries",
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
      document.getElementById("shift-num").textContent = shift;
      document.getElementById("cipher-output").textContent = caesarCipher("HELLO WORLD", shift);
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
    const input = (user + " " + pass).toUpperCase();
    const attacks = ["' OR", "--", ";","DROP","SELECT","UNION"];
    const detected = attacks.some(x => input.includes(x));
    if(detected)
    {
      result.className = "sql-result danger";
      result.textContent = "SQL Injection pattern was detected!";
    }
    else {
      result.className = "sql-result safe";
      result.textContent = "Input looks Safe";
    }
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
      pass: /[^A-Za-z0-9]/.test(pw)
    }
  ];
  const score = rules.filter(r => r.pass).length;
  const labels = [ "Very Weak", "Weak", "Fair", "Good", "Strong", "Excellent"];
  document.getElementById("pwLabel").textContent = labels[score];
  document.getElementById("pwBar").style.width = `${score * 20}%`;
  document.getElementById("pwCheck").innerHTML = rules.map(rule => `<div class="pw-check ${rule.pass ? "pass" : ""}">${rule.label}</div>`).join("");
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
    options: ["Printers", "Databases", "Websites", "Routers"],
    answer: 1,
    explanation: "SQL Injection is a code injection technique that targets databases by inserting malicious SQL statements."
  },
  {
    question:"Which password is the strongest?",
    options: ["password123", "qwerty", "P@ssw0rd!X9", "1234567"],
    answer: 2,
    explanation: "P@ssw0rd!X9 is the strongest because it includes uppercase, lowercase, numbers, and special characters."
  },
  {
    question: "What does Hashing do?",
    options: ["Encrypts","Conpresses","Creates fixed fingerprints", "stores data in random numbers"],
    answer: 2,
    explanation: "Hashing creates a one-way fingerprint"
  },
  {
    question: "Which port commonly uses HTTPS?",
    options: ["21", "80", "443", "21"],
    answer: 2,
    explanation: "Port 443 is commonly used for HTTPS traffic, which is encrypted."
  },
  {
    question:"AES is an example of: ",
    options: ["Encryption", "Firewall", "Virus", "Phishing"],
    answer: 0,
    explanation: "AES is a modern encryption standard"
  },
  {
    question:"What is social engineering?",
    options: ["Programming", "Manipulating people", "Encryption", "Scanning"],
    answer: 1,
    explanation: "Social engineering is when Attackers exploit human psychology/behavior"
  },
  {
    question:"Which is the safest option?",
    options: ["Clicking unknown links", "Reusuing passwords", "Ignoring software updates", "Using Multifactor Authentication (MFA)"],
    answer: 3,
    explanation: "Using Multifactor Authentication (MFA) adds an extra layer of security to your accounts."
  }
];

let quizIndex = 0;
let quizScore = 0; 