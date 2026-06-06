/* Lesson Cards */
function toggleLesson(card)
{
  let card;
  if (typeof card === "string")
  {
    card = document.getElementById(card);
  }
  else{
    card = card;
  }
  card.classlist.toggle("open");
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
    result.classList.remmove("allow", "deny");
    if(allowed.includes(port))
    {
      result.textContent = 'ACCESS ALLOWED TO PORT ${port}';
      result.classList.add("allow");
    }
    else{
      result.textContent = 'BLOCKED TO PORT ${port}';
      result.classList.add("deny");
    }
    result.classList.add("show");
   }

