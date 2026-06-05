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

  /* CAESAR CIPHER */
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