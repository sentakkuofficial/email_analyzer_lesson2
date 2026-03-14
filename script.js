// script.js — loads Pyodide, defines analyze function and wires UI
let pyodideReady = false;
let analyzeFunc = null;

async function initPyodideAndCode(){
  try{
    // loadPyodide is provided by the included pyodide.js
    const pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/' });

    const pyCode = `
def analyze_email(email):
    parts = email.split("@")
    if len(parts) != 2 or parts[0] == "" or parts[1] == "":
        return f"Invalid email: {email}"
    username = parts[0]
    domain = parts[1]
    return "Original Email: " + email + "\nSplit Parts: " + str(parts) + "\nUsername: " + username + "\nDomain: " + domain
`;

    pyodide.runPython(pyCode);
    analyzeFunc = pyodide.globals.get('analyze_email');
    pyodideReady = true;
    document.getElementById('status').textContent = 'Pyodide loaded — ready';
  }catch(err){
    // Keep the status display unchanged and fall back to the JS analyzer.
    // Log the error for debugging but do not inject the previous UI message.
    console.error(err);
  }
}

function analyzeEmailJS(email){
  if(!email || typeof email !== 'string') return 'Invalid email input';
  const parts = email.split('@');
  if(parts.length !== 2 || parts[0] === '' || parts[1] === '') return `Invalid email: ${email}`;
  return `Original Email: ${email}\nSplit Parts: ${JSON.stringify(parts)}\nUsername: ${parts[0]}\nDomain: ${parts[1]}`;
}

function runAnalysis(){
  const email = document.getElementById('emailInput').value.trim();
  const out = document.getElementById('output');
  document.getElementById('status').textContent = 'Running…';
  try{
    if(pyodideReady && analyzeFunc){
      // Call Python function (PyProxy handles conversion)
      const result = analyzeFunc(email);
      out.textContent = String(result);
    } else {
      out.textContent = analyzeEmailJS(email);
    }
    document.getElementById('status').textContent = 'Done';
  }catch(err){
    out.textContent = 'Error: ' + String(err);
    document.getElementById('status').textContent = 'Error';
  }
}

function copyOutput(){
  const out = document.getElementById('output').textContent;
  if(!out) return;
  navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(out) : alert('Copy not supported');
}

document.addEventListener('DOMContentLoaded', ()=>{
  initPyodideAndCode();
  document.getElementById('runBtn').addEventListener('click', runAnalysis);
  document.getElementById('copyBtn').addEventListener('click', copyOutput);
  document.getElementById('emailInput').addEventListener('keyup', (e)=>{ if(e.key === 'Enter') runAnalysis(); });
});
