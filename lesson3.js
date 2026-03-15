// lesson3.js — Age verifier UI with Pyodide and JS fallback
let pyodideReady3 = false;
let verifyFunc = null;

async function initPyodideLesson3(){
  try{
    const pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/' });
    const pyCode = `
def verify_age(name, age):
    try:
        age = int(age)
    except Exception:
        return f"Invalid age: {age}"

    if age >= 18:
        return f"Welcome to IMAX, {name}!"
    elif age >= 13:
        return f"Hello {name}, you can watch but must be accompanied by an adult."
    elif age >= 5:
        return "Sorry, you cannot enter the movie."
    else:
        return "Sorry, you are not old enough to enter the cinema."
`;

    pyodide.runPython(pyCode);
    verifyFunc = pyodide.globals.get('verify_age');
    pyodideReady3 = true;
    const s = document.getElementById('status3');
    if(s) s.textContent = 'Pyodide loaded — ready';
  }catch(err){
    console.error('Pyodide init failed:', err);
  }
}

function verifyAgeJS(name, age){
  const n = name || '';
  const a = Number(age);
  if(Number.isNaN(a)) return `Invalid age: ${age}`;
  if(a >= 18) return `Welcome to IMAX, ${n}!`;
  if(a >= 13) return `Hello ${n}, you can watch but must be accompanied by an adult.`;
  if(a >= 5) return `Sorry, you cannot enter the movie.`;
  return `Sorry, you are not old enough to enter the cinema.`;
}

function runLesson3(){
  const name = document.getElementById('nameInput').value.trim();
  const age = document.getElementById('ageInput').value.trim();
  const out = document.getElementById('output3');
  const status = document.getElementById('status3');
  if(status) status.textContent = 'Running…';
  try{
    let result;
    if(pyodideReady3 && verifyFunc){
      result = verifyFunc(name, age);
    } else {
      result = verifyAgeJS(name, age);
    }
    out.textContent = String(result);
    if(status) status.textContent = 'Done';
  }catch(err){
    out.textContent = 'Error: ' + String(err);
    if(status) status.textContent = 'Error';
  }
}

function copyLesson3(){
  const text = document.getElementById('output3').textContent;
  if(!text) return;
  navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(text) : alert('Copy not supported');
}

document.addEventListener('DOMContentLoaded', ()=>{
  initPyodideLesson3();
  const runBtn = document.getElementById('run3Btn');
  const copyBtn = document.getElementById('copy3Btn');
  if(runBtn) runBtn.addEventListener('click', runLesson3);
  if(copyBtn) copyBtn.addEventListener('click', copyLesson3);
  const ageInput = document.getElementById('ageInput');
  if(ageInput) ageInput.addEventListener('keyup', (e)=>{ if(e.key === 'Enter') runLesson3(); });
});
