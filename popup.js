/*

const API_URL = "http://127.0.0.1:8000/check-url";
const API_KEY = "trailhead20260112";

document.getElementById("checkBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = tabs[0].url;

    document.getElementById("url").innerText = currentUrl;
    document.getElementById("result").innerText = "Checking...";

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
      },
      body: JSON.stringify({ url: currentUrl })
    })
    .then(response => response.json())
    .then(data => {
      if (data.malicious) {
        document.getElementById("result").innerHTML =
          "<span class='malicious'>🔴 This site is MALICIOUS</span>";
      } else {
        document.getElementById("result").innerHTML =
          "<span class='safe'>🟢 This site is SAFE</span>";
      }
    })
    .catch(error => {
      document.getElementById("result").innerText =
        "Error connecting to API";
      console.error(error);
    });
  });
});

*/

/*
const API_URL = "http://127.0.0.1:8000/check-url";
const API_KEY = "trailhead20260112";

const urlEl = document.getElementById("url");
const btn = document.getElementById("checkBtn");
const statusCard = document.getElementById("statusCard");
const statusIcon = document.getElementById("statusIcon");
const statusText = document.getElementById("statusText");
const statusDesc = document.getElementById("statusDesc");
const errorEl = document.getElementById("error");

// Get current tab URL on popup open
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentUrl = tabs[0].url;
  urlEl.textContent = shortenUrl(currentUrl);
});

// Button click
btn.addEventListener("click", () => {
  errorEl.textContent = "";
  statusCard.classList.add("hidden");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = tabs[0].url;

    btn.textContent = "Scanning...";
    btn.disabled = true;

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
      },
      body: JSON.stringify({ url: currentUrl })
    })
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(data => {
        showResult(data.malicious);
      })
      .catch(() => {
        errorEl.textContent = "⚠ Unable to connect to detection service";
      })
      .finally(() => {
        btn.textContent = "Scan Website";
        btn.disabled = false;
      });
  });
});

// Show result
function showResult(isMalicious) {
  statusCard.classList.remove("hidden");

  if (isMalicious) {
    statusCard.className = "status malicious";
    statusIcon.textContent = "🚨";
    statusText.textContent = "Malicious Website Detected";
    statusDesc.textContent = "This site may steal data or harm your device.";
  } else {
    statusCard.className = "status safe";
    statusIcon.textContent = "✅";
    statusText.textContent = "Website is Safe";
    statusDesc.textContent = "No known threats detected for this website.";
  }
}

// Helper: shorten long URLs
function shortenUrl(url) {
  return url.length > 45 ? url.slice(0, 45) + "..." : url;
}

*/


const API_URL = "http://127.0.0.1:8000/check-url";
const API_KEY = "trailhead20260112";

const scanBtn = document.getElementById("scanBtn");
const urlText = document.getElementById("url");
const resultText = document.getElementById("result");
const userIP = document.getElementById("userIP");
const siteIP = document.getElementById("siteIP");
const safeBrowsingStatus = document.getElementById("safeBrowsingStatus");

const copyURL = document.getElementById("copyURL");
const copyIP = document.getElementById("copyIP");
const helpBtn = document.getElementById("helpBtn");

let currentURL = "";


/* Help Button */

helpBtn.addEventListener("click", () => {

chrome.tabs.create({
url: "https://YOUR-BLOG-URL"
});

});


/* Safe Browsing Check */

fetch("http://127.0.0.1:8000/docs")
.then(() => {

safeBrowsingStatus.innerHTML="✔ Safe Browsing Enabled";
safeBrowsingStatus.classList.add("safe-enabled");

})
.catch(()=>{

safeBrowsingStatus.innerHTML="⚠ Safe Browsing Disabled";
safeBrowsingStatus.classList.add("safe-disabled");

});


/* Get User Public IP */

fetch("https://api.ipify.org?format=json")
.then(res=>res.json())
.then(data=>{

userIP.textContent=data.ip;

});


/* Copy IP */

copyIP.addEventListener("click",()=>{

navigator.clipboard.writeText(userIP.textContent);

});


/* Get Current Tab */

chrome.tabs.query({active:true,currentWindow:true}, function(tabs){

currentURL=tabs[0].url;


/* Short URL display */

let shortURL=currentURL;

if(currentURL.length>35){

shortURL=currentURL.substring(0,35)+"...";

}

urlText.textContent=shortURL;


/* Get domain IP */

try{

let domain=new URL(currentURL).hostname;

fetch(`https://dns.google/resolve?name=${domain}`)
.then(res=>res.json())
.then(data=>{

if(data.Answer){

siteIP.textContent=data.Answer[0].data;

}

});

}catch{

siteIP.textContent="IP not found";

}

});


/* Copy URL */

copyURL.addEventListener("click",()=>{

navigator.clipboard.writeText(currentURL);

});


/* Scan Website */

scanBtn.addEventListener("click",()=>{

resultText.textContent="Scanning...";

fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json",
"x-api-key":API_KEY
},

body:JSON.stringify({url:currentURL})

})

.then(res=>res.json())

.then(data=>{

if(data.malicious){

resultText.innerHTML="🚨 This website is Malicious";
resultText.style.color="red";

}

else{

resultText.innerHTML="✔ This website is Safe";
resultText.style.color="green";

}

})

.catch(()=>{

resultText.textContent="API connection error";

});

});