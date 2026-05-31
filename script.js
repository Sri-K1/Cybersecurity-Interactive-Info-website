const termSequences= [
    {
    cmd: "nmap -sV 192.168.1.1",
    out: ["Starting Nmap scan...", "PORT 443/tcp open https", "PORT 80/tcp  open http"]
    },
    {
    cmd: "hashcat --attack-mode 0 hash.txt",
    out: ["Loading wordlist...", "Cracking in progress...", "Status: Exhausted — try longer wordlist"]
    },
    {
    cmd: "openssl enc -aes-256-cbc -salt -in secret.txt",
    out: ["enter aes-256-cbc encryption password:", "Verifying - enter password:", "Encrypted → secret.enc"]
    }
]; 

let seqIndex = 0;

function runTerminal() {
    const seq = termSequences[seqIndex % termSequences.length];
    seqIndex++;
    const cmdEl = document.getElementById("typewriter");
    const out1 = document.getElementById("termOut1");
    const out2 = document.getElementById("termOut2");
    const out3 = document.getElementById("termOut3");
    [cmdEl, out1, out2, out3]. forEach(el => {if (el) el.textContent = "";});
    let i = 0;
    const typeInterval = setInterval(() => {
        if (!cmdEl) { clearInterval(typeInterval); return; }
        cmdEl.textContent += seq.cmd[i];
         i++;
        if (i >= seq.cmd.length) {
             clearInterval(typeInterval);
             setTimeout(() => { if (out1) out1.textContent = seq.out[0]; }, 400);
             setTimeout(() => { if (out2) out2.textContent = seq.out[1]; }, 900);
             setTimeout(() => { if (out3) out3.textContent = seq.out[2]; }, 1400);
             setTimeout(runTerminal, 4000);
    }
     }, 55);
}

function toggleLesson(card)
{
    const isOpen = card.classList.contains("open");
    document.querySelectorAll(".lesson-card").forEach(c => c.classList.remove("open"));
    if (!isOpen) card.classList.add("open");
}

function updateCipher() 
{
 const slider = document.getElementById("cipher-shift");
 const numEl = document.getElementById("shift-num");
 const outEl = document.getElementById("cipher-out");
if (!slider) return;
const shift = parseInt(slider.value);
if (numEl) numEl.textContent = shift;
const plain = "HELLO WORLD";
let result = "";
for (let char of plain) {
    if (ch === " ") { result += " "; continue; }
        result += String.fromCharCode(((ch.charCodeAt(0) - 65 + shift) % 26) + 65);
  }
    if (outEl) outEl.textContent = result;
}

const phishEmails = [
    {
        from: "security@paypa1.com",
        subject: "⚠️ URGENT: Your account has been locked",
        body: "Dear Valued Customer, Your PayPal account has been SUSPENDED due to suspicious activity. Click the link below IMMEDIATELY to restore access or your account will be permanently deleted within 24 hours.[Restore Access Now]",
        isPhish: true,
        explanation: "PHISHING! Clues: 'paypa1.com' (fake domain with a '1'), urgency ('IMMEDIATELY'), threat of deletion." 
    },
    {
        from: "noreply@github.com",
        subject: "Your pull request was merged",
        body: "Hi there, Your pull request #42 'Fix login bug' was merged into main by octocat.View it at github.com/yourrepo/pull/42 — The GitHub Team",
        isPhish: false,
        explanation: "LEGIT! Sent from the real github.com domain, no urgency, no suspicious link, references specific PR details."
    },
    {
        from: "support@amazone-security.net",
        subject: "Action Required: Verify your payment info",
        body: "Hello Amazon Customer, We have detected unusual login attempts on your account. Please verify your credit card details immediately to avoid suspension. Click here: http://amz-verify.net/confirm",
        isPhish: true,
        explanation: "PHISHING! 'amazone-security.net' is not Amazon's domain. Real Amazon uses amazon.com. Mismatched link URL is a huge red flag."
    },
    {
        from: "no-reply@accounts.google.com",
        subject: "New sign-in to your Google Account",
        body: "Hi, We noticed a new sign-in to your Google Account on a Windows device. If this was you, you don't need to do anything. If not, visit g.co/accountsecurity— The Google Team",
        isPhish: false,
        explanation: "LEGIT! Sent from accounts.google.com (official), no pressure tactics, tells you to do nothing if it was you."
    }
];

let currentPhish = 0;

function renderPhish()
{
    const email = phishEmails[currentPhish];
    const fromEl    = document.getElementById("phishFrom");
    const subjectEl = document.getElementById("phishSubject");
    const bodyEl    = document.getElementById("phishBody");
    const resultEl  = document.getElementById("phishResult");
    if (fromEl)    fromEl.textContent    = email.from;
    if (subjectEl) subjectEl.textContent = email.subject;
    if (bodyEl)    bodyEl.textContent    = email.body;
    if (resultEl)  { resultEl.className = "phish-result"; resultEl.textContent = ""; }
    document.querySelectorAll(".phish-btns .btn").forEach(b => b.disabled = false); 
}

function judgePhish(e, guessedPhish)
{
    e.stopPropagation();
    const email = phishEmails[currentPhish];
    const resultEl = document.getElementById("phishResult");
    const correct = (guessedPhish === email.isPhish);
    if (resultEl) {
        resultEl.textContent = (correct ? " Correct!" : "Wrong!") + email.explanation;
        resultEl.className   = "phish-result show " + (correct ? "correct" : "wrong");
    }
    document.querySelectorAll(".phish-btns .btn").forEach(b => b.disabled = true);
}

function nextPhish(e)
{
    e.stopPropagation();
    currentPhish = (currentPhish + 1) % phishEmails.length;
    renderPhish();
}

const firewallRules = {
    443: {allow: true,  label: "HTTPS — standard web traffic"},
    80: {allow: true,  label: "HTTP — unencrypted web traffic"},
    25: {allow: true,  label: "SMTP — email sending"},
    22: {allow: false, label: "SSH — blocked from external access"},
    3389: {allow: false, label: "RDP — remote desktop, too risky externally"},
    23: {allow: false, label: "Telnet — obsolete and unencrypted, always block"},
    21: {allow: false, label: "FTP — unencrypted file transfer, block it"},
    8080: {allow: true,  label: "HTTP Alt — often used for dev servers"},
};

function testFirewall(e) {
    e.stopPropagation();
    const portEl   = document.getElementById("fwPort");
    const resultEl = document.getElementById("fwResult");
    if (!portEl || !resultEl) return;
    const port = parseInt(portEl.value);
    if (isNaN(port) || port < 1 || port > 65535) {
      resultEl.className   = "fw-result show deny";
      resultEl.textContent = "Invalid port number. Enter 1-65535.";
      return;
    }
    const rule = firewallRules[port];
    if (rule) {
      resultEl.className   = "fw-result show " + (rule.allow ? "allow" : "deny");
      resultEl.textContent = (rule.allow ? "ALLOWED — " : "DENIED — ") + rule.label;
    } else {
      resultEl.className   = "fw-result show deny";
      resultEl.textContent = `DENIED — Port ${port} has no explicit allow rule. Default policy: deny.`;
    }
  }

  function checkSQL() {
    const user = (document.getElementById("sqlUser") || {}).value || "";
    const pass = (document.getElementById("sqlPass") || {}).value || "";
    const result = document.getElementById("sqlResult");
    if (!result) return;
    const dangerous = /('|--|;|OR\s+['"]?1['"]?\s*=\s*['"]?1|DROP\s+TABLE|UNION\s+SELECT|admin')/i;
    if (dangerous.test(user) || dangerous.test(pass)) {
        result.className = "sql-result danger";
        result.textContent = "SQL Injection Detected! Query: SELECT * FROM users WHERE user='" + user + "' AND pass='" + pass + "' — attacker bypassed authentication!";   
    } else if (user.length > 0 || pass.length > 0) {
        result.className = "sql-result safe";
        result.textContent = "Safe input. Query: SELECT * FROM users WHERE user='" +
        user + "' AND pass='[hashed]' — no injection found.";
    } else {
        result.className = "sql-result";
        result.textContent = "Enter credential above";
    }
  }

  function injectSQL(payload) {
    const userEl = document.getElementById("sqlUser");
    if (userEl) {userEl.value = payload; checkSQL(); }
  }

  function checkpassword() {
    const pw = (document.getElementById("pwInput") || {}).value || "";
    const bar = document.getElementById("pwBar");
    const label = document.getElementById("pwLabel");
    if (!bar) return;
    const rules = [
        {label: "At least 8 characters",      pass: pw.length >= 8},
        {label: "At least 12 characters",     pass: pw.length >= 12},
        {label: "Contains uppercase (A-Z)",   pass: /[A-Z]/.test(pw)},
        {label: "Contains lowercase (a-z)",   pass: /[a-z]/.test(pw)},
        {label: "Contains numbers (0-9)",     pass: /[0-9]/.test(pw)},
        {label: "Contains symbols (!@#$...)", pass: /[^A-Za-z0-9]/.test(pw)},
        {label: "Not a common word",          pass: !/(password|qwerty|123456|letmein|admin)/i.test(pw)},

    ];
    const score = rules.filter(r => r.pass).length;
    const pct = Math.round((score / rules.length) * 100);
    let color , labelText;
    if (pw.length === 0){
        bar.style.width = "0"; labelText = "Start Typing...";
        } 
    else if (score <= 2)
        {
            color = "#ff4466"; labelText = "Very Weak... Easy to guess!";
        }
    else if (score <= 3)
        {
            color = "#ff9900"; labelText = "Weak, Consider adding more characters and variety.";
        }
    else if (score <= 5)
        {
            color = "#ffd700"; labelText = "Moderate - Not bad, but could be stronger";
        }
    else if (score <= 6)
        {
            color = "#00cc6a"; labelText = "Strong, Good password!";
        }
    else {
            color = "#00ff88"; labelText = "Very Strong! Excellent password!";
    }
    bar.style.width= pw.length === 0 ? "0" : pct + "%";
    bar.style.background = color;
    if (label) label.textContent = pw.length === 0 ? "Start typing..." : labelText;
    if (checks) {
      checks.innerHTML = rules.map(r =>`<div class="pw-check ${r.pass ? "pass" : "fail"}">${r.pass ? "✓" : "○"} ${r.label}</div>`).join("");
    }
}

 function generateHash()
 {
    const input = (document.getElementById("hashInput") || {}).value || "";
    const out = document.getElementById("hashVal");
    if (!out) return;
    if (!input) {out.textContent = ""; return;}
    let hash = 0x6a09e667;
    for (let i = 0; i < input.length; i++) {
        hash = Math.imul(hash ^ input.charCodeAt(i), 0x9e3779b9);
        hash ^= hash >>> 16;
    }
    let result = "";
    let seed = hash >>> 0;
    const hex = "0123456789abcdef";
    for (let i = 0; i < 64; i++) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        result += hex[(seed >>> (i % 28)) & 0xf];
    }
    out.textContent = result;
 }

 const QUESTIONS = [
    {
      q: "What does HTTPS stand for?",
      opts: ["HyperText Transfer Protocol Secure", "High Transfer Protocol System", "Hyper Tunneling Protocol Standard", "HyperText Transmission Protocol Service"],
      ans: 0,
      fact: "HTTPS uses TLS (Transport Layer Security) to encrypt data between your browser and the server — that padlock icon means it's working."
    },
    {
      q: "What is the most common type of cyberattack used to steal passwords?",
      opts: ["DDoS Attack", "Phishing Email", "SQL Injection", "Zero-Day Exploit"],
      ans: 1,
      fact: "91% of all cyberattacks start with a phishing email. They exploit human psychology, not just technical vulnerabilities."
    },
    {
      q: "What does a firewall primarily do?",
      opts: ["Scans files for viruses", "Monitors and filters network traffic", "Encrypts your hard drive", "Backs up your data"],
      ans: 1,
      fact: "A firewall acts like a security guard — it checks every packet of data entering or leaving your network against a ruleset."
    },
    {
      q: "Which of these is an example of SQL Injection?",
      opts: ["password123", "admin@site.com", "' OR '1'='1", "192.168.1.1"],
      ans: 2,
      fact: "' OR '1'='1 exploits a SQL query by making the WHERE condition always true, bypassing authentication without a real password."
    },
    {
      q: "What is two-factor authentication (2FA)?",
      opts: ["Using two different passwords", "Logging in from two devices", "Requiring a second form of verification beyond a password", "Encrypting your login twice"],
      ans: 2,
      fact: "2FA adds a second layer — typically something you have (a phone) plus something you know (password). Even if your password leaks, attackers can't get in."
    },
    {
      q: "What does 'end-to-end encryption' mean?",
      opts: ["Only the sender's device encrypts the message", "The message is encrypted only on the server", "Only the recipient can decrypt the message — not even the app provider", "The message self-destructs after delivery"],
      ans: 2,
      fact: "Apps like Signal use E2EE. Even Signal's servers can't read your messages — only your device and the recipient's device hold the keys."
    },
    {
      q: "What is a 'zero-day' vulnerability?",
      opts: ["A bug that causes a system to restart daily", "A flaw unknown to the software vendor, with no patch available", "A virus that activates on a specific date", "A security update released on launch day"],
      ans: 1,
      fact: "Zero-day means the developer has had 'zero days' to fix it. These are extremely valuable to attackers and nation-states."
    },
    {
      q: "Which hashing algorithm is considered secure for password storage?",
      opts: ["MD5", "SHA-1", "bcrypt", "Base64"],
      ans: 2,
      fact: "MD5 and SHA-1 are fast — bad for passwords. bcrypt is intentionally slow, making brute-force attacks impractical. Base64 isn't even encryption!"
    },
    {
      q: "What is social engineering in cybersecurity?",
      opts: ["Building social media platforms", "Manipulating people psychologically to reveal confidential info", "Using AI to scan social networks", "Engineering secure login systems"],
      ans: 1,
      fact: "Social engineering exploits trust, fear, and urgency rather than technical flaws. The human is often the weakest link in security."
    },
    {
      q: "What does VPN stand for and what does it do?",
      opts: ["Virtual Private Network — encrypts your internet traffic and hides your IP", "Verified Protocol Node — validates your identity online", "Virtual Public Network — speeds up your internet connection", "Verified Private Node — blocks all ads and trackers"],
      ans: 0,
      fact: "A VPN tunnels your traffic through an encrypted connection to a server elsewhere, masking your real IP and protecting your data on public WiFi."
    }
  ];

  let quizState = { questions: [], current: 0, score: 0, answered: false };
  function shuffleArr(arr) {return [...arr].sort(() => Math.random() - 0.5);}

  function initQuiz() {
    quizState.questions = shuffleArr(QUESTIONS)
    quizState.current = 0;
    quizState.score = 0;
    quizState.answered = false;
    renderQuestion();
  }

  function renderQuestion() {
    const q = quizState.questions[quizState.current];
    const total = quizState.questions.length;
    const letters = ["A", "B", "C", "D"];
    const qEl = document.getElementById("quizQuestion");
    const optsEl = document.getElementById("quizOptions");
    const numEl = document.getElementById("quizNum");
    const scoreEl = document.getElementById("quizScore");
    const progEl = document.getElementById("quizProgressBar");
    const fbEl = document.getElementById("quizFeedback");
    const nextBtn = document.getElementById("quizNext");
    if (!qEl) return;
    if (numEl) numEl.textContent = `Q${quizState.current + 1} / ${total}`;
    if (scoreEl) scoreEl.textContent = quizState.score;
    if (progEl) progEl.style.width = (quizState.current / total * 100) + "%";
    if (fbEl)    { fbEl.className = "quiz-feedback"; fbEl.textContent = ""; }
    if (nextBtn) nextBtn.style.display = "none";
    qEl.textContent = q.q;
    if (optsEl) {
        optsEl.innerHTML = q.opts.map((opt, i) => `<button class="quiz-opt" onclick="selectAnswer(${i})">${letters[i]}. ${opt}</button>`).join("");
    }
    quizState.answered = false;
  }